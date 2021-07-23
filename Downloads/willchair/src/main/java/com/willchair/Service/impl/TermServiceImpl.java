package com.willchair.Service.impl;

import java.util.HashMap;

import com.willchair.Mapper.TermMapper;
import com.willchair.Service.TermService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TermServiceImpl implements TermService{
 
    @Autowired
    TermMapper termMapper;

    @Override
    public String getTermService() {
        return termMapper.getTermService();
    }

    @Override
    public void saveTermService(HashMap<String,String> params) {
        termMapper.saveTermService(params);
    }

    @Override
    public String getTermLocate() {
        return termMapper.getTermLocate();
    }

    @Override
    public void saveTermLocate(HashMap<String,String> params) {
        termMapper.saveTermLocate(params);
    }

    @Override
    public String getTermPrivate() {
        return termMapper.getTermPrivate();
    }

    @Override
    public void saveTermPrivate(HashMap<String,String> params) {
        termMapper.saveTermPrivate(params);
    }

}
