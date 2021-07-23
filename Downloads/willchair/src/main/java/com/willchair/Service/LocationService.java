package com.willchair.Service;

import java.util.HashMap;
import java.util.List;

import com.willchair.Vo.LocationVo;

public interface LocationService {

    public int getTotalLocation();
	
	public int getTotalActive();

    public int getTotalActiveN();

	public List<LocationVo> getLocationList(HashMap<String,Object> params);
    
    public void updateLocation(HashMap<String,String> params);
}
