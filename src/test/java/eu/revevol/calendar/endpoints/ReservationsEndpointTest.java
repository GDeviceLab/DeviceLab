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
import eu.revevol.calendar.model.ACL;
import eu.revevol.calendar.model.Person;
import eu.revevol.calendar.model.Purpose;
import eu.revevol.calendar.model.Reservation;
import eu.revevol.calendar.util.Methods;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import org.junit.After;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Test;

/**
 *
 * @author Clement Hannicq <clement.hannicq@revevol.eu>
 */
public class ReservationsEndpointTest {
    private Long location = 1L;
    private String user = "me@test.local";
    private Date date;
    private final LocalServiceTestHelper helper
            = new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());

    static {
        ObjectifyService.factory().register(Person.class);
        ObjectifyService.factory().register(ACL.class);
        ObjectifyService.factory().register(Reservation.class);
        ObjectifyService.factory().register(Purpose.class);
    }
    
    public ReservationsEndpointTest() {
    }
    
    @Before
    public void setUp() {
        Calendar calendar = new GregorianCalendar();
        calendar.set(2014, 3, 14);
        date = calendar.getTime();
        helper.setUp();
        NamespaceManager.set("");
        
        Person me = new Person();
        me.mail = user;
        me.name = "Me";
        me.globalAdmin = true;
        ObjectifyService.ofy().save().entity(me).now();
        
        NamespaceManager.set(location.toString());
        Reservation r1 = new Reservation();
        r1.id = 1L;
        r1.start = 8;
        r1.end = 10;
        r1.date = date;
        r1.person = user;
        ObjectifyService.ofy().save().entity(r1).now();
        
        NamespaceManager.set("");
    }
    
    @After
    public void tearDown() {
        helper.tearDown();
    }

    /**
     * Test of get method, of class ReservationsEndpoint.
     */
    @Test
    public void testGet() throws Exception {
        Long id = 1L;
        ReservationsEndpoint instance = new ReservationsEndpoint();
        Reservation result = instance.get(user, location, id);
        assertEquals(id, result.id);
    }

    /**
     * Test of list method, of class ReservationsEndpoint.
     */
    @Test
    public void testList() throws Exception {
        ReservationsEndpoint instance = new ReservationsEndpoint();
        List<Reservation> result = instance.list(user, location, date);
        assertEquals(1, result.size());
    }

    /**
     * Test of put method, of class ReservationsEndpoint.
     */
    @Test
    public void testPut() throws Exception {
        Reservation r = new Reservation();
        r.start = 10;
        r.end = 12;
        r.date = date;
        r.id = 23L;
        Purpose p = new Purpose();
        p.person = "someone";
        p.title = "title";
        p.type = "type";
        p.id = 22L;
        p.dateUpdate = Methods.getZeroTimeOfDay().getTime();
        r.purpose = p;
        ReservationsEndpoint instance = new ReservationsEndpoint();
        instance.put(user, location, r);
        
        NamespaceManager.set(location.toString());
        Reservation r2 = ObjectifyService.ofy().load().type(Reservation.class).id(23L).now();
        
        assertNotNull(r2);
        
    }

    /**
     * Test of delete method, of class ReservationsEndpoint.
     */
    @Test
    public void testDelete() throws Exception {
        Long reservation = 1L;
        ReservationsEndpoint instance = new ReservationsEndpoint();
        instance.delete(user, location, reservation);
        
        NamespaceManager.set(location.toString());
        Reservation r2 = ObjectifyService.ofy().load().type(Reservation.class).id(1L).now();
        
        assertNull(r2);
    }

    /**
     * Test of history method, of class ReservationsEndpoint.
     */
    @Test
    public void testHistory() throws Exception {
        String target = user;
        ReservationsEndpoint instance = new ReservationsEndpoint();
        List<Reservation> result = instance.history(user, location, target);
        assertEquals("Get all the reservations ", 1 , result.size());
    }
    
}
