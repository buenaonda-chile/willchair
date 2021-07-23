package com.willchair.Service.impl;

import java.util.HashMap;
import java.util.List;

import com.willchair.Mapper.LoginMapper;
import com.willchair.Mapper.StaffMapper;
import com.willchair.Util.Util;
import com.willchair.Service.StaffService;
import com.willchair.Util.Encrypt;
import com.willchair.Vo.StaffVo;
import com.willchair.Vo.UserVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StaffServiceImpl implements StaffService{
    
    @Autowired
	private StaffMapper staffMapper;
	
	@Autowired
	private LoginMapper login;
	
	@Override
	public int getTotalStaff() {
		return staffMapper.getTotalStaff();
	}

	@Override
	public int getTotalUser() {
		return staffMapper.getTotalUser();
	}

	@Override
	public String getAppVersion() {
		return staffMapper.getAppVersion();
	}
	
	@Override
	public List<StaffVo> getStaffList(HashMap<String,Object> params){
		if(params.get("inq") != null)
			params.replace("inq", Util.makeForeach((String)params.get("inq"), ","));
		                		
		List<StaffVo> staffList = staffMapper.getStaffList(params);
		return staffList;
	}

	@Override
	public List<UserVo> getUserList(HashMap<String,Object> params){
		if(params.get("inq") != null)
			params.replace("inq", Util.makeForeach((String)params.get("inq"), ","));
		                		
		List<UserVo> userList = staffMapper.getUserList(params);
		return userList;
	}

	@Override
	public void saveAdminFlag(HashMap<String,String>params){
		staffMapper.saveAdminFlag(params);
	}
	
	@Override
	public String dupCheckId(HashMap<String, String> params) {
		return staffMapper.dupCheckId(params);
	}

	@Override
	public void saveNewStaff(StaffVo vo){
		staffMapper.saveNewStaff(vo);
	}

	@Override
	public void updateVersion(HashMap<String,String> params) {
		staffMapper.updateVersion(params);
	}

	
	@Override
	public void deleteStaff(HashMap<String, String> params) {
		staffMapper.deleteStaff(params);
		
	}
	
	@Override
	public void updateStaff(HashMap<String, String> params) {
		String id = params.get("id");
		String password = params.get("password");
		if(password != ""){
			StaffVo staff = new StaffVo();
			staff.setStaffId(id);
			staff = login.getPassword(staff);	
			String shaPwd = Encrypt.setSHA512(password, staff.getPasswordKey());
			params.replace("password", shaPwd);
		}
		staffMapper.updateStaff(params);
	}
    
}
