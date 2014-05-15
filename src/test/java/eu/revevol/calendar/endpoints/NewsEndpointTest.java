package eu.revevol.calendar.endpoints;

import com.googlecode.objectify.NotFoundException;
import com.google.appengine.api.NamespaceManager;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.googlecode.objectify.ObjectifyService;
import eu.revevol.calendar.constants.ACLStatus;
import eu.revevol.calendar.model.ACL;
import eu.revevol.calendar.model.Location;
import eu.revevol.calendar.model.News;
import eu.revevol.calendar.model.Person;
import java.util.Date;
import java.util.List;
import org.junit.After;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Test;

/**
 *
 * @author Clement Hannicq <clement.hannicq@revevol.eu>
 */
public class NewsEndpointTest {

    private Long location = 1L;
    private Long locationB = 323L;
    private String user = "me@test.local";
    private final Long now = new Date().getTime();
    private long aclID = 23L;
    
    private final LocalServiceTestHelper helper
            = new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());

    static {
        ObjectifyService.factory().register(News.class);
        ObjectifyService.factory().register(Person.class);
        ObjectifyService.factory().register(ACL.class);
        ObjectifyService.factory().register(Location.class);
    }

    public NewsEndpointTest() {
    }

    @Before
    public void setUp() {
        helper.setUp();
        NamespaceManager.set("");
        Person me = new Person();
        me.mail = user;
        me.name = "Me";
        me.globalAdmin = true;
        
        ObjectifyService.ofy().save().entity(me).now();
        
        ACL acl = new ACL();
        acl.id = aclID;
        acl.location = location;
        acl.status = ACLStatus.ADMIN;
        acl.user = user;
        acl.last = new Date(now - 1000L);
        ObjectifyService.ofy().save().entity(acl).now();
        
        Location A = new Location();
        A.id = location;
        A.name = "A";
        ObjectifyService.ofy().save().entity(A).now();
        
        Location B = new Location();
        B.id = locationB;
        B.name = "B";
        ObjectifyService.ofy().save().entity(B).now();
        
        NamespaceManager.set(location.toString());
        News new1 = new News();
        new1.id = 1L;
        new1.author = user;
        new1.content = "new1";
        new1.date = new Date(now - 500L);
        new1.broadcast = false;
        ObjectifyService.ofy().save().entity(new1).now();
        News new2 = new News();
        new2.id=3L;
        new2.author = user;
        new2.content = "new2";
        new2.date = new Date(now - 1500L);
        new1.broadcast = false;
        ObjectifyService.ofy().save().entity(new2).now();
        
        NamespaceManager.set("");
        
    }

    @After
    public void tearDown() {
    }

    /**
     * Test of put method, of class NewsEndpoint.
     */
    @Test
    public void testPutA() throws Exception {
        News n = new News();
        n.id= 42L;
        n.author = user;
        n.date = new Date(now);
        n.title = "title";
        n.content = "content";
        n.broadcast = false;
        NewsEndpoint instance = new NewsEndpoint();
        instance.put(user, location, n);
        
        NamespaceManager.set(location.toString());
        ObjectifyService.ofy().load().type(News.class).id(42L).safe();
    }
    
    @Test(expected = NotFoundException.class)
    public void testPutAnotB() throws Exception {
        News n = new News();
        n.id= 42L;
        n.author = user;
        n.date = new Date(now);
        n.title = "title";
        n.content = "content";
        n.broadcast = false;
        NewsEndpoint instance = new NewsEndpoint();
        instance.put(user, location, n);
        
        NamespaceManager.set("");
        instance.get(user, locationB, 42L);
    }
    
    @Test
    public void testPutAB() throws Exception {
        News n = new News();
        n.id= 42L;
        n.author = user;
        n.date = new Date(now);
        n.title = "title";
        n.content = "content";
        n.broadcast = true;
        NewsEndpoint instance = new NewsEndpoint();
        instance.put(user, location, n);
        
        NamespaceManager.set("");
        assertNotNull("News should exist in namespace B", instance.get(user, locationB, 42L));
    }

    /**
     * Test of get method, of class NewsEndpoint.
     */
    @Test
    public void testGet() throws Exception {
        Long id = 1L;
        NewsEndpoint instance = new NewsEndpoint();
        
        News result = instance.get(user, location, id);
        assertEquals("new1", result.content);
    }

    /**
     * Test of fetch method, of class NewsEndpoint.
     */
    @Test
    public void testFetch03() throws Exception {
        int rank = 0;
        int count = 3; 
        NewsEndpoint instance = new NewsEndpoint();
        List<News> result = instance.fetch(user, location, rank, count);
        assertEquals(2, result.size()); //there is only 2 news on the datastore
    }
    
    @Test
    public void testFetch13() throws Exception {
        int rank = 1;
        int count = 3; 
        NewsEndpoint instance = new NewsEndpoint();
        List<News> result = instance.fetch(user, location, rank, count);
        assertEquals(1, result.size()); //there is only 2 news on the datastore
    }
    
    /**
     * Test of read method, of class NewsEndpoint.
     */
    @Test
    public void testRead() throws Exception {
        NewsEndpoint instance = new NewsEndpoint();
        instance.read(user, location);
        
        NamespaceManager.set("");
        ACL acl = ObjectifyService.ofy().load().type(ACL.class).id(aclID).safe();
        assertTrue("ACL has been updated to a more recent value", acl.last.getTime() >= now);
    }
    
    /**
     * Test of read method, of class NewsEndpoint.
     */
    @Test
    public void testLatest() throws Exception {
        NewsEndpoint instance = new NewsEndpoint();
        List<News> result = instance.latest(user, location);
        assertEquals("Should find only one result", 1, result.size());
    }

}
