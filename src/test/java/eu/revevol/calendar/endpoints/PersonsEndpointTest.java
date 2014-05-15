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
import eu.revevol.calendar.model.Person;
import java.util.Date;
import java.util.List;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author Clement Hannicq <clement.hannicq@revevol.eu>
 */
public class PersonsEndpointTest {
    private Long location = 1L;
    private String user = "me@test.local";
    private String active = "active@locat.ion";
    private String admin = "admin@locat.ion";
    private String pending ="pending@locat.ion";
    private final LocalServiceTestHelper helper
            = new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());

    static {
        ObjectifyService.factory().register(Person.class);
        ObjectifyService.factory().register(ACL.class);
    }
    public PersonsEndpointTest() {
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
        
        Person p_admin = new Person();
        p_admin.mail = admin;
        p_admin.name = "Me";
        p_admin.globalAdmin = false;
        ObjectifyService.ofy().save().entity(p_admin).now();
        
        Person p_active = new Person();
        p_active.mail = active;
        p_active.name = "Me";
        p_active.globalAdmin = false;
        ObjectifyService.ofy().save().entity(p_active).now();
        
        Person p_pending = new Person();
        p_pending.mail = pending;
        p_pending.name = "Me";
        p_pending.globalAdmin = false;
        ObjectifyService.ofy().save().entity(p_pending).now();
        
        ACL a_admin = new ACL();
        a_admin.location = location;
        a_admin.user = admin;
        a_admin.status = ACLStatus.ADMIN;
        ObjectifyService.ofy().save().entity(a_admin).now();
        
        ACL a_active = new ACL();
        a_active.location = location;
        a_active.user = active;
        a_active.status = ACLStatus.USER;
        ObjectifyService.ofy().save().entity(a_active).now();
        
        ACL a_pending = new ACL();
        a_pending.location = location;
        a_pending.user = pending;
        a_pending.status = ACLStatus.PENDING;
        ObjectifyService.ofy().save().entity(a_pending).now();
        
    }
    
    @After
    public void tearDown() {
        helper.tearDown();
    }

    /**
     * Test of getMyself method, of class PersonsEndpoint.
     */
    @Test
    public void testGetMyself() throws Exception {
        PersonsEndpoint instance = new PersonsEndpoint();
        Person result = instance.getMyself(user);
        assertEquals("Return is the user", user, result.mail);
    }

    /**
     * Test of setFavorite method, of class PersonsEndpoint.
     */
    @Test
    public void testSetFavorite() throws Exception {
        PersonsEndpoint instance = new PersonsEndpoint();
        instance.setFavorite(user, location);
        
        Person person = ObjectifyService.ofy().load().type(Person.class).id(user).safe();
        assertEquals("New location is assigned", location, person.favorite);
    }

    /**
     * Test of get method, of class PersonsEndpoint.
     */
    @Test
    public void testGet() {
        System.out.println("get");
        String mail = user;
        PersonsEndpoint instance = new PersonsEndpoint();
        Person result = instance.get(mail);
        assertEquals(user, result.mail);
    }

    /**
     * Test of listActives method, of class PersonsEndpoint.
     */
    @Test
    public void testListActives() throws Exception {
        PersonsEndpoint instance = new PersonsEndpoint();
        List<Person> result = instance.listActives(user, location);
        assertEquals(active, result.get(0).mail);
    }

    /**
     * Test of listPending method, of class PersonsEndpoint.
     */
    @Test
    public void testListPending() throws Exception {
        PersonsEndpoint instance = new PersonsEndpoint();
        List<Person> result = instance.listPending(user, location);
        assertEquals(pending, result.get(0).mail);
    }

    /**
     * Test of listAdmins method, of class PersonsEndpoint.
     */
    @Test
    public void testListAdmins() throws Exception {
        PersonsEndpoint instance = new PersonsEndpoint();
        List<Person> result = instance.listAdmins(user, location);
        assertEquals(admin, result.get(0).mail);
    }
    
}
