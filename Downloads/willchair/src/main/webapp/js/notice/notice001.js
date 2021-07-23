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

var noticeView;
var noticeGridPager;
var noticeGrid;
var dupCheckIdFlag = false;
var loactionColumns;

//onload
// function pageLoad(){
// $('#object').addClass("current");
// $('#staff').addClass("current");
	
// loadGridStaffList('init');
// }

function enterkey() {
    if (window.event.keyCode == 13) {
    	getNoticeList();
    }
}


//그리드 초기 셋팅
function loadGridNoticeList(type, result){
	  if(type == "init"){
        noticeView = new wijmo.collections.CollectionView(result, {
		       pageSize: 100
		   });
		    
		   noticeGridPager = new wijmo.input.CollectionViewNavigator('#noticeGridPager', {
		        byPage: true,
		        headerFormat: '{currentPage:n0} / {pageCount:n0}',
		        cv: noticeView
		    });
		   
		   noticeColumns = [
		      { binding: 'index', header: '번호', isReadOnly: true, width: 100 , align:"center" },
			  { binding: 'category', header: '카테고리', isReadOnly: true, width: 100 , align:"center" },
              { binding: 'title', header: '제목', isReadOnly: true, width: 600 , align:"center" },
              { binding: 'cretTime', header: '작성날짜', isReadOnly: true, width: 200 , align:"center" },
			  { binding: 'chgTime', header: '수정날짜', isReadOnly: true, width: 200 , align:"center" },
              { binding: 'notice_flag', header: '활성화', isReadOnly: true, width: 100 , align:"center" },
              { binding: 'edit', header: '정보수정', width: 100, align:"center",
		    	  cellTemplate: wijmo.grid.cellmaker.CellMaker.makeButton({
		              text: '<b>수정</b>',
		              click: (e, ctx) => {
		            	  showPop('modify_notice');
		              }
		              
		    	  })
		      }
		    ];
		  
            noticeGrid = new wijmo.grid.FlexGrid('#noticeGrid', {
			    autoGenerateColumns: false,
			    alternatingRowStep: 0,
			    columns: noticeColumns,
			    itemsSource: noticeView,
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
                      cell.textContent = (noticeView.pageSize * noticeView.pageIndex + r + 1).toString();
                  }
              }
			  });
			  
		   	_setUserGridLayout('noticeLayout', noticeGrid, noticeColumns);
			  
	  }else{
        noticeView = new wijmo.collections.CollectionView(result, {
		       pageSize: 100
		   });
          noticeGridPager.cv = noticeView;
		  noticeGrid.itemsSource = noticeView;
	  }
	  
	  refreshPaging(noticeGrid.collectionView.totalItemCount, 1, noticeGrid, 'noticeGrid');  // 페이징 초기 셋팅
	  
}

//공지추가 
function saveNewNotice(){
	//필수값 체크
	if(newNoticeForm.title.value == ""){
        alert("제목을 입력해주세요.");
        newNoticeForm.title.focus();
        return false;
        
    }else if(editor.getData() == ""){
    	alert("내용을 입력해주세요.");
        newNoticeForm.content.focus();
        return false;
    }
    
	alert(editor.getData());
	var params = {
		title 	 :newNoticeForm.title.value
		,content :editor.getData()
	}
    	
	$.ajax({
		url : "/notice/saveNewNotice",
		async : false, // 비동기모드 : true, 동기식모드 : false
		type : 'POST',
		cache : false,
		dataType : 'text',
		data : params,
		success : function(data) {
			alert("공지 작성이 완료되었습니다.");
			closePop();
			getNoticeList();
		},
		error : function(request,status,error) {
			alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
		});
}



//공지 리스트 조회
function getNoticeList(){
	var param = {
		con 	: $('#con').val()
		, inq 	: $('#inq').val()
	};
	
	$.ajax({
        type : 'POST',
        url : '/notice/getNoticeList',
        dataType : null,
        data : param,
        success : function(result) {
        	console.log("getNoticeList success");
        	loadGridNoticeList('search', result);
        },
        error: function(request, status, error) {
        	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

        }
    }); 
}

//팝업 오픈
function showPop(pop){
	if(pop == "new_notice") {

		newNoticeForm.title.value = "";
		editor.setData('안녕하세요');

	}else if(pop == "modify_notice"){
		
		updateNoticeForm.activeFlag.checked = (noticeGrid.collectionView.currentItem["activeFlag"] == 'Y' ? true : false );
		updateNoticeForm.sidoCode.value = noticeGrid.collectionView.currentItem["sidoCode"];
		updateNoticeForm.sidoName.value = noticeGrid.collectionView.currentItem["sidoName"];
		updateNoticeForm.clusterCode.value = noticeGrid.collectionView.currentItem["clusterCode"];
		updateNoticeForm.clusterName.value = noticeGrid.collectionView.currentItem["clusterName"];		
	}
	
	$('#'+pop).addClass('is-visible');
}

//팝업 종료
function closePop(){
	$('.popup').removeClass('is-visible');
}

$(document.body).ready(function() {   
    loadGridNoticeList('init');  	//그리드 초기화
    $('#content').addClass("current");
	$('#notice').addClass("current");
	ClassicEditor
	.create(document.querySelector('#content'), {
		ckfinder: {
			uploadUrl:'/ck/fileupload'	
		},
		language: {ui: 'ko', content: 'ko'},
		alignment: {
			options: ['left','center','right']
		}
	})
	.then( editor => {
		console.log('Editor was initialized', editor);
		window.editor = editor;
	})
	.catch(error=>{
		console.error(error);
	});
});
