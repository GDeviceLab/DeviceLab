package eu.revevol.calendar.util;

import com.google.appengine.api.utils.SystemProperty;
import com.google.gson.Gson;
import java.util.Properties;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletResponse;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import com.google.gson.JsonObject;
import com.googlecode.objectify.ObjectifyService;
import eu.revevol.calendar.constants.Params;
import eu.revevol.calendar.model.Reservation;
import eu.revevol.calendar.pojo.PojoEmail;
import eu.revevol.calendar.pojo.PojoReport;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;
import java.util.logging.Level;

public class Methods {
    
    private static Logger logger = Logger.getLogger(Methods.class.getName());
    
    /**
     * Print the stack trace of an exception
     *
     * @param e
     *            Exception for which you want to print out the stack trace
     * @return stack trace that you want to print out
     */
    public static String printStackStrace(Exception e) {
        StringBuilder exceptionStackTrace = new StringBuilder();
        for (int i = 0; i < e.getStackTrace().length; i++) {
            exceptionStackTrace.append("\t" + e.getStackTrace()[i]);
            exceptionStackTrace.append("\n");
        }
        return exceptionStackTrace.toString();
    }
    
    public static void sendEmail(HttpServletResponse resp, PojoEmail pojo){
        try{
            Properties props = new Properties();
            Session session = Session.getDefaultInstance(props, null);
            for (int i = 0; i < pojo.getEmails().split(";").length; i++) {
                /**
                 * Main From
                 */
                String fromString = String.format("noreply@%s.appspotmail.com", SystemProperty.applicationId.get(),Params.PROJECT_PLACEHOLDER);
                Message msg = new MimeMessage(session);
                msg.setFrom(new InternetAddress(Params.SENDER_EMAIL_APPLICATION_NAME + "<" +fromString+">"));
                
                /**
                 * Mail To
                 */
                msg.addRecipient(Message.RecipientType.TO,new InternetAddress(pojo.getEmails().split(";")[i]));
                /**
                 * Subject
                 */
                msg.setSubject("["+Params.SENDER_EMAIL_APPLICATION_NAME+"] " +pojo.getSubject());
                
                /**
                 * Message Body
                 */
                Multipart mp = new MimeMultipart();
                MimeBodyPart htmlPart = new MimeBodyPart();
                htmlPart.setContent(pojo.getMessageBody(), "text/html");
                mp.addBodyPart(htmlPart);
                msg.setContent(mp);
                
                Transport.send(msg);
                
                //prepare response
                JsonObject jsonResult=new JsonObject();
                jsonResult.addProperty("statusCode", "0");
                
                //return data
                resp.setContentType(Params.APPLICATION_JSON);
                resp.getOutputStream().write(jsonResult.toString().getBytes(),0,jsonResult.toString().length());
                
                logger.info("EMAIL SENT: " + pojo.getEmails()+ " " + pojo.getSubject() + " " + pojo.getMessageBody());
            }
        }
        catch(Exception ex){
            logger.severe(Methods.printStackStrace(ex));
        }
    }
    
    public static Calendar getZeroTimeOfDay(){
        Calendar c = Calendar.getInstance();
        c.set(Calendar.HOUR, 0);
        c.set(Calendar.MINUTE, 0);
        c.set(Calendar.SECOND, 0);
        c.set(Calendar.HOUR_OF_DAY, 0);
        c.set(Calendar.MILLISECOND, 0);
        return c;
    }
    
    public static Date addDays(Date date , int numberDays){
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.DAY_OF_MONTH, numberDays);
        return c.getTime();
    }
    
    /**
     * Get GMT time in java
     */
    public static Date getGMTTime(Date dateStart){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
        sdf.setTimeZone(TimeZone.getTimeZone("GMT"));
        String GMTTime = sdf.format(dateStart);
        Date GMTDate;
        try {
            GMTDate = (Date)sdf.parse(GMTTime);
            return GMTDate;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    public static Date convertToZeroGMTTime(Date d){
        try {
            logger.info("PRIMA " + d.toString());
            /*SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            sdf.setTimeZone(TimeZone.getTimeZone("GMT"));
            String dString = sdf.format(d)+"T00:00:00Z";
            DateFormat iso8601 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssX");
            Date cleanDate = iso8601.parse(dString);
            logger.info("CONVERT " + cleanDate.toString());*/
            
            SimpleDateFormat sdf = new SimpleDateFormat("dd/M/yyyy");
            String date = sdf.format(d);
            Date dateCalc = sdf.parse(date);
            logger.info("CONVERT " + dateCalc.toString());
            return dateCalc;
        } catch (Exception ex) {
            Logger.getLogger(Methods.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }
    
    public static List<Reservation> getListReservationFilterByDate(PojoReport pojoReport){
        if(pojoReport != null
                && pojoReport.dateFrom != null
                && pojoReport.dateTo != null){   
            
            logger.log(Level.INFO, "{0} - {1}", 
                    new Object[]{pojoReport.dateFrom, 
                        pojoReport.dateTo}); 
            
            return ObjectifyService.ofy().load().type(Reservation.class)
                    .filter("realDate >= ", pojoReport.dateFrom)
                    .filter("realDate < ", pojoReport.dateTo).list();
        }
        else{
            return ObjectifyService.ofy().load().type(Reservation.class).list();
        }
    }
    
    public static String notNullText(String text){
        if(text == null){
            return "";
        }
        return text;
    }
    
    public static String getRealDate(Date d){
        int lDay = d.getDate();
        int lMonth = d.getMonth() + 1;
        int lYear = 1900+d.getYear();
        String day = Integer.toString(lDay);
        String month = Integer.toString(lMonth);
        String year = Integer.toString(lYear);
        if (lDay < 10) {
            day = '0' + Integer.toString(lDay);
        }
        if (lMonth < 10) {
            month = '0' + Integer.toString(lMonth);
        }
        return year+month+day;
    }
}
