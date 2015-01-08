package eu.revevol.calendar.endpoints;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiMethod.HttpMethod;
import com.google.appengine.api.NamespaceManager;
import com.google.appengine.api.oauth.OAuthRequestException;
import com.google.gson.Gson;
import com.googlecode.objectify.ObjectifyService;
import eu.revevol.calendar.model.ACL;
import eu.revevol.calendar.model.Asset;
import eu.revevol.calendar.model.Location;
import eu.revevol.calendar.model.Person;
import eu.revevol.calendar.model.Purpose;
import eu.revevol.calendar.model.Reservation;
import eu.revevol.calendar.pojo.DevicesStat;
import eu.revevol.calendar.pojo.PojoReport;
import eu.revevol.calendar.pojo.PurposeStat;
import eu.revevol.calendar.security.Require;
import eu.revevol.calendar.util.Methods;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;
import javax.inject.Named;

@Api(name = "report", version = "v1")
public class ReportsEndpoint {
    
    private static Logger logger = Logger.getLogger(ReportsEndpoint.class.getName());
    
    static {
        ObjectifyService.factory().register(Purpose.class);
        ObjectifyService.factory().register(Person.class);
        ObjectifyService.factory().register(Asset.class);
        ObjectifyService.factory().register(ACL.class);
        ObjectifyService.factory().register(Reservation.class);
    }
    
    @ApiMethod(
            name = "globalLocationDevicesReport",
            path = "globalLocationDevicesReport",
            httpMethod = HttpMethod.POST
    )
    public PojoReport globalLocationDevicesReport(@Named("origin") String user, PojoReport pojoReport) throws OAuthRequestException {
        Require.globalAdmin(user);
        PojoReport result = new PojoReport();
        result.globalLocationResList = new ArrayList<List<DevicesStat>>();
        logger.info(new Gson().toJson(pojoReport));
        if(pojoReport != null
                && pojoReport.listLocation != null
                && pojoReport.listLocation.size() > 0){
            for (Location loc : pojoReport.listLocation) {
                NamespaceManager.set(loc.id.toString());
                //List<Reservation> resListByLocation = ObjectifyService.ofy().load().type(Reservation.class).list();
                List<Reservation> resListByLocation = Methods.getListReservationFilterByDate(pojoReport);
                result.globalLocationResList.add(calculateDevicesStatList(user, loc, resListByLocation));
            }
        }
        return result;
    }
    
    @ApiMethod(
            name = "testedPurposes",
            path = "testedPurposes",
            httpMethod = HttpMethod.POST
    )
    public PojoReport testedPurposes(@Named("origin") String user, PojoReport pojoReport) throws OAuthRequestException {
        Require.globalAdmin(user);
        PojoReport result = new PojoReport();
        result.testedPurposeResList = new ArrayList<List<PurposeStat>>();
        
        if(pojoReport != null
                && pojoReport.listLocation != null
                && pojoReport.listLocation.size() > 0){
            for (Location loc : pojoReport.listLocation) {
                NamespaceManager.set(loc.id.toString());
                //List<Reservation> resListByLocation = ObjectifyService.ofy().load().type(Reservation.class).list();
                List<Reservation> resListByLocation = Methods.getListReservationFilterByDate(pojoReport);
                logger.info("RESULT!");
                logger.info(new Gson().toJson(resListByLocation));
                result.testedPurposeResList.add(calculateTestesPurposes(user, loc, resListByLocation));
            }
        }
        return result;
    }
    
    private List<DevicesStat> calculateDevicesStatList(String user, Location location, List<Reservation> reservationsResult) throws OAuthRequestException{
        //Require.localAdmin(user, location);
        
        List<Reservation> reservations = new ArrayList<Reservation>();
        if(reservationsResult == null){
            //normal workflow
            NamespaceManager.set(location.id.toString());
            reservations = ObjectifyService.ofy().load().type(Reservation.class).list();
        }
        else{
            //new global workflow
            reservations = reservationsResult;
        }
        
        HashMap<Long, Integer> hoursPast = new HashMap<Long, Integer>();
        HashMap<Long, Integer> hoursFuture = new HashMap<Long, Integer>();
        HashMap<Long, Integer> counts = new HashMap<Long, Integer>();
        for (Reservation reservation : reservations) {
            for (Asset asset : reservation.getAssets()) {
                if (!counts.containsKey(asset.id)) {
                    counts.put(asset.id, 0);
                    hoursPast.put(asset.id, 0);
                    hoursFuture.put(asset.id, 0);
                }
                counts.put(asset.id,
                        counts.get(asset.id) + 1);
                if (new Date().after(reservation.date)) {
                    hoursPast.put(asset.id,
                            hoursPast.get(asset.id)
                                    + reservation.end
                                    - reservation.start);
                } else {
                    hoursFuture.put(asset.id,
                            hoursFuture.get(asset.id)
                                    + reservation.end
                                    - reservation.start);
                }
            }
            
        }
        
        List<DevicesStat> result = new ArrayList<DevicesStat>();
        List<Asset> assets = ObjectifyService.ofy().load()
                .type(Asset.class).list();
        for (Asset asset : assets) {
            int hourPast = 0;
            int hourFuture = 0;
            int count = 0;
            if (counts.containsKey(asset.id)) {
                hourPast = hoursPast.get(asset.id);
                hourFuture = hoursFuture.get(asset.id);
                count = counts.get(asset.id);
            }
            DevicesStat devStat = new DevicesStat(asset, count, hourPast, hourFuture);
            devStat.location = location;
            result.add(devStat);
        }
        
        return result;
    }
    
    private List<PurposeStat> calculateTestesPurposes(String user, Location location, List<Reservation> reservations) throws OAuthRequestException{
        List<PurposeStat> listPurStat = new ArrayList<PurposeStat>();
        Map<Long,Integer> mapPurposeStat = new HashMap<Long, Integer>();
        for (Reservation res : reservations) {
            Long purId = res.idPurpose;
            if(purId != null){
                if(mapPurposeStat.containsKey(purId)){
                    Integer count = mapPurposeStat.get(purId);
                    mapPurposeStat.put(purId, count+1);
                }
                else{
                    mapPurposeStat.put(purId, 1);
                }
            }
        }
        for (Long purId : mapPurposeStat.keySet()) {
            Purpose purpose = ObjectifyService.ofy().load().type(Purpose.class).id(purId).now();
            if(purpose != null){
                PurposeStat stat = new PurposeStat();
                stat.purpose = purpose;
                stat.count = mapPurposeStat.get(purId);
                stat.location = location;
                listPurStat.add(stat);
            }
        }
        return listPurStat;
    }
    
}
