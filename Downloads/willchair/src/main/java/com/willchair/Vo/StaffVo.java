package com.willchair.Vo;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class StaffVo {
    private String staffId; 	//직원 아이디 
	private String staffPass; 	//직원 비밀번
	private String staffName;	//직원 이름 
	private String staffPnum;	//직원 전화번호 
	private String staffEmail; 	//직원 이메
	private String memo;		//메모 
	private String activeYn;	//활성화여부 
	private String adminYn;		//관리자여부
	private String latestDt;	//최근접속일
	private String cretDt;		//등록일
	private String cretId;		//등록자 
	private String updtDt;		//수정일 
	private String updtId;		//수정자 
	private String passwordKey; //비밀번호 솔트
}
