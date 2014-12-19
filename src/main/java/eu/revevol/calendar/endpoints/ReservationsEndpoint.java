package eu.revevol.calendar.endpoints;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiMethod.HttpMethod;
import com.google.appengine.api.NamespaceManager;
import com.google.appengine.api.oauth.OAuthRequestException;
import com.google.gson.Gson;
import com.googlecode.objectify.ObjectifyService;
import eu.revevol.calendar.model.Asset;
import eu.revevol.calendar.model.Reservation;
import eu.revevol.calendar.pojo.PojoAssetReservation;
import eu.revevol.calendar.security.Require;
import eu.revevol.calendar.util.Collision;
import eu.revevol.calendar.util.Methods;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;
import javax.inject.Named;

/**
 *
 * @author Clement <clement.hannicq@revevol.eu>
 */
@Api(name = "reservation", version = "v1")
public class ReservationsEndpoint {
    
    private static Logger logger = Logger.getLogger(ReservationsEndpoint.class.getName());
    
    static {
        ObjectifyService.factory().register(Reservation.class);
        ObjectifyService.factory().register(Asset.class);
    }
    
    @ApiMethod(
            name = "get",
            path = "get",
            httpMethod = HttpMethod.GET
    )
    public Reservation get(@Named("origin") String user, @Named("location") Long location, @Named("id") Long id) throws OAuthRequestException {
        Require.access(user, location);
        
        NamespaceManager.set(location.toString());
        Reservation res = ObjectifyService.ofy().load().type(Reservation.class).id(id).safe();
        return res;
    }
    
    @ApiMethod(
            name = "list",
            path = "list",
            httpMethod = HttpMethod.GET
    )
    public List<Reservation> list(@Named("origin") String user, @Named("location") Long location, @Named("date") Date date) throws OAuthRequestException {
        Require.access(user, location);
        
        NamespaceManager.set(location.toString());
        List<Reservation> list = ObjectifyService.ofy().load().type(Reservation.class).filter("date", date).list();
        return list;
    }
    
    @ApiMethod(
            name = "put",
            path = "put",
            httpMethod = HttpMethod.POST
    )
    public void put(@Named("origin") String user, @Named("location") Long location, Reservation r) throws OAuthRequestException, Exception {
        Require.access(user, location);
        
        if (r.id != null) { //In case of modification fo a reservation
            if (!user.equals(r.person)) {
                Require.localAdmin(user, location); //if the user hasn't local admin rights : toss him
            }
        } else {
            r.person = user; //Setting author
        }
        
        NamespaceManager.set(location.toString());
        
        if (Collision.allowed(r)) {
            ObjectifyService.ofy().save().entity(r);
        } else {
            throw new Exception("RESERVATION COLLISION");
        }
        
    }
    
    @ApiMethod(
            name = "delete",
            path = "delete",
            httpMethod = HttpMethod.GET
    )
    public void delete(@Named("origin") String user, @Named("location") Long location, @Named("id") Long reservation) throws OAuthRequestException {
        NamespaceManager.set(location.toString());
        Reservation r = ObjectifyService.ofy().load().type(Reservation.class).id(reservation).now();
        NamespaceManager.set("");
        
        Require.owner(user, location, r.person);
        
        NamespaceManager.set(location.toString());
        ObjectifyService.ofy().delete().type(Reservation.class).id(reservation).now();
    }
    
    @ApiMethod(
            name = "history",
            path = "history",
            httpMethod = HttpMethod.GET
    )
    public List<Reservation> history(@Named("origin") String user, @Named("location") Long location, @Named("user") String target) throws OAuthRequestException {
        Require.access(user, location);
        
        NamespaceManager.set(location.toString());
        return ObjectifyService.ofy().load().type(Reservation.class)
                .filter("person", target).list();
    }
    
    @ApiMethod(
            name = "totalhistory",
            path = "totalhistory",
            httpMethod = HttpMethod.GET
    )
    public List<Reservation> totalhistory(@Named("origin") String user, @Named("location") Long location) throws OAuthRequestException {
        Require.localAdmin(user, location);
        
        NamespaceManager.set(location.toString());
        return ObjectifyService.ofy().load().type(Reservation.class).order("-date").list();
    }
    
    @ApiMethod(
            name = "devicesStatusList",
            path = "devicesStatusList",
            httpMethod = HttpMethod.GET
    )
    public List<PojoAssetReservation> devicesStatusList(@Named("origin") String user, @Named("location") Long location, @Named("totalHalfHour") Integer totalHalfHour) throws OAuthRequestException {
        Require.localAdmin(user, location);
        
        NamespaceManager.set(location.toString());
        
        List<PojoAssetReservation> listPojoAssetReservation = new ArrayList<PojoAssetReservation>();
        
        /**
         * 1. Add all devices of the location
         */
        List<Asset> assetList = ObjectifyService.ofy().load().type(Asset.class).list();
        for (Asset assetObj : assetList) {
            PojoAssetReservation pojoObj = new PojoAssetReservation();
            pojoObj.asset = assetObj;
            listPojoAssetReservation.add(pojoObj);
        }
        /**
         * 2. Then control all the current reservation to connect them to the device list
         */
        Date todayInit = Methods.getZeroTimeOfDay().getTime();
        List<Reservation> resList = ObjectifyService.ofy().load().type(Reservation.class).filter("date", todayInit).list();
        logger.info("totalHalfHour " + totalHalfHour.intValue());
        for (Reservation resObj : resList) {
            //take in consideration only reservation in time with now
            if(resObj.start <= totalHalfHour.intValue()
                   && resObj.end > totalHalfHour.intValue()){
                for (Asset assObj : resObj.getAssets()) {
                    logger.info(assObj.name);
                    for (PojoAssetReservation pojoRep : listPojoAssetReservation) {
                        if(assObj.id.equals(pojoRep.asset.id) ){
                            pojoRep.reservation = resObj;
                        }
                    }
                }
            }
        }
        return listPojoAssetReservation;
    }
}
