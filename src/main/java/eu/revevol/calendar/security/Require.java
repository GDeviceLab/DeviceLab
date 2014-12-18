package eu.revevol.calendar.security;

import com.google.appengine.api.oauth.OAuthRequestException;
import com.google.gson.Gson;
import com.googlecode.objectify.ObjectifyService;
import eu.revevol.calendar.constants.ACLStatus;
import eu.revevol.calendar.endpoints.SetupEndpoint;
import eu.revevol.calendar.model.ACL;
import eu.revevol.calendar.model.Person;
import eu.revevol.calendar.util.ACLManager;
import java.util.logging.Logger;

/**
 *
 * @author Clement Hannicq <clement.hannicq@revevol.eu>
 */
public class Require {
    
    private static Logger logger = Logger.getLogger(Require.class.getName());

    private static Person getPerson(String mail) throws OAuthRequestException {

        Person p = ObjectifyService.ofy().load().type(Person.class).id(mail).now();
        if (p == null) {
            throw new OAuthRequestException("User not in database");
        }
        return p;
    }

    private static ACL getACL(String mail, Long location) throws OAuthRequestException {
        ACL acl = ACLManager.getACL(mail, location);

        if (acl == null) {
            throw new OAuthRequestException("Issue with " + mail + " ACL");
        }
        return acl;
    }

    /**
     * Throws exception if the user isn't the specified user or local admin
     * 
     * @param user
     * @param location
     * @param owner
     * @throws OAuthRequestException
     */
    public static void owner(String user, Long location, String owner) throws OAuthRequestException {
        if(user.equals(owner)){
            return;
        }
        localAdmin(user, location);
    }
    
    /**
     * Throws exception if the user isn't a local admin
     *
     * @param user
     * @param location
     * @throws OAuthRequestException
     */
    public static void localAdmin(String user, Long location) throws OAuthRequestException {
        Person p = getPerson(user);
        if (p.globalAdmin) {
            return;
        }
        ACL acl = getACL(user, location);
        if (acl.status != ACLStatus.ADMIN) {

            throw new OAuthRequestException("Access refused");

        }
    }

    /**
     * Throws an exception if the user isn't allowed access to that location
     *
     * @param user
     * @param location
     * @throws OAuthRequestException
     */
    public static void access(String user, Long location) throws OAuthRequestException {
        Person p = getPerson(user);
        if (p.globalAdmin) {
            return;
        }
        ACL acl = getACL(user, location);
        if (acl.status == ACLStatus.PENDING) {

            throw new OAuthRequestException("Access refused");
        }
    }

    /**
     * Throws an exception if the user isn't global Admin
     *
     * @param user
     * @throws OAuthRequestException
     */
    public static void globalAdmin(String user) throws OAuthRequestException {
        Person p = getPerson(user);
        if (p.globalAdmin == false) {
            throw new OAuthRequestException("Access refused");
        }
    }

    /**
     * Throws an exception if the user doesn't exists
     *
     * @param user
     * @throws OAuthRequestException
     */
    public static void exist(String user) throws OAuthRequestException {
        getPerson(user);
    }

    /**
     * Throws an exception if the user isn't an application admin
     *
     * @param token
     * @throws OAuthRequestException
     */
    public static void appAdmin(String token) throws OAuthRequestException {
        Token t = ObjectifyService.ofy().load().type(Token.class).id(token).safe();
        
        logger.info(new Gson().toJson(t).toString());
        
        if (t.admin == false) {
            throw new OAuthRequestException("User not app admin");
        }
    }
}
