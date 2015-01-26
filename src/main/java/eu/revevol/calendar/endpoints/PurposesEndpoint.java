package eu.revevol.calendar.endpoints;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiMethod.HttpMethod;
import com.google.appengine.api.NamespaceManager;
import com.google.appengine.api.oauth.OAuthRequestException;
import com.googlecode.objectify.ObjectifyService;
import eu.revevol.calendar.model.Purpose;
import eu.revevol.calendar.security.Require;
import java.util.List;
import java.util.logging.Logger;
import javax.inject.Named;

@Api(name = "purpose", version = "v1")
public class PurposesEndpoint {
    
    private static Logger logger = Logger.getLogger(PurposesEndpoint.class.getName());
    
    static {
        ObjectifyService.factory().register(Purpose.class);
    }
    
    @ApiMethod(
            name = "list",
            path = "list",
            httpMethod = HttpMethod.GET
    )
    public List<Purpose> list(@Named("origin") String user, @Named("location") Long location) throws OAuthRequestException {
        Require.access(user, location);
        
        NamespaceManager.set(location.toString());
        List<Purpose> list = ObjectifyService.ofy().load().type(Purpose.class).filter("person", user).order("-dateUpdate").list();
        return list;
    }
}
