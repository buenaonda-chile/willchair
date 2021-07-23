package com.willchair.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.willchair.Vo.StoreVo;

public interface StoreService {
    public int getTotalRestaurant();

    public int getTotalRestaurantN(); //비활성화 음식점수
	
	public int getTotalCafe();

    public int getTotalCafeN(); //비활성화 카페수
	
	public List<StoreVo> getStoreList(HashMap<String,Object> params);

    public ArrayList<String> dupCheckGrid(List<StoreVo> params);

	public void saveStoreList(StoreVo params);

    public void saveNewStore(HashMap<String,String> params);
    
    public void deleteStore(HashMap<String,String> params);
    
    public void updateStore(HashMap<String,String> params);
}
