/*
 *  공통 javaScript
 */

var _logOut = function() {
    if (confirm("로그아웃 하시겠습니까??") == true) {
        location.href = "/logout";
    }
}

//그리드 레이아웃 저장
function _getUserGridLayout(layoutId, grid) {
    alert("컬럼위치를 저장하였습니다.");
    localStorage.setItem(layoutId, grid.columnLayout);
}    

//그리드 레이아웃 복원
function _setUserGridLayout(layoutId, grid, initColumns) {
    /*  // 주석 소스처럼 진행하여도 컬럼위치는 복원되나, cellTemplate 설정이 저장되지않음. 
    	var layout = localStorage.getItem(layoutId);
        if (layout) {
        	grid.columnLayout = layout;
        }
    */

    if (window.localStorage[layoutId]) {
        let columnsArr = JSON.parse(window.localStorage[layoutId]).columns;

        grid.columns.clear();
        columnsArr.forEach((col) => {
            initColumns.forEach((col2) => {
                if (col.binding == col2.binding) {
                    grid.columns.push(new wijmo.grid.Column(col2));
                }
            });
        });
    }
}

//그리드 초기 레이아웃 복원
function _resetUserGridLayout(layoutId, grid, initColumns) {

    grid.columns.clear();
    initColumns.forEach((col) => {
        grid.columns.push(new wijmo.grid.Column(col));
    });

    localStorage.setItem(layoutId, grid.columnLayout);
    alert("컬컴위치를 초기화하였습니다.");
    _setUserGridLayout(layoutId, grid, initColumns);
}

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


