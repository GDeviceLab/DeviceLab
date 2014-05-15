package eu.revevol.calendar.util;

import com.google.appengine.api.NamespaceManager;
import com.googlecode.objectify.ObjectifyService;
import eu.revevol.calendar.model.*;
import eu.revevol.calendar.security.Token;
import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Clement Hannicq <clement.hannicq@revevol.eu>
 */
public class PurgeServlet extends HttpServlet {

    static {
        ObjectifyService.register(Token.class); //global
        ObjectifyService.register(ACL.class); //global
        ObjectifyService.register(Asset.class);
        ObjectifyService.register(Location.class); //global
        ObjectifyService.register(News.class);
        ObjectifyService.register(Person.class); //global
        ObjectifyService.register(Reservation.class);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        List<Location> locations = ObjectifyService.ofy().load().type(Location.class).list();
        for (Location location : locations) {
            NamespaceManager.set(location.id.toString());
            ObjectifyService.ofy().delete().keys(ObjectifyService.ofy().load().type(Asset.class).keys());
            ObjectifyService.ofy().delete().keys(ObjectifyService.ofy().load().type(News.class).keys());
            ObjectifyService.ofy().delete().keys(ObjectifyService.ofy().load().type(Reservation.class).keys());
        }
        NamespaceManager.set("");
        ObjectifyService.ofy().delete().keys(ObjectifyService.ofy().load().type(Token.class).keys());
        ObjectifyService.ofy().delete().keys(ObjectifyService.ofy().load().type(ACL.class).keys());
        ObjectifyService.ofy().delete().keys(ObjectifyService.ofy().load().type(Location.class).keys());
        ObjectifyService.ofy().delete().keys(ObjectifyService.ofy().load().type(Person.class).keys());

    }

}
