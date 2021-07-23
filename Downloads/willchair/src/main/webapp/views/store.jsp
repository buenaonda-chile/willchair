<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <%@ include file="header.jsp" %>
    <script>
    //    $(function(){
    //     $('.popup_trigger').on('click',function(e){
    //         $('#popup').fadeIn(350);
    //         e.preventDefault();
    //     });
    //     $('.popup_close').on('click',function(e){
    //         $('#popup').fadeOut(350);
    //         e.preventDefault();
    //     });
    //    });
    //엑셀 양식 다운로드
    function downTemplate(){
        window.location.assign("<%=request.getContextPath()%>" + "/template/가게관리양식.xlsx");
    }
    function enterkey() {
    if (window.event.keyCode == 13) {
    	getStoreList();
    }}
    </script>
</head>
<body>
    <div id="loading-image" style="position: absolute; z-index:100; display: none; top:40%; left:50%;">
    <img src="../image/mask.gif">
    </div>
    <div class="main_wrap">
        <%@ include file="nav.jsp" %>
        <div class="main_container">
            <section class="main_section">
                <h2 class="main_title">가게 관리</h2>
                <div class="main_summary">
                    <dl>
                        <dt>활성화 음식점수</dt>
                        <dd id="totalRestaurant"><%=request.getAttribute("totalRestaurant")%></dd>
                    </dl>
                    <dl>
                        <dt>비활성화 음식점수</dt>
                        <dd id="totalRestaurantN"><%=request.getAttribute("totalRestaurantN")%></dd>
                    </dl>
                    <dl>
                        <dt>활성화 카페수</dt>
                        <dd id="totalCafe"><%=request.getAttribute("totalCafe")%></dd>
                    </dl>
                     <dl>
                        <dt>비활성화 카페수</dt>
                        <dd id="totalCafeN"><%=request.getAttribute("totalCafeN")%></dd>
                    </dl>
                </div>
                <div class="main_utility">
                    <div class="btn_wrap">
                        <button class="btn" id="excelTemplate" name = "excelTemplate" onclick="downTemplate();">엑셀 템플릿</button>
                        <input type="file" class="form-control" style="display:none" id="importFile" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel.sheet.macroEnabled.12" />
                        <button class="btn" id="importExcel" name = "importExcel" onClick="findFile();">엑셀 업로드</button>
                        <button class="btn" id="exportExcel" name = "exportExcel" onClick="exportStoreExcel();">엑셀 다운로드</button>
                    </div>
                </div>
                    <div class="main_content">
                        <!-- 필터 영역 admin_filter-->
                        <div class="main_filter">
                            <form action="#" id="search_form" name="search_form">
                                <label for="con">검색조건</label>
                                <select name="con" id="con">
                                    <option value="all" selected="selected">전체</option>
                                    <option value="name">상호명</option>
                                    <option value="sido">시도명</option>
                                    <option value="type">상권업종대분류명</option>
                                </select>
                                <label for="inq"></label>
                                <input type="text" id="inq" placeholder=",로 다중검색 가능">
                                <button type="button" class="btn att" onKeyDown="enterkey()" onClick="getStoreList();">조회</button>
                            </form>
                        </div>
                        <!-- 보드 영역 admin_dashboard-->
                        <div class="main_dashboard">
                            <div class="sub_cont">
                                <div class="btn_wrap">
                            <div class="btn_wrap">
                                <button type="button" class="btn" id="btn_add" onClick="addStore();">추가</button>
                                <button type="button" class="btn" id="btn_remove" onClick="removeStore();">삭제</button>
                                <button type="button" class="btn" id="btn_save" onClick="saveStore();">저장</button>
                                <button type="button" class="btn" id="saveBtn" onClick="saveGrid();">저장</button>
                                <button type="button" class="btn stroke" onClick="_getUserGridLayout('storeLayout', storeGrid);">칼럼위치저장</button>
                                <button type="button" class="btn stroke" onClick="_resetUserGridLayout('storeLayout', storeGrid, storeColumns);">칼럼초기화</button>
                            </div>
                                </div>
                            </div>
                            <div class="grid_wrap" id="storeDiv" style="position:relative;">
                                <div id="storeGrid" style="height:500px;"></div>
                                <div id="storeGridPager" class="pager"></div>
                            </div>
                            <div class="grid_wrap" id="excelDiv">
                        	    <div id="excelGrid"  style="height:500px;"></div>
                        	    <div id="excelGridPager" class="pager"></div>
                            </div>
                            <div class="sub_cont">
                                <div class="btn_wrap">
                            <div class="btn_wrap">
                                <button type="button" class="btn stroke" onClick="_getUserGridLayout('storeLayout', storeGrid);">칼럼위치저장</button>
                                <button type="button" class="btn stroke" onClick="_resetUserGridLayout('storeLayout', storeGrid, storeColumns);">칼럼초기화</button>
                            </div>
                                </div>
                            </div>
                        </div>
                    </div>  
            </section>
        </div>
    </div>
    <script type="text/javascript">
        $.getScript('/js/store/store001.js');
    </script>
</body>
</html>