<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <%@ include file="header.jsp" %>
    <%-- <script>
       $(function(){
        $('.popup_trigger').on('click',function(e){
            $('#popup').fadeIn(350);
            e.preventDefault();
        });
        $('.popup_close').on('click',function(e){
            $('#popup').fadeOut(350);
            e.preventDefault();
        });
       });
    </script> --%>
</head>
<body>
    <div class="main_wrap">
        <aside class="main_sidebar">
            <h1 class="logo logo_s">로고</h1>
            <ul class="main_nav">
                <li>
                    <a href="building.html" class="dept1 client current">메인메뉴</a>
                    <ul class="dept2">
                        <li><a href="building.html" class="current">서브메뉴</a></li>
                        <li><a href="staff.html">서브메뉴</a></li>
                    </ul>
                </li>
                <li><a href="daily.html" class="dept1 daily">메인메뉴</a></li>
                <li>
                    <a href="stock_code.html" class="dept1 stuck">메인메뉴</a>
                    <ul class="dept2">
                        <li><a href="stock_code.html">서브메뉴</a></li>
                        <li><a href="stock_stock.html">서브메뉴</a></li>
                    </ul>
                </li>
                <li>
                    <a href="calculate_process.html" class="dept1 calculate ">메인메뉴</a>
                    <ul class="dept2">
                        <li><a href="calculate_process.html" >서브메뉴</a></li>
                        <li><a href="calculate_history.html">서브메뉴</a></li>
                    </ul>
                </li>
                <li>
                    <a href="income.html" class="dept1 manage">메인메뉴</a>
                </li>
            </ul>
            <div class="terms_area">
                <a href="#">이용약관</a>
                <a href="#">개인정보수집약관</a>
            </div>
            <a href="#" class="main_out">로그아웃</a>
        </aside>
        <div class="main_container">
            <section class="main_section">
                <h2 class="main_title">메인 타이틀</h2>
                <div class="main_summary">
                    <dl>
                        <dt>직원수</dt>
                        <dd id="totalUser"><%=request.getAttribute("totalUser")%>명</dd>
                    </dl>
                    <dl>
                        <dt>관리자수</dt>
                        <dd id="totalAdmin"><%=request.getAttribute("totalAdmin")%>명</dd>
                    </dl>
                    <!-- 클릭시 직원추가 팝업창 띄움 -->
                    <a href="javascript:void(0);" onclick="showPop('new_user');" class="popup_trigger">직원추가</a>
                </div>
                <div class="main_utility">
                    <div class="btn_wrap">
                        <button class="btn" onClick="exportExcel();">엑셀 다운로드</button>
                    </div>
                </div>
                <div id="theTabPanel">
                    <div>  
                        <a>직원관리</a>             
                        <div class="main_content">
                            <!-- 필터 영역 admin_filter-->
                            <div class="main_filter">
                                <form action="#" id="search_form" name="search_form">
                                    <label for="con">검색조건</label>
                                    <select name="con" id="con">
                                        <option value="all" selected="selected">전체</option>
                                        <option value="name">이름</option>
                                        <option value="id">아이디</option>
                                        <option value="mail">이메일</option>
                                    </select>
                                    <label for="inq"></label>
                                    <input type="text" id="inq" placeholder=",로 다중검색 가능">
                                    <button type="button" class="btn att" onClick="getUserList();">조회</button>
                                </form>
                            </div>
                            <!-- 보드 영역 admin_dashboard-->
                            <div class="main_dashboard">
                                <div class="sub_cont">
                                    <div class="btn_wrap">
                                <div class="btn_wrap">
                                    <button type="button" class="stroke" onClick="_getUserGridLayout('staffLayout');">칼럼위치저장</button>
                                    <button type="button" class="stroke" onClick="_resetUserGridLayout('staffInitLayout', 'staffLayout');">칼럼초기화</button>
                                </div>
                                    </div>
                                </div>
                                    <div id="flexGrid" style="height:500px;"></div>
                                    <a href="javascript:zoomIn($('#flexGrid'),flexGrid);">확대</a>
                                    <a href="javascript:zoomOut($('#flexGrid'),flexGrid);">축소</a>
                                <div class="sub_cont">
                                    <div class="btn_wrap">
                                <div class="btn_wrap">
                                    <button type="button" class="stroke" onClick="_getUserGridLayout('staffLayout');">칼럼위치저장</button>
                                    <button type="button" class="stroke" onClick="_resetUserGridLayout('staffInitLayout', 'staffLayout');">칼럼초기화</button>
                                </div>
                                </div>
                                <div id='wijmoGridPager'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>  
                        <a>회원관리</a>             
                        <div class="main_content">
                            <!-- 필터 영역 admin_filter-->
                            <div class="main_filter">
                                <form action="#" id="search_form" name="search_form">
                                    <label for="con">검색조건</label>
                                    <select name="con" id="con">
                                        <option value="all" selected="selected">전체</option>
                                        <option value="name">이름</option>
                                        <option value="id">아이디</option>
                                        <option value="mail">이메일</option>
                                    </select>
                                    <label for="inq"></label>
                                    <input type="text" id="inq" placeholder=",로 다중검색 가능">
                                    <button type="button" class="btn att" onClick="">조회</button>
                                </form>
                            </div>
                            <!-- 보드 영역 admin_dashboard-->
                            <div class="main_dashboard">
                                <div class="sub_cont">
                                    <div class="btn_wrap">
                                <div class="btn_wrap">
                                    <button type="button" class="stroke" onClick="_getUserGridLayout('staffLayout');">칼럼위치저장</button>
                                    <button type="button" class="stroke" onClick="_resetUserGridLayout('staffInitLayout', 'staffLayout');">칼럼초기화</button>
                                </div>
                                    </div>
                                </div>
                                    <div id="userGrid" style="height:500px;"></div>
                                    <a href="javascript:zoomIn($('#flexGrid'),flexGrid);">확대</a>
                                    <a href="javascript:zoomOut($('#flexGrid'),flexGrid);">축소</a>
                                <div class="sub_cont">
                                    <div class="btn_wrap">
                                <div class="btn_wrap">
                                    <button type="button" class="stroke" onClick="_getUserGridLayout('staffLayout');">칼럼위치저장</button>
                                    <button type="button" class="stroke" onClick="_resetUserGridLayout('staffInitLayout', 'staffLayout');">칼럼초기화</button>
                                </div>
                                </div>
                                <div id='wijmoGridPager'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
    <!-- 팝업 -->
    <div class="popup" id="new_user">
        <div class="popup_container">
            <div class="popup_head">
                <p class="popup_title">직원추가</p>
                <button type="button" class="popup_close" onClick="closePop();">x</button>
            </div>
            <div class="popup_inner">
                <dfn>필수항목 *</dfn>
                <form id="newUserForm">
                    <div class="row">
                        <label for="id">ID<i>*</i></label>
                        <input type="text" id="id" name="id" required onchange="dupCheckIdFlag = false;">
                        <button type="button" class="popup_btn att" onClick="dupCheckId();">중복확인</button>
                    </div>
                    <div class="row">
                        <label for="password">PW<i>*</i></label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <div class="row">
                        <label for="name">이름<i>*</i></label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="row">
                        <label for="telPhone">전화번호<i>*</i></label>
                        <input type="text" id="telPhone" name="telPhone" required>
                    </div>
                    <div class="row">
                        <label for="mail">이메일<i>*</i></label>
                        <input type="text" id="mail" name="downPay" required>
                    </div>
                    <div class="row">
                        <label for="memo" style="vertical-align:top;">메모</label>
                        <textarea name="memo" id="memo" cols="30" rows="10"></textarea>
                    </div>
                </form>
                <div class="popup_btn_area">
                    <button type="button" class="btn fill" onClick="saveNewUser();">생성</button>
                </div>
            </div>
        </div>
    </div>
    <!-- 팝업 : 직원 정보 수정 -->
    <div class="popup" id="modify_user">
        <div class="popup_container">
            <div class="popup_head">
                <p class="popup_title">정보수정</p>
                <button type="button" class="popup_close" onClick="closePop()">x</button>
            </div>
            <div class="popup_inner">
                <dfn>필수항목 *</dfn>
                <form id="updateUserForm">
                    <div class="row">
                        <label for="active">활성화</label>
                        <input type="checkbox" id="active" name="active">체크 시, 활성화
                    </div>
                    <div class="row">
                        <label for="admin">관리자</label>
                        <input type="checkbox" id="admin" name="admin">체크 시, 관리자모드 접속 가능
                    </div>
                    <div class="row">
                        <label for="id">ID</label>
                        <input type="text" id="id" name="id" readonly/>
                    </div>
                    <div class="row">
                        <label for="password">PW<i>*</i></label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <div class="row">
                        <label for="name">이름<i>*</i></label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="row">
                        <label for="telPhone">전화번호<i>*</i></label>
                        <input type="text" id="telPhone" name="telPhone" required>
                    </div>
                    <div class="row">
                        <label for="mail">이메일</label>
                        <input type="text" id="mail" name="downPay" required>
                    </div>
                    <div class="row">
                        <label for="memo" style="vertical-align:top;">메모</label>
                        <textarea name="memo" id="memo" cols="30" rows="10"></textarea>
                    </div>
                </form>
                <div class="popup_btn_area">
                    <button type="button" class="popup_btn stroke" onClick="updateUser();">수정</button>
                    <button type="button" class="popup_btn fill" onClick="deleteUser();">삭제</button>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        $.getScript('/js/sample/user001.js');
    </script>
</body>
</html>