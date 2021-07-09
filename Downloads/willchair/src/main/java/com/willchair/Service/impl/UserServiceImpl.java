package com.willchair.Service.impl;

import java.util.HashMap;
import java.util.List;

import com.willchair.Mapper.LoginMapper;
import com.willchair.Mapper.UserMapper;
import com.willchair.Util.Util;
import com.willchair.Service.UserService;
import com.willchair.Util.Encrypt;
import com.willchair.Vo.UserVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
    
    @Autowired
	private UserMapper userMapper;
	
	@Autowired
	private LoginMapper login;
	
	@Override
	public int getTotalUser() {
		return userMapper.getTotalUser();
	}

	@Override
	public int getTotalAdmin() {
		return userMapper.getTotalAdmin();
	}

	
	@Override
	public List<UserVo> getUserList(HashMap<String,Object> params){
		if(params.get("inq") != null)
			params.replace("inq", Util.makeForeach((String)params.get("inq"), ","));
		                		
		List<UserVo> staffList = userMapper.getUserList(params);
		return staffList;
	}
	
	@Override
	public String dupCheckId(HashMap<String, String> params) {
		return userMapper.dupCheckId(params);
	}

	@Override
	public void saveNewUser(UserVo vo){
		userMapper.saveNewUser(vo);
	}
	
	@Override
	public void deleteUser(HashMap<String, String> params) {
		userMapper.deleteUser(params);
		
	}
	
	@Override
	public void updateUser(HashMap<String, String> params) {
		String id = params.get("id");
		String password = params.get("password");
		if(password != ""){
			UserVo usr = new UserVo();
			usr.setUserId(id);
			usr = login.getPassword(usr);	
			String shaPwd = Encrypt.setSHA512(password, usr.getPasswordKey());
			params.replace("password", shaPwd);
		}
		userMapper.updateUser(params);
	}
    
}
