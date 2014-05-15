package eu.revevol.calendar.endpoints;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.appengine.api.NamespaceManager;
import com.google.appengine.api.oauth.OAuthRequestException;
import com.googlecode.objectify.ObjectifyService;
import eu.revevol.calendar.model.ACL;
import eu.revevol.calendar.model.News;
import eu.revevol.calendar.model.Person;
import eu.revevol.calendar.security.Require;
import eu.revevol.calendar.util.ACLManager;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import javax.inject.Named;

/**
 *
 * @author Clement Hannicq <clement.hannicq@revevol.eu>
 */
@Api(name = "news", version = "v1")
public class NewsEndpoint {

    static {
        ObjectifyService.factory().register(News.class);
        ObjectifyService.factory().register(Person.class);
        ObjectifyService.factory().register(ACL.class);
    }

    @ApiMethod(
            name = "put",
            path = "put",
            httpMethod = ApiMethod.HttpMethod.POST
    )
    public void put(@Named("origin") String user, @Named("location") Long location, News n) throws OAuthRequestException {
        if (n.date == null) {
            n.date = new Date();
        }
        n.author = user;
        if (n.broadcast) {
            Require.globalAdmin(user);

            NamespaceManager.set("");
        } else {
            Require.localAdmin(user, location);

            NamespaceManager.set(location.toString());

        }
        ObjectifyService.ofy().save().entity(n).now();
    }

    @ApiMethod(
            name = "get",
            path = "get",
            httpMethod = ApiMethod.HttpMethod.GET
    )
    public News get(@Named("origin") String user, @Named("location") Long location, @Named("id") Long id) throws OAuthRequestException {
        Require.access(user, location);

        News global = ObjectifyService.ofy().load().type(News.class).id(id).now();

        if (global != null) {
            return global;
        }

        NamespaceManager.set(location.toString());

        return ObjectifyService.ofy().load().type(News.class).id(id).safe();
    }

    @ApiMethod(
            name = "fetch",
            path = "fetch",
            httpMethod = ApiMethod.HttpMethod.GET
    )
    public List<News> fetch(@Named("origin") String user, @Named("location") Long location, @Named("rank") int rank, @Named("count") int count) throws OAuthRequestException {
        Require.access(user, location);
        
        List<News> global = ObjectifyService.ofy().load().type(News.class).order("-date").limit(count+rank).list();

        NamespaceManager.set(location.toString());

        List<News> local = ObjectifyService.ofy().load().type(News.class).order("-date").limit(count+rank).list();

        local.addAll(global);
        
        Collections.sort(local, new Comparator<News>() {
            @Override
            public int compare(News o1, News o2) {
                return o2.date.compareTo(o1.date);
            }
        });
        if(rank >= local.size()){
            return new ArrayList<News>();
        }
        return local.subList(rank, Math.min(rank+count, local.size()));
    }

    @ApiMethod(
            name = "read",
            path = "read",
            httpMethod = ApiMethod.HttpMethod.GET
    )
    public void read(@Named("origin") String user, @Named("location") Long location) throws OAuthRequestException {
        Require.access(user, location);

        ACL acl = ACLManager.getACL(user, location);
        acl.last = new Date();

        ObjectifyService.ofy().save().entity(acl);
    }

    @ApiMethod(
            name = "latest",
            path = "latest",
            httpMethod = ApiMethod.HttpMethod.GET
    )
    public List<News> latest(@Named("origin") String user, @Named("location") Long location) throws OAuthRequestException {
        Require.access(user, location);

        ACL acl = ACLManager.getACL(user, location);

        List<News> global = ObjectifyService.ofy().load().type(News.class).filter("date >=", acl.last).order("-date").list();

        NamespaceManager.set(location.toString());

        List<News> local = ObjectifyService.ofy().load().type(News.class).filter("date >=", acl.last).order("-date").list();

        local.addAll(global);

        Collections.sort(local, new Comparator<News>() {
            @Override
            public int compare(News o1, News o2) {
                return o2.date.compareTo(o1.date);
            }
        });

        return local;
    }
    
    @ApiMethod(
            name = "delete",
            path = "delete",
            httpMethod = ApiMethod.HttpMethod.GET
    )
    public void delete(@Named("origin") String user, @Named("location") Long location, @Named("id") Long id)
            throws OAuthRequestException {
        News global = ObjectifyService.ofy().load().type(News.class).id(id).now();

        if (global != null) {
            Require.globalAdmin(user);
            ObjectifyService.ofy().delete().type(News.class).id(id).now();
            return ;
        }
        Require.localAdmin(user, location);
        
        NamespaceManager.set(location.toString());

        ObjectifyService.ofy().delete().type(News.class).id(id).now();
    }
}
