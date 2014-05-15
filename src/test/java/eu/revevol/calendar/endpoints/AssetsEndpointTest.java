/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package eu.revevol.calendar.endpoints;

import com.google.appengine.api.NamespaceManager;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.googlecode.objectify.ObjectifyService;
import eu.revevol.calendar.constants.ACLStatus;
import eu.revevol.calendar.model.ACL;
import eu.revevol.calendar.model.Asset;
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
public class AssetsEndpointTest {
    private Long location = 1L;
    private String user = "me@test.local";
    private long aclID = 23L;
    private final LocalServiceTestHelper helper
            = new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());

    static {
        ObjectifyService.factory().register(Person.class);
        ObjectifyService.factory().register(ACL.class);
        ObjectifyService.factory().register(Asset.class);
    }
    public AssetsEndpointTest() {
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
        ObjectifyService.ofy().save().entity(acl).now();
        
        NamespaceManager.set(location.toString());
        Asset a = new Asset();
        a.id = 1L;
        a.name = "a";
        a.active = true;
        ObjectifyService.ofy().save().entity(a).now();
        Asset b = new Asset();
        b.id = 2L;
        b.name = "b";
        b.active = true;
        ObjectifyService.ofy().save().entity(b).now();
        Asset c = new Asset();
        b.id = 3L;
        b.name = "b";
        b.active = false;
        ObjectifyService.ofy().save().entity(b).now();
        
        NamespaceManager.set("");
    }
    
    @After
    public void tearDown() {
        helper.tearDown();
    }

    /**
     * Test of get method, of class AssetsEndpoint.
     */
    @Test
    public void testGet() throws Exception {
        Long id = 1L;
        AssetsEndpoint instance = new AssetsEndpoint();
        Asset result = instance.get(user, location, id);
        assertEquals("a", result.name);
    }

    /**
     * Test of list method, of class AssetsEndpoint.
     */
    @Test
    public void testList() throws Exception {
        AssetsEndpoint instance = new AssetsEndpoint();
        List<Asset> result = instance.list(user, location);
        assertEquals("Counting active assets", 2, result.size());
    }

    /**
     * Test of put method, of class AssetsEndpoint.
     */
    @Test
    public void testPut() throws Exception {
        Asset r = new Asset();
        r.id = 23L;
        r.name="new asset";
        AssetsEndpoint instance = new AssetsEndpoint();
        instance.put(user, location, r);
        NamespaceManager.set(location.toString());
        
        Asset asset = ObjectifyService.ofy().load().type(Asset.class).id(23L).now();
        assertNotNull("Found the inserted Asset", asset);
    }

    /**
     * Test of delete method, of class AssetsEndpoint.
     */
    @Test
    public void testDelete() throws Exception {
        Long id = 1L;
        AssetsEndpoint instance = new AssetsEndpoint();
        instance.delete(user, location, id);
        NamespaceManager.set("");

        List<Asset> result = instance.list(user, location);
        assertEquals("Counting assets left", 1, result.size());
        
        //asset should still be accessible
        NamespaceManager.set("");
        instance.get(user, location, id);
    }
    
}
