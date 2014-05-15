package eu.revevol.calendar.model;

import com.googlecode.objectify.annotation.*;
import java.util.List;

/**
 *
 * @author Clement Hannicq <clement.hannicq@revevol.eu>
 */
@Entity
@Cache
public class Person {
    @Id public String mail; //Using mail as id
    public String name;
    public boolean globalAdmin;
    public Long favorite;
    @Ignore List<Location> locations;
    @Ignore List<ACL> acls;
}
