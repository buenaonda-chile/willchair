//code intellisense typescript 정의
///<reference path = "../../wijmo/controls/wijmo.d.ts"/>	
///<reference path = "../../wijmo/controls/wijmo.grid.d.ts"/>
///<reference path = "../../wijmo/controls/wijmo.grid.detail.d.ts"/>
///<reference path = "../../wijmo/controls/wijmo.grid.sheet.d.ts"/>
///<reference path = "../../wijmo/controls/wijmo.input.d.ts"/>
///<reference path = "../../wijmo/controls/wijmo.grid.cellmaker.d.ts"/>

/// <reference path ="../../wijmo/controls/wijmo.chart.d.ts"/>
/// <reference path ="../../wijmo/controls/wijmo.pdf.d.ts"/>
/// <reference path ="../../wijmo/controls/wijmo.nav.d.ts"/>

var staffView;
var staffGridPager;
var staffGrid;
var dupCheckIdFlag = false;
var staffColumns;

var userView;
var userGridPager;
var userGrid;
var userColumns;

//onload
// function pageLoad(){
// $('#object').addClass("current");
// $('#staff').addClass("current");
	
// loadGridStaffList('init');
// }

function enterkey() {
    if (window.event.keyCode == 13) {
    	getStaffList();
        getUserList();
    }
}


//그리드 초기 셋팅
function loadGridStaffList(type, result){
	  if(type == "init"){
		   staffView = new wijmo.collections.CollectionView(result, {
		       pageSize: 100
		   });
		    
		   staffGridPager = new wijmo.input.CollectionViewNavigator('#staffGridPager', {
		        byPage: true,
		        headerFormat: '{currentPage:n0} / {pageCount:n0}',
		        cv: staffView
		    });
		   
		   staffColumns = [
		      { binding: 'staffName', header: '이름', isReadOnly: true, width: 100, align:"center" },
		      { binding: 'staffId', header: 'ID', isReadOnly: true, width: 100, align:"center"  },
		      { binding: 'activeYn', header: '활성화', isReadOnly: true, width: 60, align:"center"  },
		      { binding: 'staffPnum', header: '전화번호', isReadOnly: true, width: 120, align:"center"  },
		      { binding: 'staffEmail', header: '이메일', isReadOnly: true, width: 200, align:"center"  },
		      { binding: 'memo', header: '메모', isReadOnly: true, width: 300, align:"center" },
		      { binding: 'latestDt', header: '최근접속일', isReadOnly: true, width: 200 , align:"center" },
		      { binding: 'cretDt', header: '계정생성일', isReadOnly: true, width: 200 , align:"center" },
		      { binding: 'edit', header: '정보수정', width: 100, align:"center",
		    	  cellTemplate: wijmo.grid.cellmaker.CellMaker.makeButton({
		              text: '<b>수정</b>',
		              click: (e, ctx) => {
		            	  showPop('modify_staff');
		              }
		              
		    	  })
		      }
		    ];
		  
		   staffGrid = new wijmo.grid.FlexGrid('#staffGrid', {
			    autoGenerateColumns: false,
			    alternatingRowStep: 0,
			    columns: staffColumns,
			    itemsSource: staffView,
                keyActionEnter: "MoveDown",
                imeEnabled: true,
                loadedRows: function(s, e) {
                    s.autoSizeColumns(); 
                 },
                  cellEditEnded: function(s, e) {
                    s.autoSizeColumn(e.col);
                 },
                  rowEditEnded: function(s, e) {
                    s.autoSizeColumns();
                 },
                itemFormatter: function(p, r, c, cell) {
		
                    if (p.cellType == wijmo.grid.CellType.RowHeader) {
                        //cell.textContent = (r+1).toString();
                        cell.textContent = (staffView.pageSize * staffView.pageIndex + r + 1).toString();
                    }
                }
			  });
			  			  
	  }else{
		   staffView = new wijmo.collections.CollectionView(result, {
		       pageSize: 100
		   });
		  staffGridPager.cv = staffView;
		  staffGrid.itemsSource = staffView;
	  }
	  
	  refreshPaging(staffGrid.collectionView.totalItemCount, 1, staffGrid, 'staffGrid');  // 페이징 초기 셋팅
	  
}

//그리드 초기 셋팅
function loadGridUserList(type, result){

    if(type == "init"){
         userView = new wijmo.collections.CollectionView(result, {
             pageSize: 100
         });
          
         userGridPager = new wijmo.input.CollectionViewNavigator('#userGridPager', {
              byPage: true,
              headerFormat: '{currentPage:n0} / {pageCount:n0}',
              cv: userView
          });

          var onoffYnMap = "N,Y".split(",");	//온/오프라인 콤보박스
         
         userColumns = [
            { binding: 'id', header: 'ID', isReadOnly: true, width: 100, align:"center", maxWidth:200},
            { binding: 'userNickName', header: '닉네임', isReadOnly: true, width: 120, align:"center"},
            { binding: 'idProfile', header: '프로필사진', width: 100, align:"center", cssClass: 'cell-img',
		    	  cellTemplate: wijmo.grid.cellmaker.CellMaker.makeImage({
		    	  })
		    },
            { binding: 'userAgeRange', header: '연령대', isReadOnly: true, width: 170, align:"center" },
            { binding: 'userGender', header: '성별', isReadOnly: true, width:150, align:"center"  },
            { binding: 'userEmail', header: '이메일', isReadOnly: true, width:200, align:"center"  },
            { binding: 'adminFlag', header: '관리자여부', width:100, align:"center", dataMap:onoffYnMap},
            { binding: 'lastLoc', header: '최근위치', isReadOnly: true, width:250, align:"center", visible:false},
            { binding: 'mos', header: '모바일OS', isReadOnly: true, width: 100 , align:"center" },
            { binding: 'minfo', header: '모바일정보', isReadOnly: true, width: 230 , align:"center" },
            { binding: 'appVersion', header: '앱버전', isReadOnly: true, width: 100 , align:"center" },
            { binding: 'cretTime', header: '가입일', isReadOnly: true, width: 100 , align:"center" },
            { binding: 'lastTime', header: '마지막접속일', isReadOnly: true, width: 100 , align:"center" },
          ];
        
         userGrid = new wijmo.grid.FlexGrid('#userGrid', {
              autoGenerateColumns: false,
              alternatingRowStep: 0,
              columns: userColumns,
              itemsSource: userView,
              keyActionEnter: "MoveDown",
              imeEnabled: true,
              loadedRows: function(s, e) {
                s.autoSizeColumns();
             },
              cellEditEnded: function(s, e) {
                s.autoSizeColumn(e.col);
                var col = s.columns[e.col];
                if(col.binding == 'adminFlag') {
                var params = {
                    adminFlag : e.getRow().dataItem.adminFlag,
                    id : e.getRow().dataItem.id
                }
                $.ajax({
                    url : "/user/saveAdminFlag",
                    async : false, // 비동기모드 : true, 동기식모드 : false
                    cache : false,
                    dataType : 'text',
                    data: params,
                    success : function(result) {
                        alert("수정 완료되었습니다.");
                        getUserList();
                    },
                    error : function(request,status,error) {
                        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                    }
                });
                }                    
             },
              rowEditEnded: function(s, e) {
                s.autoSizeColumns();
             },
              itemFormatter: function(p, r, c, cell) {
                  if (p.cellType == wijmo.grid.CellType.RowHeader) {
                      //cell.textContent = (r+1).toString();
                      cell.textContent = (userView.pageSize * userView.pageIndex + r + 1).toString();
                  }
              }
            });
                        
    }else{
        userView = new wijmo.collections.CollectionView(result, {
             pageSize: 100
         });
        userGridPager.cv = userView;
        userGrid.itemsSource = userView;
    }
    
    refreshPaging(userGrid.collectionView.totalItemCount, 1, userGrid, 'userGrid');  // 페이징 초기 셋팅
    
}


//스테프 리스트 조회
function getStaffList(){
	var param = {
		con 	: $('#staffCon').val()
		, inq 	: $('#staffInq').val()
	};
	
	$.ajax({
        type : 'POST',
        url : '/user/getStaffList',
        dataType : null,
        data : param,
        success : function(result) {
        	console.log("getStaffList success");
        	loadGridStaffList('search', result);
        },
        error: function(request, status, error) {
        	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

        }
    }); 
}

//회원 리스트 조회
function getUserList(){
	var param = {
		con 	: $('#userCon').val()
		, inq 	: $('#userInq').val()
	};
	
	$.ajax({
        type : 'POST',
        url : '/user/getUserList',
        dataType : null,
        data : param,
        success : function(result) {
        	console.log("getUserList success");
        	loadGridUserList('search', result);
        },
        error: function(request, status, error) {
        	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

        }
    }); 
}

//팝업 오픈
function showPop(pop){
	if(pop == "new_staff"){
		dupCheckIdFlag = false;
		
		newStaffForm.id.value = "";
		newStaffForm.password.value = "";
		newStaffForm.name.value = "";
		newStaffForm.telPhone.value = "";
		newStaffForm.mail.value = "";
		newStaffForm.memo.value = "";
		
	}else if(pop == "modify_staff"){
		
		updateStaffForm.active.checked = (staffGrid.collectionView.currentItem["activeYn"] == 'Y' ? true : false );
		updateStaffForm.admin.checked = (staffGrid.collectionView.currentItem["adminYn"] == 'Y' ? true : false );
		updateStaffForm.id.value = staffGrid.collectionView.currentItem["staffId"];
		updateStaffForm.password.value = "";
		updateStaffForm.name.value = staffGrid.collectionView.currentItem["staffName"];
		updateStaffForm.telPhone.value = staffGrid.collectionView.currentItem["staffPnum"];
		updateStaffForm.mail.value = staffGrid.collectionView.currentItem["staffEmail"];
		updateStaffForm.memo.value = staffGrid.collectionView.currentItem["memo"];
		
	}
	
	$('#'+pop).addClass('is-visible');
}

//팝업 종료
function closePop(){
	$('.popup').removeClass('is-visible');
}

//직원추가 
function saveNewStaff(){
	//필수값 체크
	if(newStaffForm.id.value == ""){
        alert("ID를 입력해주세요.");
        newStaffForm.id.focus();
        return false;
        
    }else if(newStaffForm.password.value == ""){
    	alert("PW를 입력해주세요.");
        newStaffForm.password.focus();
        return false;
        
    }else if(newStaffForm.name.value == ""){
    	alert("이름을 입력해주세요.");
        newStaffForm.name.focus();
        return false;
        
    }else if(newStaffForm.telPhone.value == ""){
    	alert("전화번호를 입력해주세요.");
        newStaffForm.telPhone.focus();
        return false;
        
    }else if(newStaffForm.mail.value == ""){
    	alert("이메일을 입력해주세요.");
        newStaffForm.mail.focus();
        return false;
    }
	
	//벨리데이션 체크 
	var pwdRule1  = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/;
    var pwdRule2  = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/;
    var pwdRule3  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    var emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    var telRule   = /^[0-9]{11}$/;
    
    if(!pwdRule1.test(newStaffForm.password.value) && !pwdRule2.test(newStaffForm.password.value) && !pwdRule3.test(newStaffForm.password.value)){
    	alert("비밀번호를 확인하시기 바랍니다.\n비밀번호는 영문자(대,소문자), 숫자를 포함하여 최소 10자 이상이어야 합니다.");
    	newStaffForm.password.focus();
    	return false;
    }else if(!emailRule.test(newStaffForm.mail.value)){ //이메일
    	alert("이메일을 확인하시기 바랍니다.");
    	newStaffForm.mail.focus();
        return false;
    }else if(!telRule.test(newStaffForm.telPhone.value)){  // 전화번호
    	alert("전화번호를 올바르게 입력하시기 바랍니다. \n전화번호는 '-'없이 숫자 11자리이어야 합니다.' \n예)01012341234");
    	newStaffForm.telPhone.focus();
        return false;
    }
    
    //중복확인 
    if(!dupCheckIdFlag){
    	alert('중복확인을 해주세요.');
    	return false;
    	
    }else{
    	var params = {
    		id 		:	newStaffForm.id.value
    		,password:	newStaffForm.password.value
    		,name	:	newStaffForm.name.value
    		,telPhone:	newStaffForm.telPhone.value
    		,mail	:	newStaffForm.mail.value
    		,memo	:	newStaffForm.memo.value
    	}
    	
    	$.ajax({
            url : "/user/saveNewStaff",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            cache : false,
            dataType : 'text',
            data : params,
            success : function(data) {
                alert("직원 생성이 완료되었습니다.");
                closePop();
                getStaffList();
            },
            error : function(request,status,error) {
             	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
          });
    }
}

// 아이디 중복확인 dupCheckIdFlag
function dupCheckId(){
	
	console.log(newStaffForm.id.value);
	
	if(newStaffForm.id.value == ""){
      alert("아이디를 입력하세요.");
      return false;
    }
	
	var param = {
			id : newStaffForm.id.value
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

function deleteStaff(){
	if(confirm("삭제하시겠습니까?")){
		var params = {
          	id : updateStaffForm.id.value
      	};
		
		$.ajax({
            url : '/user/deleteStaff',
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            cache : false,
            dataType : null,
            data : params,
            success : function(data) {
            	alert('정상적으로 삭제되었습니다.');
            	closePop();
            	getStaffList();
            },
            error : function(request,status,error) {
              alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
      });
	}
}

function updateStaff(){
	//필수값 체크
	if(updateStaffForm.name.value == ""){
    	alert("이름을 입력해주세요.");
    	updateStaffForm.name.focus();
        return false;
        
    }else if(updateStaffForm.telPhone.value == ""){
    	alert("전화번호를 입력해주세요.");
    	updateStaffForm.telPhone.focus();
        return false;
        
    }
	
	//벨리데이션 체크 
	var pwdRule1  = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/;
    var pwdRule2  = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/;
    var pwdRule3  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    var emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    var telRule   = /^[0-9]{11}$/;
    
    if(updateStaffForm.password.value != '' && !pwdRule1.test(updateStaffForm.password.value) && !pwdRule2.test(updateStaffForm.password.value) && !pwdRule3.test(updateStaffForm.password.value)){
    	alert("비밀번호를 확인하시기 바랍니다.\n비밀번호는 영문자(대,소문자), 숫자를 포함하여 최소 10자 이상이어야 합니다.");
    	updateStaffForm.password.focus();
    	return false;
    }else if(!emailRule.test(updateStaffForm.mail.value)){ //이메일
    	alert("이메일을 확인하시기 바랍니다.");
    	updateStaffForm.mail.focus();
        return false;
    }else if(!telRule.test(updateStaffForm.telPhone.value)){  // 전화번호
    	alert("전화번호를 올바르게 입력하시기 바랍니다. \n전화번호는 '-'없이 숫자 11자리이어야 합니다.' \n예)01012341234");
    	updateStaffForm.telPhone.focus();
        return false;
    }
    
    var params = {
   		active 		: (updateStaffForm.active.checked ? 'Y' : 'N' )
       	, admin 	: (updateStaffForm.admin.checked ? 'Y' : 'N' )
       	, id 		: updateStaffForm.id.value
       	, password 	: updateStaffForm.password.value
       	, name 		: updateStaffForm.name.value
       	, telPhone 	: updateStaffForm.telPhone.value	
       	, mail 		: updateStaffForm.mail.value	
       	, memo 		: updateStaffForm.memo.value	
    }
    
    $.ajax({
        url : "/user/updateStaff",
        async : false, // 비동기모드 : true, 동기식모드 : false
        type : 'POST',
        cache : false,
        dataType : 'text',
        data : params,
        success : function(data) {
        	alert('정상적으로 수정되었습니다.');
        	closePop();
        	getStaffList();
        },
        error : function(request,status,error) {
         alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
      });
}

function updateVersion(){
	if(confirm("버전을 수정하시겠습니까?")){
        //벨리데이션 체크
        if($('#appVer').val().length > 9) {
            alert("앱 버전을 확인하시기 바랍니다.\n앱버전은 9자리 이하이여야 합니다.")
            return false;
        }

		var params = {
          	version : $('#appVer').val()
      	};
		
		$.ajax({
            url : '/user/updateVersion',
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            cache : false,
            dataType : null,
            data : params,
            success : function(data) {
            	alert('정상적으로 수정되었습니다.');
            },
            error : function(request,status,error) {
              alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
      });
	}
}

function exportStaffExcel(){
	
	var gridView = staffGrid.collectionView;
	var oldPgSize = gridView.pageSize;
	var oldPgIndex = gridView.pageIndex;

    //전체 데이터를 엑셀다운받기 위해서는 페이징 제거 > 엑셀 다운 > 페이징 재적용 하여야 함.
    staffGrid.beginUpdate();
    staffView.pageSize = 0;

    wijmo.grid.xlsx.FlexGridXlsxConverter.saveAsync(staffGrid, {includeCellStyles: true, includeColumnHeaders: true}, '관리자리스트.xlsx',
	      saved => {
	    	gridView.pageSize = oldPgSize;
	    	gridView.moveToPage(oldPgIndex);
	    	staffGrid.endUpdate();
	      }, null
	 );
}

function exportUserExcel(){
	
	var gridView = userGrid.collectionView;
	var oldPgSize = gridView.pageSize;
	var oldPgIndex = gridView.pageIndex;

    //전체 데이터를 엑셀다운받기 위해서는 페이징 제거 > 엑셀 다운 > 페이징 재적용 하여야 함.
    userGrid.beginUpdate();
    userView.pageSize = 0;

    wijmo.grid.xlsx.FlexGridXlsxConverter.saveAsync(userGrid, {includeCellStyles: true, includeColumnHeaders: true}, 'APP회원리스트.xlsx',
	      saved => {
	    	gridView.pageSize = oldPgSize;
	    	gridView.moveToPage(oldPgIndex);
	    	userGrid.endUpdate();
	      }, null
	 );
}

$(document.body).ready(function() {           
    loadGridStaffList('init');  	//그리드 초기화
    loadGridUserList('init');
    $('#member').addClass("current");
    new wijmo.nav.TabPanel("#theTabPanel");
});
