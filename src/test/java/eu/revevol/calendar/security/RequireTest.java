/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package eu.revevol.calendar.security;

import com.google.appengine.api.oauth.OAuthRequestException;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.googlecode.objectify.ObjectifyService;
import eu.revevol.calendar.constants.ACLStatus;
import eu.revevol.calendar.model.ACL;
import eu.revevol.calendar.model.Person;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

/**
 *
 * @author Clement Hannicq <clement.hannicq@revevol.eu>
 */
public class RequireTest {
    
    private final String admin = "global@admin.test";
    private final String local = "local@admin.test";
    private final String target = "target@admin.test";
    private final Long loc = 0L;


    private final LocalServiceTestHelper helper
            = new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());

    static {
        ObjectifyService.factory().register(Person.class);
        ObjectifyService.factory().register(ACL.class);
    }
    
    public RequireTest() {
    }
    
    @Before
    public void setUp() {
        helper.setUp();
        
        Person pg = new Person();
        pg.globalAdmin = true;
        pg.mail = admin;
        pg.name = "Admin";
        ObjectifyService.ofy().save().entity(pg).now();
        
        Person pa = new Person();
        pa.globalAdmin = false;
        pa.mail = local;
        pa.name = "Admin Local";
        ObjectifyService.ofy().save().entity(pa).now();
        
        Person p = new Person();
        p.globalAdmin = false;
        p.mail = target;
        p.name = "User";
        ObjectifyService.ofy().save().entity(p).now();
        
        ACL a = new ACL();
        a.location = loc;
        a.user = local;
        a.status = ACLStatus.ADMIN;
        ObjectifyService.ofy().save().entity(a).now();
        
        ACL u = new ACL();
        u.location = loc;
        u.user = target;
        u.status = ACLStatus.USER;
        ObjectifyService.ofy().save().entity(u).now();
    }
    
    @After
    public void tearDown() {
        helper.tearDown();
    }

    /**
     * Test of localAdmin method, of class Require.
     */
    @Test
    public void testLocalAdmin() throws Exception {
        Require.localAdmin(local, loc);
    }
    
    @Test(expected = OAuthRequestException.class)
    public void testLocalAdminFail() throws Exception {
        Require.localAdmin(target, loc);
    }

    /**
     * Test of access method, of class Require.
     */
    @Test
    public void testAccess() throws Exception {
        Require.access(target, loc);
    }
    
    @Test(expected = OAuthRequestException.class)
    public void testAccessFail() throws Exception
    {
        Require.access("no@on.e", loc);
    }

    /**
     * Test of globalAdmin method, of class Require.
     */
    @Test
    public void testGlobalAdmin() throws Exception {
        Require.globalAdmin(admin);
    }
    
    @Test(expected = OAuthRequestException.class)
    public void testGlobalAdminFail() throws Exception
    {
        Require.globalAdmin(local);
    }

    /**
     * Test of exist method, of class Require.
     */
    @Test
    public void testExist() throws Exception {
        Require.exist(target);
    }
    
    @Test(expected = OAuthRequestException.class)
    public void testExistFail() throws Exception {
        Require.exist("not@in.db");
    }
    
    /**
     * Test of owner method, of class Require.
     */
    @Test
    public void testOwner() throws Exception {
        Require.owner(target, loc, target);
    }
    
    @Test(expected = OAuthRequestException.class)
    public void testOwnerFail() throws Exception {
        Require.owner(target, loc, "another@owner");
    }
    
    @Test
    public void testOwnerAdmin() throws Exception {
        Require.owner(local, loc, target);
    }
}
