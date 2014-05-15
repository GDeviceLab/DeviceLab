package eu.revevol.calendar.util;

import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.googlecode.objectify.ObjectifyService;
import eu.revevol.calendar.model.Asset;
import eu.revevol.calendar.model.Reservation;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import org.junit.After;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Test;

/**
 *
 * @author Clement Hannicq <clement.hannicq@revevol.eu>
 */
public class CollisionTest {

    private final LocalServiceTestHelper helper
            = new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());


    private ArrayList<Asset> assets = new ArrayList<Asset>();

    private Reservation A10_12 = new Reservation();
    private Reservation A10_12bis = new Reservation();
    private Reservation A10_12other = new Reservation();
    private Reservation AB10_12 = new Reservation();
    private Reservation B10_12 = new Reservation();
    private Reservation A8_10 = new Reservation();
    private Reservation A12_15 = new Reservation();

    static {
        ObjectifyService.factory().register(Asset.class);

    }

    public CollisionTest() {
    }

    @Before
    public void setUp() {
        Calendar calendar = new GregorianCalendar();
        calendar.set(2014, 3, 14);
        Date date = calendar.getTime();
        calendar.add(Calendar.DATE, 1);
        Date datePlusOne = calendar.getTime();
        helper.setUp();

        Asset a = new Asset();
        a.name = "a";
        a.id = 1L;
        assets.add(a);
        Asset b = new Asset();
        b.name = "b";
        b.id = 2L;
        assets.add(b);
        ObjectifyService.ofy().save().entities(assets).now();
        ArrayList<Asset> La = new ArrayList<Asset>();
        La.add(a);
        ArrayList<Asset> Lab = new ArrayList<Asset>();
        Lab.add(a);
        Lab.add(b);
        ArrayList<Asset> Lb = new ArrayList<Asset>();
        La.add(b);

        A10_12.date = date;
        A10_12.start = 10;
        A10_12.end = 12;
        A10_12.id = 10121L;
        A10_12.setAssets(La);

        A10_12bis.date = date;
        A10_12bis.start = 10;
        A10_12bis.end = 12;
        A10_12bis.id = A10_12.id;
        A10_12bis.setAssets(Lab);

        A10_12other.date = datePlusOne;
        A10_12other.start = 10;
        A10_12other.end = 12;
        A10_12other.id = 101218L;
        A10_12other.setAssets(La);

        AB10_12.date = date;
        AB10_12.start = 10;
        AB10_12.end = 12;
        AB10_12.id = 10122L;
        AB10_12.setAssets(Lab);

        B10_12.date = date;
        B10_12.start = 10;
        B10_12.end = 12;
        B10_12.id = 10123L;
        B10_12.setAssets(Lb);

        A8_10.date = date;
        A8_10.start = 8;
        A8_10.end = 10;
        A8_10.id = 1012134L;
        A8_10.setAssets(La);

        A12_15.date = date;
        A12_15.start = 12;
        A12_15.end = 15;
        A12_15.id = 10121344L;
        A12_15.setAssets(La);
    }

    @After
    public void tearDown() {
        helper.tearDown();
    }

    /**
     * Test of collide method, of class Collision.
     */
    @Test
    public void testManyDevices() {
        boolean expResult = true;
        boolean result = Collision.collide(A10_12, AB10_12);
        assertEquals(expResult, result);
    }
    
    @Test
    public void testUpdate() {
        boolean expResult = false;
        boolean result = Collision.collide(A10_12, A10_12bis);
        assertEquals(expResult, result);
    }
    
    @Test
    public void testOtherDay() {
        boolean expResult = false;
        boolean result = Collision.collide(A10_12, A10_12other);
        assertEquals(expResult, result);
    }
    
    @Test
    public void testOtherAsset() {
        boolean expResult = false;
        boolean result = Collision.collide(A10_12, B10_12);
        assertEquals(expResult, result);
    }
    
    @Test
    public void testBefore() {
        boolean expResult = false;
        boolean result = Collision.collide(A10_12, A12_15);
        assertEquals(expResult, result);
    }
    
    @Test
    public void testAfter() {
        boolean expResult = false;
        boolean result = Collision.collide(A8_10, A10_12);
        assertEquals(expResult, result);
    }

}
