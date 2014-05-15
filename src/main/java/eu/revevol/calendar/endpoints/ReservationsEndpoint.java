package eu.revevol.calendar.endpoints;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiMethod.HttpMethod;
import com.google.appengine.api.NamespaceManager;
import com.google.appengine.api.oauth.OAuthRequestException;
import com.googlecode.objectify.ObjectifyService;
import eu.revevol.calendar.model.Asset;
import eu.revevol.calendar.model.Reservation;
import eu.revevol.calendar.security.Require;
import eu.revevol.calendar.util.Collision;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import javax.inject.Named;

/**
 *
 * @author Clement <clement.hannicq@revevol.eu>
 */
@Api(name = "reservation", version = "v1")
public class ReservationsEndpoint {

    static {
        ObjectifyService.factory().register(Reservation.class);
        ObjectifyService.factory().register(Asset.class);
    }

    @ApiMethod(
            name = "get",
            path = "get",
            httpMethod = HttpMethod.GET
    )
    public Reservation get(@Named("origin") String user, @Named("location") Long location, @Named("id") Long id) throws OAuthRequestException {
        Require.access(user, location);

        NamespaceManager.set(location.toString());
        Reservation res = ObjectifyService.ofy().load().type(Reservation.class).id(id).safe();
        return res;
    }

    @ApiMethod(
            name = "list",
            path = "list",
            httpMethod = HttpMethod.GET
    )
    public List<Reservation> list(@Named("origin") String user, @Named("location") Long location, @Named("date") Date date) throws OAuthRequestException {
        Require.access(user, location);
        
        NamespaceManager.set(location.toString());
        List<Reservation> list = ObjectifyService.ofy().load().type(Reservation.class).filter("date", date).list();
        return list;
    }

    @ApiMethod(
            name = "put",
            path = "put",
            httpMethod = HttpMethod.POST
    )
    public void put(@Named("origin") String user, @Named("location") Long location, Reservation r) throws OAuthRequestException, Exception {
        Require.access(user, location);

        if (r.id != null) { //In case of modification fo a reservation
            if (!user.equals(r.person)) {
                Require.localAdmin(user, location); //if the user hasn't local admin rights : toss him
            }
        } else {
            r.person = user; //Setting author
        }

        NamespaceManager.set(location.toString());

        if (Collision.allowed(r)) {
            ObjectifyService.ofy().save().entity(r);
        } else {
            throw new Exception("RESERVATION COLLISION");
        }

    }

    @ApiMethod(
            name = "delete",
            path = "delete",
            httpMethod = HttpMethod.GET
    )
    public void delete(@Named("origin") String user, @Named("location") Long location, @Named("id") Long reservation) throws OAuthRequestException {
        NamespaceManager.set(location.toString());
        Reservation r = ObjectifyService.ofy().load().type(Reservation.class).id(reservation).now();
        NamespaceManager.set("");
        
        Require.owner(user, location, r.person);

        NamespaceManager.set(location.toString());
        ObjectifyService.ofy().delete().type(Reservation.class).id(reservation).now();
    }

    @ApiMethod(
            name = "history",
            path = "history",
            httpMethod = HttpMethod.GET
    )
    public List<Reservation> history(@Named("origin") String user, @Named("location") Long location, @Named("user") String target) throws OAuthRequestException {
        Require.access(user, location);

        NamespaceManager.set(location.toString());
        return ObjectifyService.ofy().load().type(Reservation.class)
                .filter("person", target).list();
    }
}
