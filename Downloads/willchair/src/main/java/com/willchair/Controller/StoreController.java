package com.willchair.Controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.willchair.Service.StoreService;
import com.willchair.Vo.StoreVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/store")
public class StoreController {

    @Autowired
    StoreService storeService;

    @RequestMapping(value = "/storeinfo", method = {RequestMethod.POST , RequestMethod.GET})
    public String moveStore(HttpServletRequest req, HttpServletResponse res) {
    	
    	req.setAttribute("totalRestaurant", storeService.getTotalRestaurant());
        req.setAttribute("totalRestaurantN", storeService.getTotalRestaurantN());
    	req.setAttribute("totalCafe", storeService.getTotalCafe());
        req.setAttribute("totalCafeN", storeService.getTotalCafeN());
    	
        return "store";
    }
    
    @RequestMapping(value = "/getStoreList")
    @ResponseBody
    public List<StoreVo> getStaffList(@RequestParam HashMap<String,Object> params){
    	
    	List<StoreVo> storeList = storeService.getStoreList(params);
    	
    	return storeList;
    }

     /**
     * 엑셀 업로드 가게 저장하기
     * @param params
     * @return
     */
    @RequestMapping(value="/saveStoreList", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void saveStoreList(@RequestBody List<StoreVo> params){
        for(StoreVo vo : params)
            storeService.saveStoreList(vo);
    }
    
    @RequestMapping(value="/dupCheckGrid", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public ArrayList<String> dupCheckGrid(@RequestBody List<StoreVo> params) {
        
        return storeService.dupCheckGrid(params);
    }


    @ResponseBody
    @RequestMapping(value = "/create")
    public void saveNewStore(@RequestParam HashMap<String,String> params) {
        storeService.saveNewStore(params);
    }

    @ResponseBody
    @RequestMapping(value = "/delete")
    public void deleteStore(@RequestParam HashMap<String, String> params) {
        storeService.deleteStore(params);
    }

    @ResponseBody
    @RequestMapping(value = "/update")
    public void updateStore(@RequestParam HashMap<String, String> params) {
        storeService.updateStore(params);
    }
}
