package com.willchair.Service;

import java.util.HashMap;
import java.util.List;

import com.willchair.Vo.UserVo;

public interface UserService {
    public int getTotalUser();
	
	public int getTotalAdmin();
	
	public List<UserVo> getUserList(HashMap<String,Object> params);
    
    public String dupCheckId(HashMap<String,String> params);
    
    public void saveNewUser(UserVo vo);
    
    public void deleteUser( HashMap<String,String> params);
    
    public void updateUser(HashMap<String,String> params);
}
