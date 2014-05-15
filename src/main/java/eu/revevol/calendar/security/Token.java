package eu.revevol.calendar.security;

import com.googlecode.objectify.annotation.*;

/**
 *
 * @author Clement Hannicq <clement.hannicq@revevol.eu>
 */
@Entity
@Cache
public class Token {
    @Id public String hash;
    public String user;
    public Boolean admin;
}
