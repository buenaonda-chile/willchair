package com.willchair.Service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.willchair.Mapper.LoginMapper;
import com.willchair.Mapper.UserMapper;
import com.willchair.Service.LoginService;
import com.willchair.Vo.UserVo;
import com.willchair.Util.Encrypt;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService{
    
    @Autowired
	private LoginMapper loginMapper;
	
	@Autowired
	private UserMapper userMapper;
	
	@Override
	public String getPasswordCheck(UserVo vo, HttpServletRequest request) {

		HttpSession session = request.getSession();
		UserVo regUser = loginMapper.getPassword(vo);
		String url = null;

		if(regUser == null){
			url = "login_fail";
		}else{
			String sha512Pwd = Encrypt.setSHA512(vo.getUserPass(), regUser.getPasswordKey());
			if(!regUser.getUserId().equals(null) && sha512Pwd.equals(regUser.getUserPass())){ // 비밀번호 일치 하는 경우

				regUser = userMapper.getUserInfo(vo);
				
				session.setAttribute("userId", regUser.getUserId());
				session.setAttribute("userPass", regUser.getUserPass());
				session.setAttribute("userName", regUser.getUserName());
				session.setAttribute("userPnum", regUser.getUserPnum());
				session.setAttribute("userEmail", regUser.getUserEmail());
				session.setAttribute("activeYn", regUser.getActiveYn());
				session.setAttribute("adminYn", regUser.getAdminYn());
				session.setAttribute("latestDt", regUser.getLatestDt());

				if( !regUser.getActiveYn().equals("Y") || !regUser.getAdminYn().equals("Y") ){
					url = "login_auth_fail";
					session.invalidate();
				}else{
					url = "login";
				}
					
			}else{  // 비밀번호 불일치
				 session.invalidate();
					url = "login_fail";
			}
		}
		return url;
	}
	
	
	@Override
	public void updateLoginTime(UserVo vo){
		SimpleDateFormat timeFormat = new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss");		
		Date time = new Date();
		String loginTime = timeFormat.format(time);
		vo.setLatestDt(loginTime);
		loginMapper.updateLoginTime(vo);
	}
	
	@Override
	public void autoLogin(String id, HttpServletRequest request) {
		HttpSession session = request.getSession();
		UserVo userVo = new UserVo();
		userVo.setUserId(id);
		userVo = userMapper.getUserInfo(userVo);
		
		if(userVo != null ){
            session.setAttribute("userId", userVo.getUserId());
            session.setAttribute("userPass", userVo.getUserPass());
            session.setAttribute("userName", userVo.getUserName());
            session.setAttribute("userPnum", userVo.getUserPnum());
            session.setAttribute("userEmail", userVo.getUserEmail());
            session.setAttribute("activeYn", userVo.getActiveYn());
            session.setAttribute("adminYn", userVo.getAdminYn());
            session.setAttribute("latestDt", userVo.getLatestDt());
		}
			
	}
	
	@Override
	public String logOut(HttpServletRequest request) {
		HttpSession session = request.getSession();
		System.out.println("session invalidate!!");
		session.invalidate();
		return "/";
		
	}
}
