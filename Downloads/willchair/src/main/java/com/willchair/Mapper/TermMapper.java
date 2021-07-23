package com.willchair.Mapper;

import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TermMapper {

    public String getTermService();
    
	public void saveTermService(HashMap<String,String> params);

}
