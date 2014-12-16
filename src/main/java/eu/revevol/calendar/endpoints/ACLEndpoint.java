package eu.revevol.calendar.endpoints;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.appengine.api.NamespaceManager;
import com.google.appengine.api.oauth.OAuthRequestException;
import com.googlecode.objectify.ObjectifyService;
import eu.revevol.calendar.constants.ACLStatus;
import eu.revevol.calendar.constants.EmailTemplate;
import eu.revevol.calendar.model.ACL;
import eu.revevol.calendar.model.Person;
import eu.revevol.calendar.model.Reservation;
import eu.revevol.calendar.model.Location;
import eu.revevol.calendar.security.Require;
import eu.revevol.calendar.util.ACLManager;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;
import javax.inject.Named;

/**
 *
 * @author Clement <clement.hannicq@revevol.eu>
 */
@Api(name = "person", version = "v1")
public class ACLEndpoint {
    
    private static Logger logger = Logger.getLogger(ACLEndpoint.class.getName());

    static {
        ObjectifyService.factory().register(Reservation.class);
        ObjectifyService.factory().register(Person.class);
        ObjectifyService.factory().register(ACL.class);
    }

    @ApiMethod(
            name = "grantLocalAdmin",
            path = "grant/local",
            httpMethod = ApiMethod.HttpMethod.GET
    )
    public void grantLocalAdmin(@Named("origin") String user, @Named("user") String target, @Named("location") Long location) throws OAuthRequestException {
        Require.localAdmin(user, location);
        Require.exist(target);

        ACL acl = ACLManager.getACL(target, location);
        if (acl == null) {
            acl = new ACL();
            acl.location = location;
            acl.user = target;
        }
        acl.status = ACLStatus.ADMIN;

        ObjectifyService.ofy().save().entity(acl);
    }

    @ApiMethod(
            name = "grantGlobalAdmin",
            path = "grant/global",
            httpMethod = ApiMethod.HttpMethod.GET
    )
    public void grantGlobalAdmin(@Named("token") String token, @Named("user") String target) throws OAuthRequestException {
        Require.appAdmin(token);
        Require.exist(target);

        Person person = ObjectifyService.ofy().load().type(Person.class).id(target).safe();

        person.globalAdmin = true;

        ObjectifyService.ofy().save().entity(person);
    }

    @ApiMethod(
            name = "register",
            path = "register",
            httpMethod = ApiMethod.HttpMethod.GET
    )
    public void register(@Named("origin") String user, @Named("username") String username, @Named("startupName") String startupName) {
        Person person = ObjectifyService.ofy().load().type(Person.class).id(user).now();
        if (person == null) {
            person = new Person();
            person.globalAdmin = false;
            person.mail = user;
            person.startupName = startupName;
        }
        person.name = username;

        ObjectifyService.ofy().save().entity(person);
    }

    @ApiMethod(
            name = "postulate",
            path = "postulate",
            httpMethod = ApiMethod.HttpMethod.GET
    )
    public void postulate(@Named("origin") String user, @Named("location") Long location) throws OAuthRequestException {
        Require.exist(user);

        ACL acl = ACLManager.getACL(user, location);
        if (acl == null) {
            acl = new ACL();
            acl.location = location;
            acl.user = user;
            acl.status = ACLStatus.PENDING;

            ObjectifyService.ofy().save().entity(acl);
            
            PersonsEndpoint personsEndPoint = new PersonsEndpoint();
            List<Person> adminList = personsEndPoint.list(location, ACLStatus.ADMIN);
            if(adminList.size() > 0){
                String emailArrayString = "";
                //prepare the admin emails
                for (Person admin : adminList) {
                    emailArrayString = emailArrayString + admin.mail + ";";
                }
                LocationsEndpoint locationEndPoint = new LocationsEndpoint();
                Location locationObj = locationEndPoint.get(location);
                EmailTemplate.adviseByEmailLocationAdmins(user,locationObj,emailArrayString);
            }
        }
    }

    @ApiMethod(
            name = "promote",
            path = "promote",
            httpMethod = ApiMethod.HttpMethod.GET
    )
    public void promote(@Named("origin") String user, @Named("location") Long location, @Named("user") String target) throws OAuthRequestException {
        Require.localAdmin(user, location);
        Require.exist(target);

        Person trgt = ObjectifyService.ofy().load().type(Person.class).id(target).now();
        if (trgt == null) {
            return;
        }
        if (trgt.favorite == null) {
            trgt.favorite = location;
            ObjectifyService.ofy().save().entity(trgt);
        }

        ACL acl = ACLManager.getACL(target, location);

        if (acl == null) {
            acl = new ACL();
            acl.location = location;
            acl.user = target;

        }
        acl.status = ACLStatus.USER;

        ObjectifyService.ofy().save().entity(acl);
    }

    @ApiMethod(
            name = "demote",
            path = "demote",
            httpMethod = ApiMethod.HttpMethod.GET
    )
    public void demote(@Named("origin") String user, @Named("location") Long location, @Named("user") String target) throws OAuthRequestException {
        Require.localAdmin(user, location);
        Require.exist(target);

        ACL acl = ACLManager.getACL(target, location);
        
        if (acl != null) {
            ObjectifyService.ofy().delete().entity(acl);
            NamespaceManager.set(location.toString());
            LOG.info("FOUND : " + 
                String.valueOf(
                    ObjectifyService.ofy().load().type(Reservation.class)
                        .filter("person", target)
                        .filter("date >", new Date())
                        .list().size()
                )
            );
            ObjectifyService.ofy().delete().keys(
                ObjectifyService.ofy().load().type(Reservation.class)
                    .filter("person", target)
                    .filter("date >", new Date())
                    .keys()
            );
        }
    }
    private static final Logger LOG = Logger.getLogger(ACLEndpoint.class.getName());

    @ApiMethod(
            name = "status",
            path = "status",
            httpMethod = ApiMethod.HttpMethod.GET
    )
    public List<ACL> status(@Named("origin") String user) throws OAuthRequestException {

        return ObjectifyService.ofy().load().type(ACL.class).filter("user", user).list();

    }

}
