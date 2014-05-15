package eu.revevol.calendar.endpoints;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.appengine.api.oauth.OAuthRequestException;
import com.googlecode.objectify.ObjectifyService;
import eu.revevol.calendar.model.*;
import eu.revevol.calendar.security.Require;
import eu.revevol.calendar.security.Token;
import javax.inject.Named;

/**
 *
 * @author Clement <clement.hannicq@revevol.eu>
 */
@Api(name = "setup", version = "v1")
public class SetupEndpoint {
    static {
        ObjectifyService.factory().register(Person.class);
        ObjectifyService.factory().register(Token.class);
    }
    
    @ApiMethod(
            name = "admin",
            path = "admin",
            httpMethod = ApiMethod.HttpMethod.GET
    )
    public void admin(@Named("token") String token, @Named("user") String target) throws OAuthRequestException {
        Require.appAdmin(token);

        Person admin = new Person();
        admin.mail = target;
        admin.globalAdmin = true;
        admin.name = target;
        
        ObjectifyService.ofy().save().entity(admin);
    }
}
