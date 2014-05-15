package eu.revevol.calendar.endpoints;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.appengine.api.NamespaceManager;
import com.google.appengine.api.oauth.OAuthRequestException;
import com.googlecode.objectify.ObjectifyService;
import eu.revevol.calendar.model.Asset;
import eu.revevol.calendar.security.Require;
import java.util.List;
import javax.inject.Named;

/**
 *
 * @author Clement <clement.hannicq@revevol.eu>
 */
@Api(name = "asset", version = "v1")
public class AssetsEndpoint {
    static{
        ObjectifyService.factory().register(Asset.class);
    }
    
    
    @ApiMethod(
            name = "get",
            path = "get",
            httpMethod = ApiMethod.HttpMethod.GET
    )
    public Asset get(@Named("origin") String user, @Named("location") Long location, @Named("id") Long id) throws OAuthRequestException {
        Require.access(user, location);
        
        NamespaceManager.set(location.toString());
        Asset res = ObjectifyService.ofy().load().type(Asset.class).id(id).safe();
        return res;
    }
    
    @ApiMethod(
            name = "list",
            path = "list",
            httpMethod = ApiMethod.HttpMethod.GET
    )
    public List<Asset> list(@Named("origin") String user, @Named("location") Long location) throws OAuthRequestException {
        Require.access(user, location);
        
        NamespaceManager.set(location.toString());
        List<Asset> list = ObjectifyService.ofy().load().type(Asset.class).filter("active", true).list();
        return list;
    }
    
    @ApiMethod(
            name = "put",
            path = "put",
            httpMethod = ApiMethod.HttpMethod.POST
    )
    public void put(@Named("origin") String user, @Named("location") Long location, Asset r) throws OAuthRequestException {
        Require.localAdmin(user, location);
        r.active = true;
        NamespaceManager.set(location.toString());
        ObjectifyService.ofy().save().entity(r);
    }
    
    @ApiMethod(
            name = "delete",
            path = "delete",
            httpMethod = ApiMethod.HttpMethod.GET
    )
    public void delete(@Named("origin") String user, @Named("location") Long location, @Named("id") Long id) throws OAuthRequestException {
        Require.localAdmin(user, location);
        
        NamespaceManager.set(location.toString());
        Asset asset = ObjectifyService.ofy().load().type(Asset.class).id(id).now();
        asset.active = false;
        
        ObjectifyService.ofy().save().entity(asset);
    }
}
