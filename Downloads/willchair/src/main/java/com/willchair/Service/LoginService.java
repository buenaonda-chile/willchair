package com.willchair.Service;

import javax.servlet.http.HttpServletRequest;

import com.willchair.Vo.StaffVo;

public interface LoginService {
    
    public String getPasswordCheck(StaffVo vo, HttpServletRequest request);
	
	public void updateLoginTime(StaffVo vo);
	
	public void autoLogin(String id, HttpServletRequest request);

	public String logOut(HttpServletRequest request);

}
