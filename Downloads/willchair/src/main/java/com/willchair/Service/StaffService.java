package com.willchair.Service;

import java.util.HashMap;
import java.util.List;

import com.willchair.Vo.StaffVo;
import com.willchair.Vo.UserVo;

public interface StaffService {
    public int getTotalStaff();
	
	public int getTotalUser();

    public String getAppVersion();
	
	public List<StaffVo> getStaffList(HashMap<String,Object> params);

    public List<UserVo> getUserList(HashMap<String,Object> params);
    
    public String dupCheckId(HashMap<String,String> params);

    public void saveAdminFlag(HashMap<String,String>params);
    
    public void saveNewStaff(StaffVo vo);

    public void updateVersion(HashMap<String,String> params);
    
    public void deleteStaff( HashMap<String,String> params);
    
    public void updateStaff(HashMap<String,String> params);
}
