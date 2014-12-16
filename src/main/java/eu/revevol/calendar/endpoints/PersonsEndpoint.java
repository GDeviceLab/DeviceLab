package eu.revevol.calendar.endpoints;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.appengine.api.oauth.OAuthRequestException;
import com.googlecode.objectify.ObjectifyService;
import eu.revevol.calendar.constants.ACLStatus;
import eu.revevol.calendar.model.ACL;
import eu.revevol.calendar.model.Person;
import eu.revevol.calendar.security.Require;
import java.util.ArrayList;
import java.util.List;
import javax.inject.Named;

/**
 *
 * @author Clement <clement.hannicq@revevol.eu>
 */
@Api(name = "person", version = "v1")
public class PersonsEndpoint {
    static{
        ObjectifyService.factory().register(Person.class);
        ObjectifyService.factory().register(ACL.class);
    }
    
    @ApiMethod(
            name = "getMyself",
            path = "me",
            httpMethod = ApiMethod.HttpMethod.GET
    )
    public Person getMyself(@Named("origin") String user) throws OAuthRequestException {
        Require.exist(user);
        
        return get(user);
    }
    
    @ApiMethod(
            name = "setFavorite",
            path = "favorite",
            httpMethod = ApiMethod.HttpMethod.GET
    )
    public void setFavorite(@Named("origin") String user, @Named("location") Long location) throws OAuthRequestException {
        Require.exist(user);
        
        Person p = ObjectifyService.ofy().load().type(Person.class).id(user).safe();
        p.favorite = location;
        
        ObjectifyService.ofy().save().entity(p);
    }
    
    @ApiMethod(
            name = "get",
            path = "get",
            httpMethod = ApiMethod.HttpMethod.GET
    )
    public Person get(@Named("mail") String mail) {
        Person res = ObjectifyService.ofy().load().type(Person.class).id(mail).safe();
        return res;
    }
    
    public List<Person> list(@Named("location") Long location,@Named("status") ACLStatus status) {
        List<ACL> acls = ObjectifyService.ofy().load().type(ACL.class)
                .filter("location", location)
                .filter("status", status)
                .list();
        ArrayList<Person> res = new ArrayList<Person>();
        
        for(ACL acl : acls){
            res.add(get(acl.user));
        }
        
        return res;
    }
    
    @ApiMethod(
            name = "listActives",
            path = "list/actives",
            httpMethod = ApiMethod.HttpMethod.GET
    )
    public List<Person> listActives(@Named("origin") String user, @Named("location") Long location) throws OAuthRequestException {
        Require.access(user, location);
        
        return list(location, ACLStatus.USER);
    }
    
    @ApiMethod(
            name = "listPending",
            path = "list/pending",
            httpMethod = ApiMethod.HttpMethod.GET
    )
    public List<Person> listPending(@Named("origin") String user, @Named("location") Long location) throws OAuthRequestException {
        Require.localAdmin(user, location);
        
        return list(location, ACLStatus.PENDING);
    }
    
    @ApiMethod(
            name = "listAdmins",
            path = "list/admins",
            httpMethod = ApiMethod.HttpMethod.GET
    )
    public List<Person> listAdmins(@Named("origin") String user, @Named("location") Long location) throws OAuthRequestException {
        Require.access(user, location);
        
        return list(location, ACLStatus.ADMIN);
    }
}