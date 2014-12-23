package eu.revevol.calendar.endpoints;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.appengine.api.NamespaceManager;
import com.google.appengine.api.oauth.OAuthRequestException;
import com.googlecode.objectify.ObjectifyService;
import eu.revevol.calendar.model.*;
import eu.revevol.calendar.pojo.DevicesStat;
import eu.revevol.calendar.security.Require;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import javax.inject.Named;

/**
 *
 * @author Clement Hannicq <clement.hannicq@revevol.eu>
 */
@Api(name = "stats", version = "v1")
public class StatsEndpoint {

    static {
        ObjectifyService.factory().register(Person.class);
        ObjectifyService.factory().register(Asset.class);
        ObjectifyService.factory().register(ACL.class);
        ObjectifyService.factory().register(Reservation.class);
    }

    @ApiMethod(
            name = "devices",
            path = "devices",
            httpMethod = ApiMethod.HttpMethod.GET
    )
    public List<DevicesStat> devices(@Named("origin") String user, @Named("location") Long location) throws OAuthRequestException {
        Require.localAdmin(user, location);

        NamespaceManager.set(location.toString());

        List<Reservation> reservations = ObjectifyService.ofy().load().type(Reservation.class).list();

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
            result.add(new DevicesStat(asset, count, hourPast, hourFuture));
        }

        return result;
    }

    @ApiMethod(
            name = "device",
            path = "device",
            httpMethod = ApiMethod.HttpMethod.GET
    )
    public DeviceStat device(@Named("origin") String user, @Named("location") Long location, @Named("id") Long device)
            throws OAuthRequestException {
        Require.localAdmin(user, location);

        NamespaceManager.set(location.toString());

        List<Reservation> reservations = ObjectifyService.ofy().load()
                .type(Reservation.class).list();

        HashMap<String, Integer> hoursPast = new HashMap<String, Integer>();
        HashMap<String, Integer> hoursFuture = new HashMap<String, Integer>();
        HashMap<String, Integer> counts = new HashMap<String, Integer>();

        for (Reservation reservation : reservations) {
            for (Asset asset : reservation.getAssets()) {
                if (asset.id.equals(device)) {
                    if (!counts.containsKey(reservation.person)) {
                        counts.put(reservation.person, 0);
                        hoursFuture.put(reservation.person, 0);
                        hoursPast.put(reservation.person, 0);
                    }
                    counts.put(reservation.person,
                            counts.get(reservation.person) + 1);
                    if (new Date().after(reservation.date)) {
                        hoursPast.put(reservation.person,
                                hoursPast.get(reservation.person)
                                + reservation.end
                                - reservation.start);
                    } else {
                        hoursFuture.put(reservation.person,
                                hoursFuture.get(reservation.person)
                                + reservation.end
                                - reservation.start);
                    }
                }
            }
        }
        ArrayList<DevicePersonStat> data = new ArrayList<DevicePersonStat>();
        NamespaceManager.set("");
        for (String userid : counts.keySet()) {
            data.add(new DevicePersonStat(ObjectifyService.ofy().load().type(Person.class).id(userid).safe(), counts.get(userid), hoursPast.get(userid), hoursFuture.get(userid)));
        }
        NamespaceManager.set(location.toString());
        return new DeviceStat(ObjectifyService.ofy().load().type(Asset.class).id(device).now(), data);
    }

    @ApiMethod(
            name = "person",
            path = "person",
            httpMethod = ApiMethod.HttpMethod.GET
    )
    public PersonStat person(@Named("origin") String user, @Named("location") Long location, @Named("id") String target)
            throws OAuthRequestException {
        if (user.equals(target)) {
            Require.access(user, location);
        } else {
            Require.localAdmin(user, location);
        }

        NamespaceManager.set(location.toString());

        List<Reservation> reservations = ObjectifyService.ofy().load()
                .type(Reservation.class)
                .filter("person", target)
                .list();

        HashMap<Long, Integer> hoursPast = new HashMap<Long, Integer>();
        HashMap<Long, Integer> hoursFuture = new HashMap<Long, Integer>();
        HashMap<Long, Integer> counts = new HashMap<Long, Integer>();

        for (Reservation reservation : reservations) {
            for (Asset asset : reservation.getAssets()) {
                if (!counts.containsKey(asset.id)) {
                    counts.put(asset.id, 0);
                    hoursFuture.put(asset.id, 0);
                    hoursPast.put(asset.id, 0);
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
        ArrayList<DevicesStat> data = new ArrayList<DevicesStat>();
        NamespaceManager.set(location.toString());
        for (Long assetid : counts.keySet()) {
            data.add(new DevicesStat(ObjectifyService.ofy().load().type(Asset.class).id(assetid).safe(), counts.get(assetid), hoursPast.get(assetid), hoursFuture.get(assetid)));
        }
        NamespaceManager.set("");
        return new PersonStat(ObjectifyService.ofy().load().type(Person.class).id(target).now(), data);
    }

    private static class DeviceStat {

        public Asset asset;
        public List<DevicePersonStat> data;

        public DeviceStat(Asset asset, List<DevicePersonStat> data) {
            this.asset = asset;
            this.data = data;
        }
    }

    private static class PersonStat {

        public Person person;
        public List<DevicesStat> data;

        public PersonStat(Person person, List<DevicesStat> data) {
            this.person = person;
            this.data = data;
        }

    }

    private static class DevicePersonStat {

        public Person person;
        public int count;
        public int hoursPast;
        public int hoursFuture;

        public DevicePersonStat(Person person, int count, int hoursPast, int hoursFuture) {
            this.person = person;
            this.count = count;
            this.hoursPast = hoursPast;
            this.hoursFuture = hoursFuture;
        }
    }
}
