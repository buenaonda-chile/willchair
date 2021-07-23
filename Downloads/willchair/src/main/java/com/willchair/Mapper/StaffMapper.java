package com.willchair.Mapper;

import java.util.HashMap;
import java.util.List;

import com.willchair.Vo.StaffVo;
import com.willchair.Vo.UserVo;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface StaffMapper {

    public int getTotalStaff();
	
	public int getTotalUser();

	public String getAppVersion();
	
	public List<StaffVo> getStaffList(HashMap<String,Object> params);

	public List<UserVo> getUserList(HashMap<String,Object> params);
	
	public String dupCheckId(HashMap<String,String> params);

	public void saveAdminFlag(HashMap<String,String>params);

	public void saveNewStaff(StaffVo vo);
	
	public void deleteStaff(HashMap<String,String>params);

	public void updateVersion(HashMap<String,String> params);
	
	public void updateStaff(HashMap<String,String> params);
	
	public StaffVo getStaffInfo(StaffVo vo);

}
