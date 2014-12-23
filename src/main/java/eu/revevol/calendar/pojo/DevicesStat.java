package eu.revevol.calendar.pojo;

import eu.revevol.calendar.model.Asset;
import eu.revevol.calendar.model.Location;

public class DevicesStat {
    
    public Asset asset;
    public int hoursPast;
    public int hoursFuture;
    public int count;
    public Location location;
    
    public DevicesStat(Asset asset, int count, int hoursPast, int hoursFuture) {
        this.asset = asset;
        this.hoursPast = hoursPast;
        this.hoursFuture = hoursFuture;
        this.count = count;
    }
    
}
