package eu.revevol.calendar.constants;

import com.google.appengine.api.utils.SystemProperty;

public class Params {
    public static final String SENDER_EMAIL_APPLICATION_NAME = "Device Lab Management";
    public static final String APPLICATION_ADDRESS = getApplicationAddress();
    public static final String APPLICATION_JSON	= "application/json";
    public static final String PROJECT_PLACEHOLDER	= "cal";
    
    
    private static String getApplicationAddress(){
        if (SystemProperty.environment.value() == SystemProperty.Environment.Value.Production) {
            // do something that's production-only
            return "https://"+SystemProperty.applicationId+".appspot.com";
        }
        return "http://localhost:8080";
    }
}
