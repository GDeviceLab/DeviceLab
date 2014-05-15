package eu.revevol.calendar.util;

import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.googlecode.objectify.ObjectifyService;
import eu.revevol.calendar.constants.ACLStatus;
import eu.revevol.calendar.model.ACL;
import eu.revevol.calendar.model.Location;
import eu.revevol.calendar.model.Person;
import org.junit.After;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Test;

/**
 *
 * @author Clement Hannicq <clement.hannicq@revevol.eu>
 */
public class ACLManagerTest {
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
    public ACLManagerTest() {
    }
    
    @Before
    public void setUp() {
        helper.setUp();
        
        ACL join = new ACL();
        join.location = loc;
        join.user = target;
        join.status = ACLStatus.USER;
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
     * Test of getACL method, of class ACLManager.
     */
    @Test
    public void testGetACL() {
        ACL acl = ACLManager.getACL(admin, loc);
        
        assertNotNull(acl);
    }
    
    @Test
    public void testGetACLNull() {
        ACL acl = ACLManager.getACL("not@in.db", loc);
        
        assertNull(acl);
    }
    
}
