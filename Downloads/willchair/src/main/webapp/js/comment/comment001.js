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

var commentView;
var commentGridPager;
var commentGrid;
var dupCheckIdFlag = false;
var commentColumns;
var sdat = new wijmo.input.InputDate("#searchDtFr");	//시작 일자	
var edat = new wijmo.input.InputDate("#searchDtTo");	//종료 일자

//onload
// function pageLoad(){
// $('#object').addClass("current");
// $('#staff').addClass("current");
	
// loadGridStaffList('init');
// }

function enterkey() {
    if (window.event.keyCode == 13) {
    	getCommentList();
    }
}


//그리드 초기 셋팅
function loadGridCommentList(type, result){
	  if(type == "init"){
        commentView = new wijmo.collections.CollectionView(result, {
		       pageSize: 100
		   });
		    
		   commentGridPager = new wijmo.input.CollectionViewNavigator('#commentGridPager', {
		        byPage: true,
		        headerFormat: '{currentPage:n0} / {pageCount:n0}',
		        cv: commentView
		    });
		   
		   commentColumns = [
		      { binding: 'commentIdx', header: '댓글번호', isReadOnly: true, width: 100 , align:"center" },
              { binding: 'commentAddidx', header: '가게번호', isReadOnly: true, width: 150 , align:"center" },
			  { binding: 'storeName', header: '가게이름', isReadOnly: true, width: 150 , align:"center" },
			  { binding: 'storeLocName', header: '가게지점명', isReadOnly: true, width: 150 , align:"center" },
			  { binding: 'firstTypeName', header: '상권업종대분류명', isReadOnly: true, width: 150 , align:"center" },
			  { binding: 'sidoName', header: '시도명', isReadOnly: true, width: 150 , align:"center" },
			  { binding: 'sigugunName', header: '시군구명', isReadOnly: true, width: 150 , align:"center" },
              { binding: 'userId', header: '아이디', isReadOnly: true, width: 100 , align:"center" },
			  { binding: 'usernickname', header: '닉네임', isReadOnly: true, width: 100 , align:"center" },
              { binding: 'bodyText', header: '댓글내용', isReadOnly: true, width: 120 , align:"center" },
              { binding: 'cretTime', header: '작성일', isReadOnly: true, width: 100 , align:"center" },
              { binding: 'chTime', header: '수정일', isReadOnly: true, width: 100 , align:"center" },
              { binding: 'delTime', header: '삭제일', isReadOnly: true, width: 100 , align:"center" },
              { binding: 'imgPath', header: '이미지경로', isReadOnly: true, width: 100 , align:"center" ,maxWidth:200},
              { binding: 'imgPathFlag', header: '이미지경로활성화', isReadOnly: true, width: 100 , align:"center" },
              { binding: 'activeFlag', header: '활성화', isReadOnly: true, width: 100 , align:"center" },
              { binding: 'edit', header: '정보수정', width: 100, align:"center",
		    	  cellTemplate: wijmo.grid.cellmaker.CellMaker.makeButton({
		              text: '<b>수정</b>',
		              click: (e, ctx) => {
		            	  showPop('modify_comment');
		              }
		              
		    	  })
		      }
		    ];
		  
            commentGrid = new wijmo.grid.FlexGrid('#commentGrid', {
			    autoGenerateColumns: false,
			    alternatingRowStep: 0,
			    columns: commentColumns,
			    itemsSource: commentView,
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
                      cell.textContent = (commentView.pageSize * commentView.pageIndex + r + 1).toString();
                  }
              }
			  });
			  
		   	_setUserGridLayout('commentLayout', commentGrid, commentColumns);
			  
	  }else{
        commentView = new wijmo.collections.CollectionView(result, {
		       pageSize: 100
		   });
          commentGridPager.cv = commentView;
		  commentGrid.itemsSource = commentView;
	  }
	  
	  refreshPaging(commentGrid.collectionView.totalItemCount, 1, commentGrid, 'commentGrid');  // 페이징 초기 셋팅
	  
}

//댓글 리스트 조회
function getCommentList(){
	var param = {
		con 	: $('#commnetCon').val()
		, inq 	: $('#commentInq').val()
		, searchDtTo : wijmo.Globalize.format(edat.value,'yyyy-MM-dd')
		, searchDtFr : wijmo.Globalize.format(sdat.value,'yyyy-MM-dd')
	};
	
	$.ajax({
        type : 'POST',
        url : '/comment/getCommentList',
        dataType : null,
        data : param,
        success : function(result) {
        	console.log("getCommentList success");
        	loadGridCommentList('search', result);
        },
        error: function(request, status, error) {
        	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

        }
    }); 
}

//조회일자 초기화
var srcDatInit = function(){
	var now = new Date();

	var nYear = now.getFullYear();
	var nMonth = now.getMonth()+1;
	var nDay = now.getDate();
	
	var past = new Date(Date.parse(now) - 30 * 1000 * 60 * 60 * 24);

	var pYear = past.getFullYear();
	var pMonth = past.getMonth()+1;
	var pDay = past.getDate();

	if(nMonth < 10)
	nMonth = "0" + nMonth;
	if(pMonth < 10)
	pMonth = "0" + pMonth;        

	if(nDay < 10)
	nDay = "0" + nDay;
	if(pDay < 10)
	pDay = "0" + pDay;

	sdat.isRequired = false;
	sdat.value = pYear + "-" + pMonth + "-" + pDay;	//주석처리할경우 오늘날짜 자동으로 박힘.
	sdat.format = "yyyy-MM-dd";

	edat.isRequired = false;
	edat.value = nYear + "-" + nMonth + "-" + nDay;	
	edat.format = "yyyy-MM-dd";
		
}

//팝업 오픈
function showPop(pop){
	if(pop == "modify_comment"){
		
		var imgPath = commentGrid.collectionView.currentItem["imgPath"];
		if(imgPath != null) {	
		var imgPathArr = imgPath.split(',');
		for(var i = 0; i < imgPathArr.length; i++){
			var img = '<td><span class="opt_img"><img class="comment_img" src="'+imgPathArr[i]+'"art="이미지"></span></td>';
			$('#imgPath')
				.append(img)
		}
		}
		
		updateCommentForm.commentIdx.value = commentGrid.collectionView.currentItem["commentIdx"];
		updateCommentForm.commentAddidx.value = commentGrid.collectionView.currentItem["commentAddidx"];
		updateCommentForm.userId.value = commentGrid.collectionView.currentItem["userId"];
		updateCommentForm.bodyText.value = commentGrid.collectionView.currentItem["bodyText"];
		updateCommentForm.cretTime.value = commentGrid.collectionView.currentItem["cretTime"];	
		updateCommentForm.imgPathFlag.checked = (commentGrid.collectionView.currentItem["imgPathFlag"] == 'Y' ? true : false );
		updateCommentForm.activeFlag.checked = (commentGrid.collectionView.currentItem["activeFlag"] == 'Y' ? true : false );
	
	}
	
	$('#'+pop).addClass('is-visible');
}

//팝업 종료
function closePop(){
	$('#imgPath').empty();
	$('.popup').removeClass('is-visible');
}

function updateLocation(){
	if(confirm("수정하시겠습니까?")){

	var params = {
		activeFlag : (updateCommentForm.activeFlag.checked ? 'Y' : 'N' )
		, imgPathFlag : (updateCommentForm.imgPathFlag.checked ? 'Y' : 'N' )
		, bodyText : updateCommentForm.bodyText.value
		, id : updateCommentForm.commentIdx.value
	}
	 
	$.ajax({
		url : "/comment/updateComment",
		async : false, // 비동기모드 : true, 동기식모드 : false
		type : 'POST',
		cache : false,
		dataType : 'text',
		data : params,
		success : function(data) {
			alert('정상적으로 수정되었습니다.');
			getCommentList();
			closePop();
		},
		error : function(request,status,error) {
		alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	});
}
}

$(document.body).ready(function() {   
	srcDatInit();
    loadGridCommentList('init');  	//그리드 초기화
    $('#contents').addClass("current");
	$('#comment').addClass("current");
	document.addEventListener('keydown', enterkey);
});
