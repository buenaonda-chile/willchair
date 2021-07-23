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

var storeView;
var storeGridPager;
var storeGrid;
var dupCheckIdFlag = false;
var storeColumns;
var excelGrid;
var excelView;
var excelGridPager;
var dupResult = [];

var addStore = function() {
    // var item ={storeLocName: ""};
    // storeView.sourceCollection.splice(0,0,item);
    // storeView.refresh();
    storeView.addNew();
    var dataPerPage = storeGrid.collectionView.pageSize;
    var totalData = storeGrid.collectionView.totalItemCount;
    var totalPage = Math.ceil(totalData / dataPerPage);
    clickPager(totalPage,storeGrid,'storeGrid');
    storeView.commitNew();
    storeGrid.select(new wijmo.grid.CellRange(storeGrid.rows.length - 1,0), true);  //셀선택 추가된행으로 선택되게
}

var removeStore = function () {
    if(confirm("삭제 하시겠습니까?")){
        storeView.remove(storeView.currentItem);
    }
}

var saveStore = function() {

    if(storeGrid.rows.length < 1 && storeView.itemsRemoved.length == 0){
        alert("등록할 내용이 없습니다.");
        return;
    }
    	
	// 추가행과 수정행만 validation	
	for ( var i = 0; i <storeView.itemsAdded.length; i ++) {
		if(!validation(storeView.itemsAdded[i])){
			return false;
		}	
	}

	for ( var i = 0; i <storeView.itemsEdited.length; i ++) {
		if(!validation(storeView.itemsEdited[i])){
			return false;
		}	
	}

    //추가행 저장
    for ( var i = 0; i <storeView.itemsAdded.length; i ++) {
        console.debug("add:");
        console.debug(storeView.itemsAdded[i]);
        
        ajaxCommit("/store/create",storeView.itemsAdded[i]);
    }
    
    //수정행 저장
    for ( var i = 0; i <storeView.itemsEdited.length; i ++) {
        console.debug("edit:");
        console.debug(storeView.itemsEdited[i]);
        
        ajaxCommit("/store/update",storeView.itemsEdited[i]);
    }
    
    //삭제행 저장
    for ( var i = 0; i <storeView.itemsRemoved.length; i ++) {
        console.debug("del:");
        console.debug(storeView.itemsRemoved[i]);

        ajaxCommit("/store/delete",storeView.itemsRemoved[i]);
    }

}

//등록,수정,삭제
var ajaxCommit = function(url,item){
			
	$.ajax({
		method : "post",
		url : url,
		data : item,
		async: false,
		success : function(result) {
            getStoreList();
            alert("저장되었습니다");
	    },
        error: function(request, status, error) {
        	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
	});	
}

//validation
var validation = function(item){
	
	if (item.storeName == null || wijmo.isEmpty(item.storeName) || item.storeName == "") {
		alert("[상호명을 입력 해주세요.]");
		return false;
	}
				
				
	if (item.latX == null || wijmo.isEmpty(item.latX) || item.latX == "") {
		alert("[위도를 입력 해주세요.]");
		return false;
	}
				
	if (item.lngY == null || wijmo.isEmpty(item.lngY) || item.lngY == "") {
		alert("[경도를 입력 해주세요.]");
		return false;
    }
	
	return true;				
			
}


//그리드 초기 셋팅
function loadGridStoreList(type, result){
	  if(type == "init"){
        $("#excelDiv").hide();
        $("#saveBtn").hide();
        storeView = new wijmo.collections.CollectionView(result, {
		       pageSize: 50,
               trackChanges: true
		   });
		    
		   storeGridPager = new wijmo.input.CollectionViewNavigator('#storeGridPager', {
		        byPage: true,
		        headerFormat: '{currentPage:n0} / {pageCount:n0}',
		        cv: storeView
		    });

            var onoffYnMap = "N,Y".split(",");	//온/오프라인 콤보박스
		   
		   storeColumns = [
              { binding: 'storeidx', header: '인덱스', isReadOnly: true, width: 100 , align:"center"},
              { binding: 'cretTime', header: '작성일', isReadOnly: true, width: 150 , align:"center" },
              { binding: 'chTime', header: '수정일', isReadOnly: true, width: 150 , align:"center" },
		      { binding: 'goodStoreFlag', header: '대표가게표시', dataMap:onoffYnMap, width: 100 , align:"center" },
              { binding: 'storeName', header: '상호명', width: 150 , align:"center" },
              { binding: 'storeLocName', header: '지점명', width: 100 , align:"center" },
              { binding: 'firstTypeName', header: '상권업종대분류명', width: 120 , align:"center" },
              { binding: 'firstTypeCode', header: '대분류코드명', width: 100 , align:"center" },
              { binding: 'secondTypeName', header: '상권업종중분류명', width: 120 , align:"center" },
              { binding: 'secondTypeCode', header: '중분류코드명', width: 100 , align:"center" },
              { binding: 'thirdTypeName', header: '상권업종소분류명', width: 120 , align:"center" },
              { binding: 'sidoCode', header: '시도코드', width: 100 , align:"center" },
              { binding: 'sidoName', header: '시도명', width: 100 , align:"center" },
              { binding: 'sigugunCode', header: '시군구코드', width: 100 , align:"center" },
              { binding: 'sigugunName', header: '시군구명', width: 100 , align:"center" },
              { binding: 'clusterCode', header: '클러스터코드', width: 100 , align:"center" },
              { binding: 'clusterName', header: '클러스터명', width: 100 , align:"center" },
              { binding: 'hdongName', header: '행정동명', width: 100 , align:"center" },
              { binding: 'ldongName', header: '법정동명', width: 100 , align:"center" },
              { binding: 'storeAddress', header: '도로명주소', width: 200 , align:"center" },
              { binding: 'callNumber', header: '전화번호', width: 100 , align:"center" },
              { binding: 'storeInfo', header: '영업시간', width: 100 , align:"center", maxWidth: 200},
              { binding: 'latX', header: '위도', width: 100 , align:"center" },
              { binding: 'lngY', header: '경도', width: 100 , align:"center" },
              { binding: 'pictoFirstFloor', header: '일층', width: 100 , dataMap:onoffYnMap, align:"center" },
              { binding: 'pictoFirstFloorName', header: '일층', width: 100 , align:"center" },
              { binding: 'pictoRunway', header: '경사로', dataMap:onoffYnMap, width: 100 , align:"center" },
              { binding: 'pictoRunwayName', header: '경사로', width: 100 , align:"center" },
              { binding: 'pictoEntancesill', header: '입구턱', dataMap:onoffYnMap, width: 100 , align:"center" },
              { binding: 'pictoEntancesillName', header: '입구턱', width: 100 , align:"center" },
              { binding: 'pictoNotEntancesill', header: '입구무턱', dataMap:onoffYnMap, width: 100 , align:"center" },
              { binding: 'pictoNotEntancesillName', header: '입구무턱', width: 100 , align:"center" },
              { binding: 'pictoTable', header: '테이블석', dataMap:onoffYnMap, width: 100 , align:"center" },
              { binding: 'pictoTableName', header: '테이블석', width: 100 , align:"center" },
              { binding: 'pictoRestroomsill', header: '화장실턱', dataMap:onoffYnMap, width: 100 , align:"center" },
              { binding: 'pictoRestroomsillName', header: '화장실턱', width: 100 , align:"center" },
              { binding: 'pictoNotRestroomsill', header: '화장실무턱', dataMap:onoffYnMap, width: 100 , align:"center" },
              { binding: 'pictoNotRestroomsillName', header: '화장실무턱', width: 100 , align:"center" },
              { binding: 'pictoHandiRestroom', header: '장애인화장실', dataMap:onoffYnMap, width: 100 , align:"center" },
              { binding: 'pictoHandiRestroomName', header: '장애인화장실', width: 100 , align:"center" },
              { binding: 'pictoElvator', header: '엘리베이터', dataMap:onoffYnMap, width: 100 , align:"center" },
              { binding: 'pictoElvatorName', header: '엘리베이터', width: 100 , align:"center" },
              { binding: 'pictoParking', header: '주차장', dataMap:onoffYnMap, width: 100 , align:"center" },
              { binding: 'pictoParkingName', header: '주차장', width: 100 , align:"center" },
              { binding: 'pictoHandiParking', header: '장애인주차장', dataMap:onoffYnMap, width: 100 , align:"center" },
              { binding: 'pictoHandiParkingName', header: '장애인주차장', width: 100 , align:"center" },
              { binding: 'pictoTogo', header: '테이크아웃', dataMap:onoffYnMap, width: 100 , align:"center" },
              { binding: 'pictoTogoName', header: '테이크아웃', width: 100 , align:"center" },
              { binding: 'imgMain', header: '메인(썸네일)', dataMap:onoffYnMap, width: 100 , align:"center" },
              { binding: 'imgMainPath', header: '메인사진경로', width: 100 , dataType:'String', align:"center", maxWidth: 200},
              { binding: 'imgEnter', header: '입구', dataMap:onoffYnMap, width: 100 , align:"center" },
              { binding: 'imgEnterPath', header: '입구사진경로', width: 100 , dataType:'String', align:"center", maxWidth: 200},
              { binding: 'imgRunway', header: '경사로', dataMap:onoffYnMap, width: 100 , align:"center" },
              { binding: 'imgRunwayPath', header: '경사로사진경로', width: 100 , dataType:'String', align:"center", maxWidth: 200},
              { binding: 'imgInside', header: '내부', dataMap:onoffYnMap, width: 100 , align:"center" },
              { binding: 'imgInsidePath', header: '내부사진경로', width: 100 , dataType:'String', align:"center", maxWidth: 200},
              { binding: 'imgRestroom', header: '화장실', dataMap:onoffYnMap, width: 100 , align:"center" },
              { binding: 'imgRestroomPath', header: '화장실사진경로', width: 100 , dataType:'String', align:"center", maxWidth: 200},
              { binding: 'imgElvator', header: '엘리베이터', dataMap:onoffYnMap, width: 100 , align:"center" },
              { binding: 'imgElvatorPath', header: '엘베사진경로', width: 100 , dataType:'String', align:"center", maxWidth: 200},
              { binding: 'imgParking', header: '주차장', dataMap:onoffYnMap, width: 100 , align:"center" },
              { binding: 'imgParkingPath', header: '주차장사진경로', width: 100 , dataType:'String', align:"center", maxWidth: 200},
              { binding: 'imgStoreAll', header: '스토어크롤링사진', dataMap:onoffYnMap, width: 100 , align:"center" },
              { binding: 'imgStoreAllPath', header: '스토어크롤링사진경로', width: 100 , dataType:'String', align:"center", maxWidth: 200},
              { binding: 'activeFlag', header: '활성화', width: 100, dataMap:onoffYnMap, align:"center" },
              { binding: 'activeFlagClosingtime', header: '폐업일시', width: 100 , align:"center" },
              { binding: 'likeup', header: '좋아요수', width: 100, isReadOnly: true, align:"center" },
              { binding: 'addup', header: '즐겨찾기수', width: 100, isReadOnly: true, align:"center" },
              { binding: 'shareup', header: '공유수', width: 100, isReadOnly: true, align:"center" },
              { binding: 'readcnt', header: '조회수', width: 100, isReadOnly: true, align:"center"},
		    ];
		  
		   storeGrid = new wijmo.grid.FlexGrid('#storeGrid', {
			    autoGenerateColumns: false,
			    alternatingRowStep: 0,
			    columns: storeColumns,
			    itemsSource: storeView,
                keyActionEnter: "MoveDown",
                imeEnabled: true,
                //컬럼 길이 자동정렬 , 
                loadedRows: function(s, e) {
                    s.autoSizeColumns();
                    for (var i =0; i<s.rows.length; i++){
                        var row = s.rows[i];
                        var item = row.dataItem;
                        if(item.activeFlag == 'N') {
                            row.cssClass = 'change_dup';
                        }
                    }
                 },
                  cellEditEnded: function(s, e) {
                    s.autoSizeColumn(e.col);
                 },
                  rowEditEnded: function(s, e) {
                    s.autoSizeColumns();
                 },
                //행번호 표시하기
                itemFormatter: function(p, r, c, cell) {
                  if (p.cellType == wijmo.grid.CellType.RowHeader) {
                      //cell.textContent = (r+1).toString();
                      cell.textContent = (storeView.pageSize * storeView.pageIndex + r + 1).toString();
                    }
                //readOnly 셀컬러 넣기
                  if (p.cellType == wijmo.grid.CellType.Cell) {
                    if (this.columns[c].isReadOnly) {
                        wijmo.addClass(cell, 'read-only');
                        }
                    }
                }
			  });

              _setUserGridLayout('storeLayout', storeGrid, storeColumns);
            

        //엑셀 업로드용 그리드 
        excelGridPager = new wijmo.input.CollectionViewNavigator('#excelGridPager', {
            byPage: true,
            headerFormat: '{currentPage:n0} / {pageCount:n0}',
            cv: excelView
        });
        

        // hostElement에 Wijmo의 FlexGird 생성
        // itemsSource: data - CollectionView로 데이터를 그리드에 바인딩
        // autoGenerateColumns: false >> 컬럼 사용자 정의 
        excelGrid = new wijmo.grid.FlexGrid('#excelGrid', {
            autoGenerateColumns: false,
            alternatingRowStep: 0,
            columns : storeColumns,
            itemsSource: excelView,
            //위도 경도 있을시 색처리
            loadedRows: function(s, e) {           
                var item  = excelGrid.rows;
                var rows = [];
                var params;
                for(var i=0; i< item.length; i++){
                    params={
                        latX : excelGrid.collectionView.items[i].위도,
                        lngY : excelGrid.collectionView.items[i].경도
                    }
                    rows.push(params);
                }
                $.ajax({
                    url : "/store/dupCheckGrid",
                    async : false, // 비동기모드 : true, 동기식모드 : false
                    type : 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(rows),
                    success : function(result) {
                        dupResult = result;
                    },
                    error : function(request,status,error) {
                        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                    }
                    });
                for (var i =0; i<s.rows.length; i++){
                    var row = s.rows[i];
                    var item = row.dataItem;
                    for(j=0; dupResult.length > j; j++){
                        if(item.위도 == dupResult[i]) {
                            row.cssClass = 'change_dup';
                        }
                    }
                }
                $('#loading-image').hide();
             }
        });

         //행번호 표시하기
         excelGrid.itemFormatter = function (panel, r, c, cell) { 
            if (panel.cellType == wijmo.grid.CellType.RowHeader) {
                cell.textContent = (r + 1).toString();
            }
        };
        // 체크박스 생성
        excelSelector = new wijmo.grid.selector.Selector(excelGrid, {
            itemChecked: () => {
            }
        });
        excelSelector.column = excelGrid.columns[0];
	  }else{
          storeView = new wijmo.collections.CollectionView(result, {
		       pageSize: 50,
               trackChanges: true
		   });
		  storeGridPager.cv = storeView;
		  storeGrid.itemsSource = storeView;
	  }

	  
	  refreshPaging(storeGrid.collectionView.totalItemCount, 1, storeGrid, 'storeGrid');  // 페이징 초기 셋팅
	  
}

//가게 리스트 조회
function getStoreList(){
    $("#excelDiv").hide();
    $("#saveBtn").hide();
    $("#btn_save").show();
    $("#btn_add").show();
    $("#btn_remove").show();
    $("#storeDiv").show();
    $('#loading-image').show();
    var param = {
		con 	: $('#con').val()
		, inq 	: $('#inq').val()
	};
	
	$.ajax({
        type : 'POST',
        url : '/store/getStoreList',
        dataType : null,
        data : param,
        success : function(result) {
        	console.log("getStoreList success");
        	loadGridStoreList('search', result);
            $('#loading-image').hide();
        },
        error: function(request, status, error) {
        	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

        }
    }); 
}

//엑셀 다운로드
function exportStoreExcel(){
	
	var gridView = storeGrid.collectionView;
	var oldPgSize = gridView.pageSize;
	var oldPgIndex = gridView.pageIndex;

    //전체 데이터를 엑셀다운받기 위해서는 페이징 제거 > 엑셀 다운 > 페이징 재적용 하여야 함.
    storeGrid.beginUpdate();
    storeView.pageSize = 0;

    wijmo.grid.xlsx.FlexGridXlsxConverter.saveAsync(storeGrid, {includeCellStyles: true, includeColumnHeaders: true}, '가게리스트.xlsx',
	      saved => {
	    	gridView.pageSize = oldPgSize;
	    	gridView.moveToPage(oldPgIndex);
	    	storeGrid.endUpdate();
	      }, null
	 );
}

//업로드 파일 찾기
function findFile(){
    $("#importFile").val("");
    document.all,importFile.click();
}

//엑셀 업로드
function importExcel(){
    $("#storeDiv").hide();
    $("#btn_save").hide();
    $("#btn_add").hide();
    $("#btn_remove").hide();
    $("#saveBtn").show();
    $('#loading-image').show();

    storeView = new wijmo.collections.CollectionView(null, {
            pageSize: 100
    });
    $("#excelDiv").show();
        var inputEle =  document.querySelector('#importFile');
        if (inputEle.files[0]) {
            wijmo.grid.xlsx.FlexGridXlsxConverter.loadAsync(excelGrid, inputEle.files[0],{includeColumnHeaders: true}, (w) => {
                // 데이터 바인딩할 함수 호출
                bindImportedDataIntoModel()
                excelGrid.columns.forEach(col => {
                col.width = 300,
                col.align = "center"
                })
            });
        }
         // 체크박스 생성
         excelSelector = new wijmo.grid.selector.Selector(excelGrid);
         excelSelector.column = excelGrid.columns[0];
}

function bindImportedDataIntoModel() {
    const newData = (getImportedCVData());
    excelGrid.columns.clear();
    data = new wijmo.collections.CollectionView(newData);
    excelGrid.autoGenerateColumns = true;
    excelGrid.itemsSource = data;
}

function getImportedCVData() {
    const arr = [];
    let nullRow = true;
    for (let row = 0; row < excelGrid.rows.length; row++) {
        const item = {};
        for (let column = 0; column < excelGrid.columns.length; column++) {
            const cellValue = excelGrid.getCellData(row, column, false);
            //병합된 헤더 처리 
            // let header = grid.columns[column].header ? grid.columns[column].header : grid.columns[column - 1].header + '-2';
        // 만약 열 헤더가 있으면
            if (excelGrid.columns[column].header){
            var header =  excelGrid.columns[column].header
            } else{
    //           만약 열 헤더가 없으면 본래 병합된 값으로 판단
                for(var i = column-1; i >= 0; i--){
                    if (excelGrid.columns[i].header){
                        var header =  excelGrid.columns[i].header + " - "+column+" index"
                        break;
                    }
                }
            }
        var binding = _convertHeaderToBinding(header);
        item[binding] = cellValue;
        }
      arr.push(item);
    }
    return arr;
}

function _convertHeaderToBinding(header) {
    return header.replace(/\s/, '').toLowerCase();
}

//엑셀 업로드 저장
function saveGrid(){
    if(confirm("저장 하시겠습니까?\n데이터가 많을시 시간이 지연 될수있습니다.")){
        $('#loading-image').show();
        var item  = excelGrid.rows;
        var rows = []; 
        var params;
            for(var i=0; i< item.length; i++){
                params={
                    goodStoreFlag : excelGrid.collectionView.items[i].대표가게표시,
                    storeName : excelGrid.collectionView.items[i].상호명,
                    storeLocName : excelGrid.collectionView.items[i].지점명,
                    firstTypeName : excelGrid.collectionView.items[i].상권업종대분류명,
                    firstTypeCode : excelGrid.collectionView.items[i].대분류코드명,
                    secondTypeName : excelGrid.collectionView.items[i].상권업종중분류명,
                    secondTypeCode : excelGrid.collectionView.items[i].중분류코드명,
                    thirdTypeName : excelGrid.collectionView.items[i].상권업종소분류명,
                    sidoCode : excelGrid.collectionView.items[i].시도코드,
                    sidoName : excelGrid.collectionView.items[i].시도명,
                    sigugunCode : excelGrid.collectionView.items[i].시군구코드,
                    sigugunName : excelGrid.collectionView.items[i].시군구명,
                    clusterCode : excelGrid.collectionView.items[i].클러스터코드,
                    clusterName : excelGrid.collectionView.items[i].클러스터명,
                    hdongName : excelGrid.collectionView.items[i].행정동명,
                    ldongName : excelGrid.collectionView.items[i].법정동명,
                    storeAddress : excelGrid.collectionView.items[i].도로명주소,
                    callNumber : excelGrid.collectionView.items[i].전화번호,
                    storeInfo : excelGrid.collectionView.items[i].영업시간,
                    latX : excelGrid.collectionView.items[i].위도,
                    lngY : excelGrid.collectionView.items[i].경도,
                    pictoFirstFloor : excelGrid.collectionView.items[i].일층yn,
                    pictoFirstFloorName : excelGrid.collectionView.items[i].일층,
                    pictoRunway : excelGrid.collectionView.items[i].경사로yn,
                    pictoRunwayName : excelGrid.collectionView.items[i].경사로,
                    pictoEntancesill : excelGrid.collectionView.items[i].입구턱yn,
                    pictoEntancesillName : excelGrid.collectionView.items[i].입구턱,
                    pictoNotEntancesill : excelGrid.collectionView.items[i].입구무턱yn,
                    pictoNotEntancesillName : excelGrid.collectionView.items[i].입구무턱,
                    pictoTable : excelGrid.collectionView.items[i].테이블석yn,
                    pictoTableName : excelGrid.collectionView.items[i].테이블석,
                    pictoRestroomsill : excelGrid.collectionView.items[i].화장실턱yn,
                    pictoRestroomsillName : excelGrid.collectionView.items[i].화장실턱,
                    pictoNotRestroomsill : excelGrid.collectionView.items[i].화장실무턱yn,
                    pictoNotRestroomsillName : excelGrid.collectionView.items[i].화장실무턱,
                    pictoHandiRestroom : excelGrid.collectionView.items[i].장애인화장실yn,
                    pictoHandiRestroomName : excelGrid.collectionView.items[i].장애인화장실,
                    pictoElvator : excelGrid.collectionView.items[i].엘리베이터yn,
                    pictoElvatorName : excelGrid.collectionView.items[i].엘리베이터,
                    pictoParking : excelGrid.collectionView.items[i].주차장yn,
                    pictoParkingName : excelGrid.collectionView.items[i].주차장,
                    pictoHandiParking : excelGrid.collectionView.items[i].장애인주차장yn,
                    pictoHandiParkingName : excelGrid.collectionView.items[i].장애인주차장,
                    pictoTogo : excelGrid.collectionView.items[i].테이크아웃yn,
                    pictoTogoName : excelGrid.collectionView.items[i].테이크아웃,
                    imgMain : excelGrid.collectionView.items[i].메인사진,
                    imgMainPath : excelGrid.collectionView.items[i].메인사진경로,
                    imgEnter : excelGrid.collectionView.items[i].입구사진,
                    imgEnterPath : excelGrid.collectionView.items[i].입구사진경로,
                    imgRunway : excelGrid.collectionView.items[i].경사로사진,
                    imgRunwayPath : excelGrid.collectionView.items[i].경사로사진경로,
                    imgInside : excelGrid.collectionView.items[i].내부사진,
                    imgInsidePath : excelGrid.collectionView.items[i].내부사진경로,
                    imgRestroom : excelGrid.collectionView.items[i].화장실사진,
                    imgRestroomPath : excelGrid.collectionView.items[i].화장실사진경로,
                    imgElvator : excelGrid.collectionView.items[i].엘리베이터사진,
                    imgElvatorPath : excelGrid.collectionView.items[i].엘베사진경로,
                    imgParking : excelGrid.collectionView.items[i].주차장사진,
                    imgParkingPath : excelGrid.collectionView.items[i].주차장사진경로,
                    imgStoreAll : excelGrid.collectionView.items[i].스토어크롤링사진,
                    imgStoreAllPath : excelGrid.collectionView.items[i].스토어크롤링사진경로,
                    activeFlag : excelGrid.collectionView.items[i].활성화,
                }
                rows.push(params);
            }     
        $.ajax({
            url : "/store/saveStoreList",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            contentType: 'application/json',
            data: JSON.stringify(rows),
            success : function(result) {
                debugger;
                alert("저장되었습니다.");              
                getStoreList();
                //$('#loading-image').hide();
            },
            error : function(request,status,error) {
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
            });
    }
}

$(document.body).ready(function() {
    $("#importFile").on('change', function (params) {
        importExcel();
    });   
    loadGridStoreList('init');  	//그리드 초기화
    $('#data').addClass("current");
    $('#store').addClass("current");
    document.addEventListener('keydown', enterkey);
});
