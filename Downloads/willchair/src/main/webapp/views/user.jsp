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
        <%@ include file="nav.jsp" %>
        <div class="main_container">
            <section class="main_section">
                <h2 class="main_title">회원 관리</h2>
                <div class="main_summary">
                    <dl>
                        <dt>관리자수</dt>
                        <dd id="totalStaff"><%=request.getAttribute("totalStaff")%>명</dd>
                    </dl>
                    <dl>
                        <dt>APP 회원수</dt>
                        <dd id="totalUser"><%=request.getAttribute("totalUser")%>명</dd>
                    </dl>
                    <!-- 클릭시 직원추가 팝업창 띄움 -->
                    <a href="javascript:void(0);" onclick="showPop('new_staff');">관리자추가</a>
                </div>
                <%-- <div class="main_utility">
                    <div class="btn_wrap">
                        <button class="btn" onClick="exportExcel();">엑셀 다운로드</button>
                    </div>
                </div> --%>
                <div id="theTabPanel">
                    <div>
                    <a>관리자관리</a>
                    <div class="main_content">
                        <!-- 필터 영역 admin_filter-->
                        <div class="main_filter">
                            <form action="#" id="search_form" name="search_form">
                                <label for="con">검색조건</label>
                                <select name="con" id="staffCon">
                                    <option value="all" selected="selected">전체</option>
                                    <option value="name">이름</option>
                                    <option value="id">아이디</option>
                                    <option value="mail">이메일</option>
                                </select>
                                <label for="inq"></label>
                                <input type="text" id="staffInq" placeholder=",로 다중검색 가능">
                                <button type="button" class="btn att" onClick="getStaffList();">조회</button>
                            </form>
                                <button class="btn" onClick="exportStaffExcel();" style="float:right;">엑셀 다운로드</button>
                        </div>
                        <!-- 보드 영역 admin_dashboard-->
                        <div class="main_dashboard">
                            <div class="sub_cont">
                                <div class="btn_wrap">
                            <div class="btn_wrap">
                            </div>
                                </div>
                            </div>
                                <div id="staffGrid"  style="height:500px;"></div>
                                <div id="staffGridPager" class="pager"></div>
                            <div class="sub_cont">
                                <div class="btn_wrap">
                            <div class="btn_wrap">
                            </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div>
                    <a>APP회원관리</a>
                    <div class="main_content">
                        <!-- 필터 영역 admin_filter-->
                        <div class="main_filter">
                            <form action="#" id="search_form" name="search_form">
                                <label for="con">검색조건</label>
                                <select name="con" id="userCon">
                                    <option value="all" selected="selected">전체</option>
                                    <option value="name">닉네임</option>
                                </select>
                                <label for="inq"></label>
                                <input type="text" id="userInq" placeholder=",로 다중검색 가능">
                                <button type="button" class="btn att" onClick="getUserList();">조회</button>
                            </form>
                            <div class="btn_wrap">
                                <label for="version">APP버전</label>
                                <input type="text" id="appVer" maxlength="9" value="<%=request.getAttribute("appVersion")%>" >
                                <button type="button" class="btn att" onClick="updateVersion();">수정</button>
                                <button class="btn" onClick="exportUserExcel();">엑셀 다운로드</button>
                            </div>   
                        </div>
                        <!-- 보드 영역 admin_dashboard-->
                        <div class="main_dashboard">
                            <div class="sub_cont">
                                <div class="btn_wrap">
                            <div class="btn_wrap">
                            </div>
                                </div>
                            </div>
                                <div id="userGrid"  style="height:500px;"></div>
                                <div id="userGridPager" class="pager"></div>
                            <div class="sub_cont">
                                <div class="btn_wrap">
                            <div class="btn_wrap">
                            </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>   
                </div>            
            </section>
        </div>
    </div>
    <!-- 팝업 -->
    <div class="popup" id="new_staff">
        <div class="popup_container">
            <div class="popup_head">
                <p class="popup_title">관리자추가</p>
                <button type="button" class="popup_close" onClick="closePop();">x</button>
            </div>
            <div class="popup_inner">
                <dfn>필수항목 *</dfn>
                <form id="newStaffForm">
                    <table>
                        <tbody>
                            <tr>
                                <th><label for="id">ID<i>*</i></label></th>
                                <td>
                                    <input type="text" id="id" name="id" required onchange="dupCheckIdFlag = false;">
                                    <button type="button" class="btn att" onClick="dupCheckId();">중복확인</button>
                                </td>
                            </tr>
                            <tr>
                                <th><label for="id">PW<i>*</i></label></th>
                                <td>
                                    <input type="password" id="password" name="password" required>
                                </td>
                            </tr>
                            <tr>
                                <th><label for="name">이름<i>*</i></label></th>
                                <td>
                                    <input type="text" id="name" name="name" required>
                                </td>
                            </tr>
                            <tr>
                                <th><label for="telPhone">전화번호<i>*</i></label></th>
                                <td>
                                    <input type="text" id="telPhone" name="telPhone" required>
                                </td>
                            </tr>
                            <tr>
                                <th> <label for="mail">이메일<i>*</i></label></th>
                                <td>
                                    <input type="text" id="mail" name="mail" required>
                                </td>
                            </tr>
                            <tr>
                                <th><label for="memo" style="vertical-align:top;">메모</label></th>
                                <td>
                                   <textarea name="memo" id="memo" cols="30" rows="10"></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <div class="popup_btn_area">
                    <button type="button" class="btn confirm" onClick="saveNewStaff();">생성</button>
                </div>
            </div>
        </div>
    </div>
    <!-- 팝업 : 직원 정보 수정 -->
    <div class="popup" id="modify_staff">
        <div class="popup_container">
            <div class="popup_head">
                <p class="popup_title">정보수정</p>
                <button type="button" class="popup_close" onClick="closePop();">x</button>
            </div>
            <div class="popup_inner">
                <dfn>필수항목 *</dfn>
                <form id="updateStaffForm">
                    <table>
                        <tbody>
                            <tr>
                                <th> <label for="active">활성화</label></th>
                                <td>
                                    <input type="checkbox" id="active" name="active">
                                    <label for="active">체크 시, 활성화</label>
                                </td>
                            </tr>
                            <tr>
                                <th> <label for="admin">관리자</label></th>
                                <td>
                                    <input type="checkbox" id="admin" name="admin">
                                    <label for="admin">체크 시, 활성화</label>
                                </td>
                            </tr>
                            <tr>
                                <th><label for="id">ID<i>*</i></label></th>
                                <td>
                                    <input type="text" id="id" name="id" required onchange="dupCheckIdFlag = false;">
                                    <button type="button" class="btn att" onClick="dupCheckId();">중복확인</button>
                                </td>
                            </tr>
                            <tr>
                                <th><label for="id">PW<i>*</i></label></th>
                                <td>
                                    <input type="password" id="password" name="password" required>
                                </td>
                            </tr>
                            <tr>
                                <th><label for="name">이름<i>*</i></label></th>
                                <td>
                                    <input type="text" id="name" name="name" required>
                                </td>
                            </tr>
                            <tr>
                                <th><label for="telPhone">전화번호<i>*</i></label></th>
                                <td>
                                    <input type="text" id="telPhone" name="telPhone" required>
                                </td>
                            </tr>
                            <tr>
                                <th> <label for="mail">이메일<i>*</i></label></th>
                                <td>
                                    <input type="text" id="mail" name="mail" required>
                                </td>
                            </tr>
                            <tr>
                                <th><label for="memo" style="vertical-align:top;">메모</label></th>
                                <td>
                                   <textarea name="memo" id="memo" cols="30" rows="10"></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <div class="popup_btn_area">
                    <button type="button" class="btn stroke" onClick="updateStaff();">수정</button>
                    <button type="button" class="btn fill" onClick="deleteStaff();">삭제</button>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        $.getScript('/js/staff/user001.js');
    </script>
</body>
</html>