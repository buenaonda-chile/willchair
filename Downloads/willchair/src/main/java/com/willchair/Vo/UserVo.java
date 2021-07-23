package com.willchair.Vo;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserVo {
    private String id; 	//아이디 
    private String idProfile; //프로필이미지
	private String userAgeRange; 	//나이
	private String userGender;	//성별
	private String userNickName;	//닉네임
	private String userEmail; 	//이메일
	private String lastLoc;		//마지막접속지
	private String mos;	//모바일OS
	private String mInfo;		//모바일정보
	private String appVersion;	//앱버전
	private String cretTime;		//가입일
	private String lastTime;		//마지막접속일 
    private String adminFlag; //관리자여부
}