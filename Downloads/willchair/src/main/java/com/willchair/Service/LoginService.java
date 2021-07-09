package com.willchair.Service;

import javax.servlet.http.HttpServletRequest;

import com.willchair.Vo.UserVo;

public interface LoginService {
    
    public String getPasswordCheck(UserVo vo, HttpServletRequest request);
	
	public void updateLoginTime(UserVo vo);
	
	public void autoLogin(String id, HttpServletRequest request);

	public String logOut(HttpServletRequest request);

}
