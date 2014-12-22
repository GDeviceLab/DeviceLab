package eu.revevol.calendar.endpoints;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiMethod.HttpMethod;
import com.google.appengine.api.NamespaceManager;
import com.google.appengine.api.oauth.OAuthRequestException;
import com.google.gson.Gson;
import com.googlecode.objectify.ObjectifyService;
import eu.revevol.calendar.model.Purpose;
import eu.revevol.calendar.pojo.PojoReport;
import eu.revevol.calendar.security.Require;
import java.util.List;
import java.util.logging.Logger;
import javax.inject.Named;

@Api(name = "report", version = "v1")
public class ReportsEndpoint {
    
    private static Logger logger = Logger.getLogger(ReportsEndpoint.class.getName());
    
    static {
        ObjectifyService.factory().register(Purpose.class);
    }
    
    @ApiMethod(
            name = "globalLocationReport",
            path = "globalLocationReport",
            httpMethod = HttpMethod.POST
    )
    public PojoReport globalLocationReport(@Named("origin") String user, PojoReport pojoReport) throws OAuthRequestException {
        Require.globalAdmin(user);
        
        logger.info(new Gson().toJson(pojoReport));
        return null;
    }
}
