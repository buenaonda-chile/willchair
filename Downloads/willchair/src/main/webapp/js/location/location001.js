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

var locationView;
var locationGridPager;
var locationGrid;
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
    	getLocationList();
    }
}


//그리드 초기 셋팅
function loadGridLocationList(type, result){
	  if(type == "init"){
        locationView = new wijmo.collections.CollectionView(result, {
		       pageSize: 100
		   });
		    
		   locationGridPager = new wijmo.input.CollectionViewNavigator('#locationGridPager', {
		        byPage: true,
		        headerFormat: '{currentPage:n0} / {pageCount:n0}',
		        cv: locationView
		    });
		   
		   locationColumns = [
		      { binding: 'sidoCode', header: '지역코드', isReadOnly: true, width: 100 , align:"center" },
              { binding: 'sidoName', header: '지역명', isReadOnly: true, width: 150 , align:"center" },
              { binding: 'clusterCode', header: '클러스터코드', isReadOnly: true, width: 100 , align:"center" },
              { binding: 'clusterName', header: '클러스터이름', isReadOnly: true, width: 120 , align:"center" },
              { binding: 'activeFlag', header: '활성화', isReadOnly: true, width: 100 , align:"center" },
              { binding: 'edit', header: '정보수정', width: 100, align:"center",
		    	  cellTemplate: wijmo.grid.cellmaker.CellMaker.makeButton({
		              text: '<b>수정</b>',
		              click: (e, ctx) => {
		            	  showPop('modify_location');
		              }
		              
		    	  })
		      }
		    ];
		  
            locationGrid = new wijmo.grid.FlexGrid('#locationGrid', {
			    autoGenerateColumns: false,
			    alternatingRowStep: 0,
			    columns: locationColumns,
			    itemsSource: locationView,
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
                      cell.textContent = (locationView.pageSize * locationView.pageIndex + r + 1).toString();
                  }
              }
			  });
			  
		   	_setUserGridLayout('locationLayout', locationGrid, locationColumns);
			  
	  }else{
        locationView = new wijmo.collections.CollectionView(result, {
		       pageSize: 100
		   });
          locationGridPager.cv = locationView;
		  locationGrid.itemsSource = locationView;
	  }
	  
	  refreshPaging(locationGrid.collectionView.totalItemCount, 1, locationGrid, 'locationGrid');  // 페이징 초기 셋팅
	  
}

//스테프 리스트 조회
function getLocationList(){
	var param = {
		con 	: $('#con').val()
		, inq 	: $('#inq').val()
	};
	
	$.ajax({
        type : 'POST',
        url : '/location/getLocationList',
        dataType : null,
        data : param,
        success : function(result) {
        	console.log("getLocationList success");
        	loadGridLocationList('search', result);
        },
        error: function(request, status, error) {
        	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

        }
    }); 
}

//팝업 오픈
function showPop(pop){
	if(pop == "modify_location"){
		
		updateLocationForm.activeFlag.checked = (locationGrid.collectionView.currentItem["activeFlag"] == 'Y' ? true : false );
		updateLocationForm.sidoCode.value = locationGrid.collectionView.currentItem["sidoCode"];
		updateLocationForm.sidoName.value = locationGrid.collectionView.currentItem["sidoName"];
		updateLocationForm.clusterCode.value = locationGrid.collectionView.currentItem["clusterCode"];
		updateLocationForm.clusterName.value = locationGrid.collectionView.currentItem["clusterName"];		
	}
	
	$('#'+pop).addClass('is-visible');
}

//팝업 종료
function closePop(){
	$('.popup').removeClass('is-visible');
}

function updateLocation(){
	if(confirm("수정하시겠습니까?")){

	var params = {
		activeFlag : (updateLocationForm.activeFlag.checked ? 'Y' : 'N' )
		, clusterCode : updateLocationForm.clusterCode.value
	}
	
	$.ajax({
		url : "/location/updateLocation",
		async : false, // 비동기모드 : true, 동기식모드 : false
		type : 'POST',
		cache : false,
		dataType : 'text',
		data : params,
		success : function(data) {
			alert('정상적으로 수정되었습니다.');
			closePop();
			getLocationList();
		},
		error : function(request,status,error) {
		alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	});
	}
}

//엑셀 다운로드
function exportLocationExcel(){
	
	var gridView = locationGrid.collectionView;
	var oldPgSize = gridView.pageSize;
	var oldPgIndex = gridView.pageIndex;

    //전체 데이터를 엑셀다운받기 위해서는 페이징 제거 > 엑셀 다운 > 페이징 재적용 하여야 함.
    locationGrid.beginUpdate();
    locationView.pageSize = 0;

    wijmo.grid.xlsx.FlexGridXlsxConverter.saveAsync(locationGrid, {includeCellStyles: true, includeColumnHeaders: true}, '지역리스트.xlsx',
	      saved => {
	    	gridView.pageSize = oldPgSize;
	    	gridView.moveToPage(oldPgIndex);
	    	locationGrid.endUpdate();
	      }, null
	 );
}

$(document.body).ready(function() {   
    loadGridLocationList('init');  	//그리드 초기화
    $('#data').addClass("current");
	$('#location').addClass("current");
	document.addEventListener('keydown', enterkey);
});
