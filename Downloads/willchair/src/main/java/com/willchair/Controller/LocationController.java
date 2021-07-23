package com.willchair.Controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.willchair.Service.LocationService;
import com.willchair.Vo.LocationVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/location")
public class LocationController {

    @Autowired
    LocationService locationService;

    @RequestMapping(value = "/locationinfo", method = {RequestMethod.POST , RequestMethod.GET})
    public String moveLocation(HttpServletRequest req, HttpServletResponse res) {
    	
    	req.setAttribute("totalLocation", locationService.getTotalLocation());
    	req.setAttribute("totalActive", locationService.getTotalActive());
        req.setAttribute("totalActiveN", locationService.getTotalActiveN());

        return "location";
    }
    
    @RequestMapping(value = "/getLocationList")
    @ResponseBody
    public List<LocationVo> getLocationList(@RequestParam HashMap<String,Object> params){
    	
    	List<LocationVo> locationList = locationService.getLocationList(params);
    	
    	return locationList;
    }

    @RequestMapping(value = "/updateLocation")
    @ResponseBody
    public void updateLocation(@RequestParam HashMap<String,String> params){
        locationService.updateLocation(params);
    }
}
