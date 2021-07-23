package com.willchair.Controller;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.willchair.Service.TermService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/term")
public class TermController {

    @Autowired
    TermService termService;

    @RequestMapping(value = "/termservice", method = {RequestMethod.POST , RequestMethod.GET})
    public String termService(HttpServletRequest req, HttpServletResponse res) {  

        return "term_service_editor";
    }

    @RequestMapping(value = "/termprivate", method = {RequestMethod.POST , RequestMethod.GET})
    public String termPrivate(HttpServletRequest req, HttpServletResponse res) {  

        return "term_private_editor";
    }

    @RequestMapping(value = "/termlocate", method = {RequestMethod.POST , RequestMethod.GET})
    public String termLocate(HttpServletRequest req, HttpServletResponse res) {  

        return "term_locate_editor";
    }

    /**약관 등록 */
    @RequestMapping(value = "/saveTermService")
    @ResponseBody
    public void saveTermService(@RequestParam HashMap<String,String> params){  
        termService.saveTermService(params);
    }

    @RequestMapping(value = "/getTermService")
    @ResponseBody
    public String getTermService(){   	
    	return termService.getTermService();
    }

    /**약관 등록 */
    @RequestMapping(value = "/saveTermLocate")
    @ResponseBody
    public void saveTermLocate(@RequestParam HashMap<String,String> params){  
        termService.saveTermLocate(params);
    }

    @RequestMapping(value = "/getTermLocate")
    @ResponseBody
    public String getTermLocate(){   	
    	return termService.getTermLocate();
    }

    /**약관 등록 */
    @RequestMapping(value = "/saveTermPrivate")
    @ResponseBody
    public void saveTermPrivate(@RequestParam HashMap<String,String> params){  
        termService.saveTermPrivate(params);
    }

    @RequestMapping(value = "/getTermPrivate")
    @ResponseBody
    public String getTermPrivate(){   	
    	return termService.getTermPrivate();
    }
}
