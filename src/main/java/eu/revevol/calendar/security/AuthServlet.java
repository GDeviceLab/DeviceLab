/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.revevol.calendar.security;

import com.google.appengine.api.users.UserServiceFactory;
import com.google.gson.Gson;
import com.googlecode.objectify.ObjectifyService;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.lang.RandomStringUtils;

/**
 *
 * @author Clement Hannicq <clement.hannicq@revevol.eu>
 */
public class AuthServlet extends HttpServlet {
    
    static {
        ObjectifyService.factory().register(Token.class);
    }
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (UserServiceFactory.getUserService().isUserLoggedIn()) {
            String mail = UserServiceFactory.getUserService().getCurrentUser().getEmail();
            
            Token token = new Token();
            token.user = mail;
            token.hash = RandomStringUtils.randomAlphanumeric(20);
            token.admin = UserServiceFactory.getUserService().isUserAdmin();
            
            ObjectifyService.ofy().save().entity(token);
            
            resp.getWriter().print(new Gson().toJson(token));
        } else {
            String login = UserServiceFactory.getUserService().createLoginURL("/");
            resp.getWriter().print("{\"redirect\":\"" + login + "\"}");
        }
    }
}
