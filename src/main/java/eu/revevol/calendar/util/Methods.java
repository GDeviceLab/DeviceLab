package eu.revevol.calendar.util;

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
import eu.revevol.calendar.constants.Params;
import eu.revevol.calendar.pojo.PojoEmail;
import java.util.Calendar;
import java.util.Date;

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
                Message msg = new MimeMessage(session);
                msg.setFrom(new InternetAddress(Params.SENDER_EMAIL_APPLICATION_NAME + "<" +Params.GAPPS_USER_NAME+">"));
                
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
    
    public static Calendar addDays(Calendar currentDate , int numberDays){
        Calendar c = currentDate;
        c.add(Calendar.DAY_OF_MONTH, 1);
        return c;
    }
}
