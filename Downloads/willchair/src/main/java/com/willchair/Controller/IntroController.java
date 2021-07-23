package com.willchair.Controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class IntroController {
	
	@RequestMapping(value = "/", method = {RequestMethod.POST , RequestMethod.GET})
    public String landing() {
        return "landing";
    }

    @RequestMapping(value = "/cms", method = {RequestMethod.POST , RequestMethod.GET})
    public String cms() {
        return "login";
    }
    
    /**이용약관 */
    @RequestMapping(value = "/terms", method = {RequestMethod.POST , RequestMethod.GET})
    public String terms(HttpServletRequest  request, HttpServletResponse response) {
        return "terms_service";
    }

    /**개인정보보수집약관 */
    @RequestMapping(value = "/personalTerms", method = {RequestMethod.POST , RequestMethod.GET})
    public String personalTerms(HttpServletRequest  request, HttpServletResponse response) {
        return "terms_privacy";

    }

     /**위치기반서비스이용약관 */
     @RequestMapping(value = "/locateTerms", method = {RequestMethod.POST , RequestMethod.GET})
     public String locateTerms(HttpServletRequest  request, HttpServletResponse response) {
         return "terms_service_locate"; 
     }
 }

