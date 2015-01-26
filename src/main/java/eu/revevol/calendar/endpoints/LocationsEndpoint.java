package eu.revevol.calendar.endpoints;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.appengine.api.oauth.OAuthRequestException;
import com.googlecode.objectify.ObjectifyService;
import eu.revevol.calendar.constants.ACLStatus;
import eu.revevol.calendar.model.ACL;
import eu.revevol.calendar.model.Location;
import eu.revevol.calendar.model.Person;
import eu.revevol.calendar.security.Require;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;
import javax.inject.Named;

/**
 *
 * @author Clement <clement.hannicq@revevol.eu>
 */
@Api(name = "location",  version = "v1")
public class LocationsEndpoint {
    
    private static Logger logger = Logger.getLogger(LocationsEndpoint.class.getName());

    static {
        ObjectifyService.factory().register(Location.class);
        ObjectifyService.factory().register(ACL.class);
    }

    @ApiMethod(
            name = "put",
            path = "put",
            httpMethod = ApiMethod.HttpMethod.POST
    )
    public void put(@Named("origin") String user, Location l) throws OAuthRequestException {
        Require.globalAdmin(user);

        ObjectifyService.ofy().save().entity(l);
    }
    
    @ApiMethod(
            name = "delete",
            path = "delete",
            httpMethod = ApiMethod.HttpMethod.POST
    )
    public void delete(@Named("origin") String user, Location loc) throws OAuthRequestException {
        Require.globalAdmin(user);
        Location location = ObjectifyService.ofy().load().type(Location.class).id(loc.id).now();
        location.deleted = true;
        ObjectifyService.ofy().save().entity(location).now();
        
        //update the favourite Location for all the user having that location
        //List<Person> personList = ObjectifyService.ofy().load().type(Person.class).list(); OLD VERSION ...USED FOR THE INDEX TRANSITION
        List<Person> personList = ObjectifyService.ofy().load().type(Person.class).filter("favorite", loc.id).list();
        for (Person p : personList) {
            logger.info("USER EMAIL: " + p.mail );
            if(p.favorite != null
                && p.favorite.equals(loc.id)){
                logger.info("NULL FAVOURITE: " + p.mail );
                p.favorite = null;
            }
            ObjectifyService.ofy().save().entity(p).now();
        }
    }

    @ApiMethod(
            name = "list",
            path = "list",
            httpMethod = ApiMethod.HttpMethod.GET
    )
    public List<Location> list() {
        List<Location> res = ObjectifyService.ofy().load().type(Location.class).list();
        List<Location> temp = new ArrayList<Location>();
        for (Location locObj : res) {
            if(locObj.deleted == null
                || !locObj.deleted){
                temp.add(locObj);
            }
        }
        return temp;
    }

    @ApiMethod(
            name = "getActives",
            path = "list/actives",
            httpMethod = ApiMethod.HttpMethod.GET
    )
    public List<Location> getActives(@Named("origin") String user) throws OAuthRequestException {
        Require.exist(user);

        List<ACL> acls = ObjectifyService.ofy().load().type(ACL.class)
                .filter("user", user).list();
        List<Location> res = new ArrayList<Location>();

        for (ACL acl : acls) {
            if (acl.status != ACLStatus.PENDING) {
                Location location = ObjectifyService.ofy().load().type(Location.class).id(acl.location).now();
                if(location.deleted == null
                    || !location.deleted){
                    res.add(location);
                }
            }
        }

        return res;
    }
        
    @ApiMethod(
            name = "get",
            path = "get",
            httpMethod = ApiMethod.HttpMethod.GET
    )
    public Location get(@Named("id") Long id) {
        Location res = ObjectifyService.ofy().load().type(Location.class).id(id).safe();
        return res;
    }
    
    @ApiMethod(
            name = "getAcl",
            path = "acl",
            httpMethod = ApiMethod.HttpMethod.GET
    )
    public ACL acl(@Named("origin") String user, @Named("location") Long location) {
        List<ACL> res = ObjectifyService.ofy().load().type(ACL.class)
                .filter("user", user).filter("location", location).list();
        if(res.size() == 1){
            return res.get(0);
        }
        return null;
    }

}
