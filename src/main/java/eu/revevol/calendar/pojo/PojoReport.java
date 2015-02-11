package eu.revevol.calendar.pojo;

import eu.revevol.calendar.model.Asset;
import eu.revevol.calendar.model.Location;
import java.util.Date;
import java.util.List;

public class PojoReport {
    public List<Location> listLocation;
    public String dateFrom;
    public String dateTo;
    public List<Asset> listAsset;
    public List<List<DevicesStat>> globalLocationResList;
    public List<List<PurposeStat>> testedPurposeResList;
    public Long location;
    public Date dateFilter;
    public String idPerson;
}
