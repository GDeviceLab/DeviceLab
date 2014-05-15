package eu.revevol.calendar.util;

import com.googlecode.objectify.ObjectifyService;
import eu.revevol.calendar.model.ACL;
import java.util.List;
import java.util.logging.Logger;

/**
 *
 * @author Clement <clement.hannicq@revevol.eu>
 */
public class ACLManager {
    public static ACL getACL(String user, Long location){
    List<ACL> acl = ObjectifyService.ofy().load().type(ACL.class)
            .filter("user", user)
            .filter("location", location).list();
        if (acl.size() != 1) {
            LOG.warning("USER+LOCAL ACL found : "+acl.size());
            return null;
        }

        return acl.get(0);
    }
    private static final Logger LOG = Logger.getLogger(ACLManager.class.getName());
}
