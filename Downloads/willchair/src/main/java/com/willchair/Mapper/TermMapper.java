package com.willchair.Mapper;

import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TermMapper {

    public String getTermService();
    
	public void saveTermService(HashMap<String,String> params);
    
    public String getTermLocate();
    
	public void saveTermLocate(HashMap<String,String> params);

    public String getTermPrivate();
    
	public void saveTermPrivate(HashMap<String,String> params);

}
