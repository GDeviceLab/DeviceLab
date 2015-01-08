package eu.revevol.calendar.task;

import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import eu.revevol.calendar.pojo.PojoEmail;
import eu.revevol.calendar.util.Methods;

public class TaskSendEmail extends HttpServlet {
    private Logger logger = Logger.getLogger(TaskSendEmail.class.getName());
    private Gson gson = new Gson();
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)throws ServletException {
        try {
            PojoEmail pojo = gson.fromJson(req.getReader(),PojoEmail.class);
            Methods.sendEmail(resp, pojo);
        }
        catch(Exception e){
            logger.severe(Methods.printStackStrace(e));
        }
    }
}
