package eu.revevol.calendar.security;

import com.googlecode.objectify.ObjectifyService;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

/**
 *
 * @author Clement Hannicq <clement.hannicq@revevol.eu>
 */
public class TokenFilter implements Filter {

    static {
        ObjectifyService.factory().register(Token.class);
    }

    @SuppressWarnings("unused")
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        String user = req.getParameter("origin");
        String token = req.getParameter("token");
        LOG.log(Level.INFO, "User {0} : {1}", new Object[]{user, token});
        Token t = ObjectifyService.ofy().load().type(Token.class).id(token).now();
        if(t != null){
            if(t.user.equals(user)){
                LOG.info("Token accepted");
                chain.doFilter(req, res);
            } else {
                LOG.warning("Wrong user provided");
            }
        }else{
            LOG.warning("Invalid token");
        }
        
    }
    private static final Logger LOG = Logger.getLogger(TokenFilter.class.getName());

    @Override
    public void init(FilterConfig config) throws ServletException {
        //start first time when application start
    }

    @Override
    public void destroy() {
        //add code to release any resource
    }
}
