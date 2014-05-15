package eu.revevol.calendar.constants;

/**
 *
 * @author Clement <clement.hannicq@revevol.eu>
 */
public enum ACLStatus {

    /**
     * The user is awaiting confirmation from an administrator (local or global)
     */
    PENDING,

    /**
     * The user has base access to the location
     */
    USER,

    /**
     * The user is a local admin
     */
    ADMIN;
}
