package com.willchair.Service.impl;

import java.util.HashMap;
import java.util.List;

import com.willchair.Mapper.LocationMapper;
import com.willchair.Service.LocationService;
import com.willchair.Vo.LocationVo;
import com.willchair.Util.Util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LocationServiceImpl implements LocationService{

    @Autowired
    LocationMapper locationMapper;

    @Override
    public int getTotalLocation() {
        return locationMapper.getTotalLocation();
    } 

    @Override
    public int getTotalActive() {
        return locationMapper.getTotalActive();
    }

    @Override
    public int getTotalActiveN() {
        return locationMapper.getTotalActiveN();
    }

    @Override
    public List<LocationVo> getLocationList(HashMap<String,Object> params){
        if(params.get("inq") != null)
        params.replace("inq", Util.makeForeach((String)params.get("inq"), ","));
                            
        List<LocationVo> locationList = locationMapper.getLocationList(params);
        return locationList;
    }
    
    @Override
    public void updateLocation(HashMap<String,String> params) {
        locationMapper.updateLocation(params);
    }
    
}
