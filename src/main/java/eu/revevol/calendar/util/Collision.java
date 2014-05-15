package eu.revevol.calendar.util;

import com.googlecode.objectify.ObjectifyService;
import eu.revevol.calendar.model.Asset;
import eu.revevol.calendar.model.Reservation;
import java.util.List;

/**
 *
 * @author Clement Hannicq <clement.hannicq@revevol.eu>
 */
public class Collision {

    public static boolean collide(Reservation a, Reservation b) {
        //Reservations have to be valid
        if(a.end <= a.start){
            return true;
        }
        if(b.end <= b.start){
            return true;
        }
        
        //A reservation cannot collide with herself
        if (a.id.equals(b.id)) {
            return false;
        }
        //Just in case : a reservation can oly collide on a reservation on the same day
        if (!a.date.equals(b.date)) {
            return false;
        }
        
        //Checking if hours does overlap
        if(a.end <= b.start || b.end <= a.start){
            //Doesn't overlap
            return false;
        }
        
        //Checking devices match
        List<Asset> a_assets = a.getAssets();
        List<Asset> b_assets = b.getAssets();
        for (Asset c : a_assets) {
            for (Asset d : b_assets) {
                if (c.id.equals(d.id)) {
                    //There is a match
                    return true;
                }
            }
        }

        return false;
    }
    
    public static boolean allowed(Reservation reservation){
        List<Reservation> list = ObjectifyService.ofy().load().
                type(Reservation.class).filter("date", reservation.date).list();
        for(Reservation existing : list){
            if(collide(existing, reservation)){
                return false;
            }
        }
        
        //No collision
        return true;
    }
}
