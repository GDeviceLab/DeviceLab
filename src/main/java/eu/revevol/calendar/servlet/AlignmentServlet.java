/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.revevol.calendar.servlet;

import com.google.appengine.api.NamespaceManager;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.googlecode.objectify.ObjectifyService;
import eu.revevol.calendar.endpoints.ReportsEndpoint;
import eu.revevol.calendar.model.Asset;
import eu.revevol.calendar.model.Location;
import eu.revevol.calendar.model.Reservation;
import eu.revevol.calendar.util.Methods;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Revevol
 */
public class AlignmentServlet extends HttpServlet{
    
    private static Logger logger = Logger.getLogger(AlignmentServlet.class.getName());

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        UserService service = UserServiceFactory.getUserService();
        if(service.isUserAdmin()){
            try {
                alignMethod();
            } catch (ParseException ex) {
                Logger.getLogger(AlignmentServlet.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        else{
            resp.getWriter().print("not authorized");
        }
    }

    private void alignMethod() throws ParseException {
        ObjectifyService.factory().register(Location.class);
        ObjectifyService.factory().register(Reservation.class);
        List<Location> locationList = ObjectifyService.ofy().load().type(Location.class).list();
        for (Location l : locationList) {
            logger.log(Level.INFO, "Scanning location: {0} - {1}", new Object[]{l.name, l.id});
            NamespaceManager.set(l.id.toString());
            List<Reservation> resList = ObjectifyService.ofy().load().type(Reservation.class).list();
            logger.log(Level.INFO, "Reservation list size is: {0}", resList.size());
            for (Reservation r : resList) {
                Date d = r.date;
                logger.log(Level.INFO, "Before: {0} - {1}", new Object[]{d.toString(), d.getTime()});
                
                r.realDate = Methods.getRealDate(d);
            }
            //save all
            ObjectifyService.ofy().save().entities(resList).now();
            logger.info("- UPDATED ALL -");
        }
    }
    
}
