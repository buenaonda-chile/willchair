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
        return "term";
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
}
