//var flexGridFilter;

var commonGridInit = function(flexGrid, cv ,filter) {

	flexGrid.itemsSource = cv;
	//flexGrid.allowAddNew = true; 					//행추가 
	flexGrid.deletedRow = true;						//행삭제
	flexGrid.autoGenerateColumns = false;			//컬럼명자동화
	flexGrid.keyActionEnter = "MoveDown"  			//엔터키액션 (None, MoveDown,MoveAcross,Cycle,CycleOut)
	flexGrid.keyActionTab = "CycleOut";  			//탭키액션 (None, MoveDown, MoveAcross,Cycle,CycleOut)
	flexGrid.allowPinning = 2; 						//고정클립 (0없음, 1컬럼하나,2컬럼범위, 3모두)
	flexGrid.allowSorting = 2; 						//멀티정렬 (0없음, 1컬럼하나,2컬럼범위, 3모두)
	flexGrid.isReadOnly = false;					//그리드 전체 readonly
	flexGrid.columnHeaders.rows.defaultSize = 30; 	// 열 헤더 영역에 행의 높이 설정
	flexGrid.imeEnabled = true; 	                     //한글입력기 사용
	//flexGrid.rows.defaultSize = 50;					// 스크롤 가능한 영역에 행의 높이 설정

	//엑셀처럼 하나의 컬럼헤드 선택시 전체 선택을 요할경우
	/*
	flexGrid.allowSorting= 0;
	flexGrid.allowDragging= false; 			//컬럼헤드를 잡고 드레그 하면 이동가능
	flexGrid.selectionMode= "MultiRange";
	*/

	//footer 활성화
	//그리드 필드옵션에 aggregate: 'Sum' 추가하면 자동으로 footer에 합계 산출됨.
	/*
	flexGrid.columnFooters.rows.push(new wijmo.grid.GroupRow());
	flexGrid.bottomLeftCells.setCellData(0, 0, '\u03A3');
	//flexGrid.columnFooters.setCellData(0,1, 567);  //풋터에 강제로 값넣기
	*/

	/** 자동 row height 설정 ==> 필드옵션에 "wordWrap: true" 있는것만 작동함.  */
	/** 아래 내용은 컬럼이 내용이 수정될때 데이터 수가 많을경우 시간이 오래걸리는데 비동기 방식으로 화면이 보여질때 리사이징하여 속도를 개선시킴 */
	/** 그리드 내용이 많지 않을때는 autoRowHeights= true 만사용해도 됨. */

	flexGrid.loadedRows.addHandler(function(s, e) {
		autoSizeRowsAsync(s);
	});

	// auto-size all rows when a wrapping column is resized
	flexGrid.resizedColumn.addHandler(function(s, e) {
		if (s.columns[e.col].wordWrap) {
			autoSizeRowsAsync(s);
		}
	});

	// auto-size a single row when a wrapping cell is edited
	flexGrid.cellEditEnded.addHandler(function(s, e) {
		if (s.columns[e.col].wordWrap) {
			autoSizeRowsAsync(s, e.row);
		}
	});

	// autosize rows within view that haven't been autosized yet
/*	flexGrid.scrollPositionChanged.addHandler(function(s, e) {
		if (flexGrid.rows.length > 0) {
			var vr = s.viewRange;
			for (var r = vr.topRow; r <= vr.bottomRow; r++) {
				if (s.rows[r].height == null) {
					s.autoSizeRows(r, r);
				}
			}
		}
	});
*/
	//row heaer에 순번 붙이기
	flexGrid.itemFormatter = function(p, r, c, cell) {
		
		if (p.cellType == wijmo.grid.CellType.RowHeader) {
			//cell.textContent = (r+1).toString();
			cell.textContent = (cv.pageSize * cv.pageIndex + r + 1).toString();
		}
		
		//readOnly 셀컬러 넣기
		
		if (p.cellType == wijmo.grid.CellType.Cell) {
			if (this.columns[c].isReadOnly) {
				wijmo.addClass(cell, 'read-only');
			}
		}
		
	}

	/**
	  탭키 클릭시 reayonly 건너뛰기 이벤트
	*/
	flexGrid.hostElement.addEventListener("keydown", function(e) {
		if (e.keyCode == 9) {
			//탭키 클릭시 이동될 row,col
			var row = flexGrid.selection.row;
			var col = flexGrid.selection.col;
			var moveCol = 0;

			//이동될 컬럼부터 마지막 컬럼까지 readonly 된내역확인
			for (var ii = col; ii < flexGrid.columns.length; ii++) {
				if (!flexGrid.columns[ii].isReadOnly) {
					moveCol = ii;
					break;
				}
			}
			//컬럼끝까지 readOnly컬럼이 없다면 다음칸으로 이동
			if (moveCol === 0) row++;

			flexGrid.select(new wijmo.grid.CellRange(row, moveCol), true);

		}

	});

	
	/**
	셀 병합후 가운데정렬
	*/
	flexGrid.formatItem.addHandler(function(s, e) {
		//cell 부분 Valign 정렬
		if (e.cell.children.length == 0) {
			e.cell.innerHTML = '<div>' + e.cell.innerHTML + '</div>';
			wijmo.setCss(e.cell, {
				display: 'table',
				tableLayout: 'fixed'
			});
			wijmo.setCss(e.cell.children[0], {
				display: 'table-cell',
				//textAlign: 'center',
				verticalAlign: 'middle'
			});
		}

		// header 부분 Valign 정렬
		if(e.panel == s.columnHeaders && e.range.rowSpan > 1){
			var html = e.cell.innerHTML;
			e.cell.innerHTML = "<div class='v-center'>"+html+"</div>";
		}
		/*
		if (e.panel == s.columnHeaders && e.range.rowSpan > 1) {
			e.cell.innerHTML = '<div>' + e.cell.innerHTML + '</div>';
			wijmo.setCss(e.cell.children[0], {
				position: 'relative',
				top: '50%',
				transform: 'translateY(-50%)',

			});
		}
		*/
	});
	
	

	//필터기능 활성화
	
	flexGridFilter = new wijmo.grid.filter.FlexGridFilter(flexGrid);
	
	if(filter==false){
		flexGridFilter.filterColumns = [];
	}
	

	//그리드의 변경된 데이터 추적을 활성화
	cv.trackChanges = true;

	///페이징 html 페이지에서 <div id='thePager'></div> 코드를 페이징해야될 자리에 추가해야함.	
	 cv.pageSize = 100;
	 new wijmo.input.CollectionViewNavigator('#wijmoGridPager', {
	 	byPage: true,
	 	headerFormat: 'Page {currentPage:n0} of {pageCount:n0}',
	 	cv: cv
	 });
	
};


/**
	그리드 row height 자동크기조절
 */
function autoSizeRowsAsync(grid, rowIndex) {

	if (rowIndex != null) {
		grid.rows[rowIndex].height = null;
	} else {
		grid.rows.forEach(function(row) {
			row.height = null;
		});
	}
	setTimeout(function() {
		grid.onScrollPositionChanged();
	})
}



/** 
 * 확대
 * grid : 그리드 div
 * flexGrid : 그리드 객체변수
 */
var zoomIn = function($grid, flexGrid) {

	if (zoomSize > 17) return;
	zoomSize++;

	var headerSize = zoomSize - 11;
	if (headerSize < 0) headerSize = headerSize * -1;

	$grid.css("font-size", zoomSize + "pt");
	flexGrid.collectionView.refresh();
	flexGrid.columnHeaders.rows.defaultSize = flexGrid.columnHeaders.rows.defaultSize + (headerSize / 2); 	// 열 헤더 영역에 행의 높이 설정

}

/**
 * 축소
 */
var zoomOut = function($grid, flexGrid) {
	if (zoomSize < 6) return;
	zoomSize--;

	var headerSize = zoomSize - 11;
	if (headerSize < 0) headerSize = headerSize * -1;

	$grid.css("font-size", zoomSize + "pt");
	flexGrid.collectionView.refresh();
	flexGrid.columnHeaders.rows.defaultSize = flexGrid.columnHeaders.rows.defaultSize - (headerSize / 2); 	// 열 헤더 영역에 행의 높이 설정

}

/**
 * 엑셀변환
 */
var transExcel = function(flexGrid, fileName) {

	wijmo.grid.xlsx.FlexGridXlsxConverter.saveAsync(flexGrid,
		{ includeColumnHeaders: true, includeRowHeaders: true },
		fileName,
		function(base64) {
			// user can access the base64 string in this callback.
			document.getElementById('importFile').href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' + 'base64,' + base64;
			//console.log(base64);
		},
		function(reason) {
			//User can catch the failure reason in this callback.
			console.log('The reason of save failure is ' + reason);
		}
	);

}

/**
 * 에러행 표시
 * flexGrid : 그리드명 => 두개이상 그리드가 사용될수있기때문에 그리드명 받아야함.
 * rownum : 라인번호
 */
var addErrorLineColor = function(flexGrid, rownum) {
	flexGrid.rows[rownum].cssClass = 'redRow';
	flexGrid.select(new wijmo.grid.CellRange(rownum, 0), true);
}

var removeErrorLineColor = function(flexGrid, rownum) {
	flexGrid.rows[1].cssClass = " ";
}


var commonGrid = function() {

	return {
		//grid가 두개이상 사용될수도 있기때문에 grid객체와 컬렉션뷰 객체를 받아서 초기화함.
		init: function(flexGrid, cv, filter) {
			commonGridInit(flexGrid, cv, filter);
		}
	};
}();	


//페이지 클릭이벤트 
function clickPager(idx, grid, gridId) {
    grid.collectionView.moveToPage(idx - 1); // 그리드 0부터 시작
    refreshPaging(grid.collectionView.totalItemCount, idx, grid, gridId); // 그리드의 전체 아이템 수, 클릭한 인덱스 값 넘겨주기
}

//페이징 html 셋팅
function refreshPaging(totalData, currentPage, grid, gridId) {
    //페이지 사이즈
    const dataPerPage = grid.collectionView.pageSize; // 그리드의 한 페이지당 보여지는 행의 개수
    // 페이지 숫자 목록
    const pageCount = 5;
    //전체 페이지
    const totalPage = Math.ceil(totalData / dataPerPage);
    //페이지그룹 
    const pageGroup = Math.ceil(currentPage / pageCount);

    let last = pageGroup * pageCount; // 가장 마지막 인덱스

    if (last > totalPage) {
        last = totalPage;
    }

    let first = last - (pageCount - 1);

    const next = last + 1; // 다음
    var prev = first - 1; // 이전

    if (totalPage < 1) {
        first = last;
    }

    const pages = $('#' + gridId + 'Pager');
    pages.empty();

    // <<  < 
    pages.append('<span onClick="clickPager(1, ' + gridId + ', ' + "'" + gridId + "'" + ')" > << </span>');
    if (first > pageCount) {
        pages.append('<span onClick="clickPager(' + prev + ', ' + gridId + ', ' + "'" + gridId + "'" + ')" > ' + '<' + ' </span>');
    } else {
        pages.append('<span onClick="clickPager(1, ' + gridId + ', ' + "'" + gridId + "'" + ')" > ' + '<' + ' </span>');
    }

    // 현재 페이지 인덱스 만큼 append
    for (let j = first; j <= last; j++) {
        if (currentPage === j) {
            pages.append('<span class="selectPage" id="' + gridId + 'paging_' + j + '" onClick="clickPager(' + j + ', ' + gridId + ', ' + "'" + gridId + "'" + ')" > ' + j + ' </span>');

        } else if (j > 0) {
            pages.append('<span id="' + gridId + 'paging_' + j + '" onClick="clickPager(' + j + ', ' + gridId + ', ' + "'" + gridId + "'" + ')" > ' + j + ' </span>');

        }
    }

    // >  >>
    if (next > pageCount && next < totalPage) {
        pages.append('<span onClick="clickPager(' + next + ', ' + gridId + ', ' + "'" + gridId + "'" + ')" >  ' + '>' + ' </span>');
    } else {
        pages.append('<span onClick="clickPager(' + totalPage + ', ' + gridId + ', ' + "'" + gridId + "'" + ')" >  ' + '>' + ' </span>');
    }
    pages.append('<span onClick="clickPager(' + totalPage + ', ' + gridId + ', ' + "'" + gridId + "'" + ')" > >> </span>');


    $(".pager").removeClass('wj-control wj-content wj-pager wj-collectionview-navigator wj-state-empty wj-state-readonly');
}

//그리드 레이아웃 저장
function _getUserGridLayout(layoutId){
	localStorage.setItem(layoutId, staffGrid.columnLayout);
}

//그리드 레이아웃 복원
function _setUserGridLayout(layoutId){
	var layout = localStorage.getItem(layoutId);
    if (layout) {
    	staffGrid.columnLayout = layout;
    }
}

//그리드 초기 레이아웃 복원
function _resetUserGridLayout(initLayoutId, layoutId){
	var layout = localStorage.getItem(initLayoutId);
    if (layout) {
    	staffGrid.columnLayout = layout;
    }
    
    localStorage.setItem(layoutId, staffGrid.columnLayout);
}
