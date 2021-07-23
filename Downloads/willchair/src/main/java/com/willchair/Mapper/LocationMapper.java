package com.willchair.Mapper;

import java.util.HashMap;
import java.util.List;

import com.willchair.Vo.LocationVo;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LocationMapper {
    
    public int getTotalLocation();
	
	public int getTotalActive();

	public int getTotalActiveN();
	
	public List<LocationVo> getLocationList(HashMap<String,Object> params);
	
	public void updateLocation(HashMap<String,String> params);
}
