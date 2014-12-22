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
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import org.junit.After;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Test;

public class PurposesEndpointTest {
    private Long location = 1L;
    private String user = "me@test.local";
    private Date date;
    private final LocalServiceTestHelper helper
            = new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());

    static {
        ObjectifyService.factory().register(Purpose.class);
    }
    
    public PurposesEndpointTest() {
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
     * Test of list method, of class PurposesEndpoint.
     */
    @Test
    public void testList() throws Exception {
        PurposesEndpoint instance = new PurposesEndpoint();
        List<Purpose> result = instance.list(user, location);
        //assertEquals(1, result.size());
    }
    
}
