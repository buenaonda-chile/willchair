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
	    {binding: 'no', header: 'No.', width: '*', align:'center',dataType:'Number'},  
        {binding: 'name', header: '제목', width: '3*', align:'center',dataType:'String', maxLength:20},
        {binding: 'id', header: '작성자', width: '*', align:'center',dataType:'String', maxLength:12},
        {binding: '', header: '작성일', width: '*', align:'center',dataType:'String', maxLength:12},  //isReadOnly: true  
        {binding: '', header: '비고', width: '*', align:'center',dataType:'String',},
    ];

	//컬럼 초기화
	flexGrid.initialize({
		columns: columnsDefinition
	});

}

$(document.body).ready(function() {

//그리드 공통js 호출 후에 나머지 함수 호출함.
$.when(
    $.getScript('/js/wijmo/commonGrid.js'),
    $.getScript('/js/wijmo/commonInput.js')
).done(function() {
    
    commonGrid.init(flexGrid,cv); //그리드 공통부분
    refreshPaging(flexGrid.collectionView.totalItemCount,1, flexGrid, 'wijmoGrid');
    gridInit();  	//그리드 초기화

    });
});
