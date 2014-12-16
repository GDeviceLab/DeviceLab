package eu.revevol.calendar.endpoints;

import com.google.appengine.api.users.User;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.googlecode.objectify.ObjectifyService;
import eu.revevol.calendar.constants.ACLStatus;
import eu.revevol.calendar.model.*;
import java.util.List;
import java.util.logging.Logger;
import org.junit.After;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Test;

/**
 *
 * @author Clement Hannicq <clement.hannicq@revevol.eu>
 */
public class ACLEndpointTest {

    private final String admin = "admin@admin.test";
    private final String target = "target@admin.test";
    private final Long loc = 0L;

    private final LocalServiceTestHelper helper
            = new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());

    static {
        ObjectifyService.factory().register(Person.class);
        ObjectifyService.factory().register(ACL.class);
        ObjectifyService.factory().register(Location.class);
    }

    public ACLEndpointTest() {
    }

    @Before
    public void setUp() {
        helper.setUp();
        
        Person pa = new Person();
        pa.mail = admin;
        pa.name = "AdminAdmin";
        pa.globalAdmin = true;
        ObjectifyService.ofy().save().entity(pa).now();
        
        Person p = new Person();
        p.mail = target;
        p.name = "Other";
        p.globalAdmin = false;
        ObjectifyService.ofy().save().entity(p).now();
        
        ACL join = new ACL();
        join.location = loc;
        join.user = target;
        join.status = ACLStatus.PENDING;
        ObjectifyService.ofy().save().entity(join).now();
        
        ACL ad = new ACL();
        ad.location = loc;
        ad.user = admin;
        ad.status = ACLStatus.ADMIN;
        ObjectifyService.ofy().save().entity(ad).now();
    }

    @After
    public void tearDown() {
        helper.tearDown();
    }

    /**
     * Test of register method, of class ACLEndpoint.
     */
    @org.junit.Test
    public void testRegister() throws Exception{
        String username = "New Guy";
        String startupName = "New Startup name";

        ACLEndpoint instance = new ACLEndpoint();
        instance.register("new@guy.com", username, startupName);
    }

    /**
     * Test of postulate method, of class ACLEndpoint.
     */
    @org.junit.Test
    public void testPostulate() throws Exception {

        ACLEndpoint instance = new ACLEndpoint();
        instance.postulate(target, loc);
        
        List<ACL> acls = ObjectifyService.ofy().load().type(ACL.class)
                .filter("location", loc)
                .filter("user", target).list();
        
        assertEquals(1, acls.size());
        assertEquals(ACLStatus.PENDING, acls.get(0).status);
    }

    /**
     * Test of promote method, of class ACLEndpoint.
     */
    @org.junit.Test
    public void testPromote() throws Exception {
        ACLEndpoint instance = new ACLEndpoint();
        instance.promote(admin, loc, target);
    }
}
