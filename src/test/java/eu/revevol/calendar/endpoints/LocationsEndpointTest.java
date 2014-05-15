/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.revevol.calendar.endpoints;

import com.google.appengine.api.users.User;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.googlecode.objectify.ObjectifyService;
import eu.revevol.calendar.constants.ACLStatus;
import eu.revevol.calendar.model.ACL;
import eu.revevol.calendar.model.Location;
import eu.revevol.calendar.model.Person;
import java.util.List;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author Clement Hannicq <clement.hannicq@revevol.eu>
 */
public class LocationsEndpointTest {
    private final String admin = "magic@mike.me";
    private final String dummy = "du@m.my";
    private final long location = 1L;
    private final LocalServiceTestHelper helper
            = new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());

    static {
        ObjectifyService.factory().register(Person.class);
        ObjectifyService.factory().register(ACL.class);
        ObjectifyService.factory().register(Location.class);
    }

    public LocationsEndpointTest() {
    }

    @Before
    public void setUp() {
        helper.setUp();
        
        Person a = new Person();
        a.globalAdmin = true;
        a.mail = admin;
        a.name = "Magic Mike";
        ObjectifyService.ofy().save().entity(a).now();
        
        Person b = new Person();
        b.globalAdmin = true;
        b.mail = dummy;
        b.name = "Dummy";
        ObjectifyService.ofy().save().entity(b).now();
        
        ACL acl = new ACL();
        acl.location = location;
        acl.status = ACLStatus.ADMIN;
        acl.user = admin;
        ObjectifyService.ofy().save().entity(acl).now();
        
        Location locat = new Location();
        locat.id = location;
        locat.name = "Somewhere";
        ObjectifyService.ofy().save().entity(locat).now();
        
        Location locat2 = new Location();
        locat2.id = location*2;
        locat2.name = "Anywhere";
        ObjectifyService.ofy().save().entity(locat2).now();
    }

    @After
    public void tearDown() {
        helper.tearDown();
    }

    /**
     * Test of put method, of class LocationsEndpoint.
     */
    @Test
    public void testPut() throws Exception {
        Location l = new Location();
        l.id = 4L;
        l.name = "Some Location";
        LocationsEndpoint instance = new LocationsEndpoint();
        instance.put(admin, l);
        
    }

    /**
     * Test of list method, of class LocationsEndpoint.
     */
    @Test
    public void testList() {
        LocationsEndpoint instance = new LocationsEndpoint();
        List<Location> result = instance.list();
        assertEquals(2, result.size());
    }

    /**
     * Test of getActives method, of class LocationsEndpoint.
     */
    @Test
    public void testGetActives() throws Exception {
        LocationsEndpoint instance = new LocationsEndpoint();
        List<Location> result = instance.getActives(admin);
        assertEquals(1, result.size());
    }
    
    @Test
    public void testGetActivesFail() throws Exception {
        LocationsEndpoint instance = new LocationsEndpoint();
        List<Location> result = instance.getActives(dummy);
        assertEquals(0, result.size());
    }

}
