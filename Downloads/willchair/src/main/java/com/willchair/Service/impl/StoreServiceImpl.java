package com.willchair.Service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.willchair.Mapper.StoreMapper;
import com.willchair.Service.StoreService;
import com.willchair.Vo.StoreVo;
import com.willchair.Util.Util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StoreServiceImpl implements StoreService{
    
    @Autowired
    StoreMapper storeMapper;

    @Override
    public int getTotalRestaurant(){
        return storeMapper.getTotalRestaurant();
    }

    @Override
    public int getTotalRestaurantN(){
        return storeMapper.getTotalRestaurantN();
    }

    @Override
    public int getTotalCafe(){
        return storeMapper.getTotalCafe();
    }

    @Override
    public int getTotalCafeN(){
        return storeMapper.getTotalCafeN();
    }

    @Override
    public List<StoreVo> getStoreList(HashMap<String,Object> params){
        if(params.get("inq") != null)
        params.replace("inq", Util.makeForeach((String)params.get("inq"), ","));
                            
        List<StoreVo> storeList = storeMapper.getStoreList(params);
        return storeList;
    }

    @Override 
    public ArrayList<String> dupCheckGrid(List<StoreVo> params) {

        ArrayList<String> dupList = new ArrayList<String>();

        for(StoreVo vo : params){
            String storeName = storeMapper.dupCheckGrid(vo);
            dupList.add(storeName);
        }

        return dupList;
    }

    @Override
    public void saveStoreList(StoreVo params) {
        storeMapper.saveStoreList(params);
    }

    @Override
    public void saveNewStore( HashMap<String,String> params) {
        storeMapper.saveNewStore(params);
    }
    
    @Override
    public void deleteStore( HashMap<String,String> params) {
        storeMapper.deleteStore(params);
    }
    
    @Override
    public void updateStore(HashMap<String,String> params){
        storeMapper.updateStore(params);
    }
}
