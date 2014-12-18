/*
* To change this license header, choose License Headers in Project Properties.
* To change this template file, choose Tools | Templates
* and open the template in the editor.
*/
package eu.revevol.calendar.constants;

import com.google.appengine.api.taskqueue.Queue;
import com.google.appengine.api.taskqueue.QueueFactory;
import eu.revevol.calendar.pojo.PojoEmail;

import static com.google.appengine.api.taskqueue.TaskOptions.Builder.withUrl;
import com.google.gson.Gson;
import eu.revevol.calendar.model.Location;
import eu.revevol.calendar.model.Person;

/**
 *
 * @author Revevol
 */
public class EmailTemplate {
    
    /**
     * Send an email to location admins where a new user ask to access to their location
     */
    public static void adviseByEmailLocationAdmins(String user, Location locationObj, String emailArrayString) {
        PojoEmail pojo = new PojoEmail();
        pojo.setEmails(emailArrayString);
        pojo.setSubject("New user asks to access to location");
        String message = "Dear location Admin,<br>"+
                "the user "+ user +" asks to apply to " + locationObj.name + ".<br>" +
                "Please, access to " + Params.SENDER_EMAIL_APPLICATION_NAME + " application." +
                "<br><br>"+
                "***Automatic message, do not answer***";
        pojo.setMessageBody(message);
        
        Queue queue = QueueFactory.getQueue("sendEmail");
        queue.add(withUrl("/task/TaskSendEmail").payload(new Gson().toJson(pojo)));
    }
    
    /**
     * Send email to advice the user for the acceptance of the ACL by local admin
     */
    public static void adviseByEmailUserAcceptedForLocation(Person p, Location locationObj, String emailArrayString) {
        PojoEmail pojo = new PojoEmail();
        pojo.setEmails(emailArrayString);
        pojo.setSubject("Your startup "+p.startupName+" has been approved");
        String message = "Dear "+ p.name +",<br>"+
                "your startup "+p.startupName+" has been approved for using the DeviceLab at location "+locationObj.name+".<br>"+
                "Log to <a href='"+Params.APPLICATION_ADDRESS+"' target='_blank'>"+Params.SENDER_EMAIL_APPLICATION_NAME+"</a> and enjoy"+
                "<br><br>"+
                "***Automatic message, do not answer***";
        pojo.setMessageBody(message);
        
        Queue queue = QueueFactory.getQueue("sendEmail");
        queue.add(withUrl("/task/TaskSendEmail").payload(new Gson().toJson(pojo)));
    }
    
}
