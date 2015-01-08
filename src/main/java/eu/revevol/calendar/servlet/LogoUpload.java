package eu.revevol.calendar.servlet;

import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.images.ImagesService;
import com.google.appengine.api.images.ImagesServiceFactory;
import com.google.appengine.api.images.ServingUrlOptions;
import com.google.gson.Gson;
import com.googlecode.objectify.ObjectifyService;
import eu.revevol.calendar.model.Location;
import eu.revevol.calendar.util.Methods;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.channels.Channels;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Revevol
 */
public class LogoUpload extends HttpServlet{
    
    BlobstoreService service = BlobstoreServiceFactory.getBlobstoreService();
    
    private Logger logger = Logger.getLogger(LogoUpload.class.getName());
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String url = service.createUploadUrl("/desktop/LogoUpload");
        resp.getWriter().print(url);
    }
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Map<String, List<BlobKey>> blobs = service.getUploads(req);
        String locationId = req.getHeader("locationId");
        
        // Get the image serving
        ImagesService imagesService = ImagesServiceFactory.getImagesService();
        ServingUrlOptions serving_options = ServingUrlOptions.Builder.withBlobKey(new BlobKey(blobs.get("file").get(0).getKeyString()));
        String imageUrl = imagesService.getServingUrl(serving_options); 
        logger.info(imageUrl);
        
        // store the logo_url into the Location Entity
        ObjectifyService.factory().register(Location.class);
        Location location = ObjectifyService.ofy().load().type(Location.class).id(new Long(locationId)).now();
        location.logoUrl = imageUrl;
        ObjectifyService.ofy().save().entity(location).now();
    }
}
