//code intellisense typescript 정의
///<reference path = "../../wijmo/controls/wijmo.d.ts"/>	
///<reference path = "../../wijmo/controls/wijmo.grid.d.ts"/>
///<reference path = "../../wijmo/controls/wijmo.grid.detail.d.ts"/>
///<reference path = "../../wijmo/controls/wijmo.grid.sheet.d.ts"/>
///<reference path = "../../wijmo/controls/wijmo.input.d.ts"/>

/// <reference path ="../../wijmo/controls/wijmo.chart.d.ts"/>
/// <reference path ="../../wijmo/controls/wijmo.pdf.d.ts"/>
/// <reference path ="../../wijmo/controls/wijmo.nav.d.ts"/>


// 컬랙션 뷰는 조회후에 그리드의 상태변경을 체크한다. 
var cv = new wijmo.collections.CollectionView();	//컬랙션뷰 전역변수 그리드의 수정,추가,삭제 되는 부분을 감지한다.

var flexGrid = new wijmo.grid.FlexGrid('#wijmoGrid');	//그리드 전역변수

var zoomSize = 11;	//확대축소 기본 사이즈

var sdat = new wijmo.input.InputDate("#searchDtFr");	//교육시작 일자
		
var edat = new wijmo.input.InputDate("#searchDtTo");	//교육종료 일자

/**
  그리드 초기화
 */
  var gridInit = function() {

	/**
	 *	grid 셋팅
	 *	gridCommon.js 에서 공통으로 처리되있는 옵션을 변경하고 싶다면 gridInit 함수에서 바꾸고싶은 옵션만 재정의 하면됨.
	 */     
	
	//콤보박스 정의
	var onoffYnMap = "N,Y".split(",");	//온/오프라인 콤보박스
	
	//컬럼정의
	columnsDefinition = [
	    {binding: 'staffId', header: 'No.', width: '*', align:'center',dataType:'Number'},  
        {binding: 'staffName', header: '이름', width: '*', align:'center',dataType:'String', maxLength:20},
        {binding: 'lateastDt', header: '최근 접속일', width: '*', align:'center',dataType:'String', maxLength:12},
        {binding: 'cretDt', header: '계정생성일', width: '*', align:'center',dataType:'String', maxLength:12},  //isReadOnly: true  
        {binding: 'staffEmail', header: 'Email', width: '*', dataMap:onoffYnMap, align:'center', dataType:'String'},
        {binding: 'adminYn', header: '관리자여부', width: '*', align:'center', dataMap:onoffYnMap, dataType:'String'},
        {binding: 'memo', header: '메모', width: '*', align:'center',dataType:'String', maxLength:50},
        {binding: '', header: '정보수정', width: '*', align:'center',dataType:'String'},
        // 콤보박스 추가하려면 dataMap
    ];

	//컬럼 초기화
	flexGrid.initialize({
		columns: columnsDefinition
	});

    localStorage.setItem('gridInitLayout', flexGrid.columnLayout);
    _setUserGridLayout('')

}

//직원추가 
var saveNewUser = function(){
	//필수값 체크
	if(newUserForm.id.value == ""){
        alert("ID를 입력해주세요.");
        newUserForm.id.focus();
        return false;
        
    }else if(newUserForm.password.value == ""){
    	alert("PW를 입력해주세요.");
        newUserForm.password.focus();
        return false;
        
    }else if(newUserForm.name.value == ""){
    	alert("이름을 입력해주세요.");
        newUserForm.name.focus();
        return false;
        
    }else if(newUserForm.telPhone.value == ""){
    	alert("전화번호를 입력해주세요.");
        newUserForm.telPhone.focus();
        return false;
        
    }else if(newUserForm.mail.value == ""){
    	alert("이메일을 입력해주세요.");
        newUserForm.mail.focus();
        return false;
    }
	
	//벨리데이션 체크 
	var pwdRule1  = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/;
    var pwdRule2  = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/;
    var pwdRule3  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    var emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    var telRule   = /^[0-9]{11}$/;
    
    if(!pwdRule1.test(newUserForm.password.value) && !pwdRule2.test(newUserForm.password.value) && !pwdRule3.test(newUserForm.password.value)){
    	alert("비밀번호를 확인하시기 바랍니다.\n비밀번호는 영문자(대,소문자), 숫자를 포함하여 최소 10자 이상이어야 합니다.");
    	newUserForm.password.focus();
    	return false;
    }else if(!emailRule.test(newUserForm.mail.value)){ //이메일
    	alert("이메일을 확인하시기 바랍니다.");
    	newUserForm.mail.focus();
        return false;
    }else if(!telRule.test(newUserForm.telPhone.value)){  // 전화번호
    	alert("전화번호를 올바르게 입력하시기 바랍니다. \n전화번호는 '-'없이 숫자 11자리이어야 합니다.' \n예)01012341234");
    	newUserForm.telPhone.focus();
        return false;
    }
    
    //중복확인 
    if(!dupCheckIdFlag){
    	alert('중복확인을 해주세요.');
    	return false;
    	
    }else{
    	var params = {
    		id 		:	newUserForm.id.value
    		,password:	newUserForm.password.value
    		,name	:	newUserForm.name.value
    		,telPhone:	newUserForm.telPhone.value
    		,mail	:	newUserForm.mail.value
    		,memo	:	newUserForm.memo.value
    	}
    	
    	$.ajax({
            url : "/user/saveNewUser",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            cache : false,
            dataType : 'text',
            data : params,
            success : function(data) {
                alert("직원 생성이 완료되었습니다.");
                closePop();
            },
            error : function(request,status,error) {
             	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
          });
    }
}

// 아이디 중복확인 dupCheckIdFlag
var dupCheckId = function(){
	
	console.log(newUserForm.id.value);
	
	if(newUserForm.id.value == ""){
      alert("아이디를 입력하세요.");
      return false;
    }
	
	var param = {
			id : newUserForm.id.value
	}
	
	$.ajax({
        url : "/user/dupCheckId",
        async : false, // 비동기모드 : true, 동기식모드 : false
        type : 'POST',
        cache : false,
        dataType : 'text',
        data : param,
        success : function(data) {
            if(data != ""){
              alert('이미 존재하는 아이디입니다.');
              dupCheckIdFlag = false;
            }else{
              alert('사용가능한 아이디입니다.');
              dupCheckIdFlag = true;
            }
        },
        error : function(request,status,error) {
         alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
      });
}

//스테프 리스트 조회
var getStaffList = function(){
	var param = {
	};
	
	$.ajax({
        type : 'POST',
        url : '/getStaffList',
        data : param,
        success : function(result) {
        	console.log("getStaffList success");
            cv.sourceCollection = result;
            gridInit();
        },
        error: function(request, status, error) {
        	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

        }
    }); 
}

//팝업 오픈
var showPop = function(pop) {
	if(pop == "new_user"){
		dupCheckIdFlag = false;
		
		newUserForm.id.value = "";
		newUserForm.password.value = "";
		newUserForm.name.value = "";
		newUserForm.telPhone.value = "";
		newUserForm.mail.value = "";
		newUserForm.memo.value = "";
		
	}else if(pop == "modify_user"){
		
	}
	
	$('.popup').addClass('is-visible');
}


$(document.body).ready(function() {

//그리드 공통js 호출 후에 나머지 함수 호출함.
$.when(
    $.getScript('/js/wijmo/commonGrid.js'),
    $.getScript('/js/wijmo/commonInput.js')
).done(function() {
    
    commonGrid.init(flexGrid,cv); //그리드 공통부분
    gridInit();  	//그리드 초기화

    });
});