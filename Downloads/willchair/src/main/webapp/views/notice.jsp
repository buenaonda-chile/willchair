<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <%@ include file="header.jsp" %>
    <script src="/ckeditor5/build/ckeditor.js"></script>
    <link rel="stylesheet" type="text/css" href="/ckeditor5/sample/styles.css">
</head>
<body>
    <div class="main_wrap">
        <%@ include file="nav.jsp" %>
        <div class="main_container">
            <section class="main_section">
                <h2 class="main_title">공지 관리</h2>
                <div class="main_summary">
                    <dl>
                        <dt>공지수</dt>
                        <dd id="totalNotice"><%=request.getAttribute("totalNotice")%></dd>
                    </dl>
                    <dl>
                        <dt>활성화수</dt>
                        <dd id="totalActive"><%=request.getAttribute("totalActive")%></dd>
                    </dl>
                    <dl>
                        <dt>비활성화수</dt>
                        <dd id="totalActiveN"><%=request.getAttribute("totalActiveN")%></dd>
                    </dl>
                    <dl>
                    <!-- 클릭시 공지추가 팝업창 띄움 -->
                    <a href="javascript:void(0);" onclick="showPop('new_notice');">공지추가</a>
                    </dl>
                </div>
                <div class="main_utility">
                    <div class="btn_wrap">
                    </div>
                </div>
                    <div class="main_content">
                        <!-- 필터 영역 admin_filter-->
                        <div class="main_filter">
                            <form action="#" id="search_form" name="search_form">
                                <label for="con">검색조건</label>
                                <select name="con" id="con">
                                    <option value="all" selected="selected">전체</option>
                                    <option value="name">지역명</option>
                                    <option value="clusterName">클러스터이름</option>
                                    <option value="active">활성화</option>
                                </select>
                                <label for="inq"></label>
                                <input type="text" id="inq" placeholder=",로 다중검색 가능">
                                <button type="button" class="btn att" onClick="getNoticeList();">조회</button>
                            </form>
                        </div>
                        <!-- 보드 영역 admin_dashboard-->
                        <div class="main_dashboard">
                            <div class="sub_cont">
                                <div class="btn_wrap">
                            <div class="btn_wrap">
                                <button type="button" class="btn stroke" onClick="_getUserGridLayout('noticeLayout', noticeGrid);">칼럼위치저장</button>
                                <button type="button" class="btn stroke" onClick="_resetUserGridLayout('noticeLayout', noticeGrid, noticeColumns);">칼럼초기화</button>
                            </div>
                                </div>
                            </div>
                                <div id="noticeGrid"  style="height:500px;"></div>
                                <div id="noticeGridPager" class="pager"></div>
                            <div class="sub_cont">
                                <div class="btn_wrap">
                            <div class="btn_wrap">
                                <button type="button" class="btn stroke" onClick="_getUserGridLayout('noticeLayout', noticeGrid);">칼럼위치저장</button>
                                <button type="button" class="btn stroke" onClick="_resetUserGridLayout('noticeLayout', noticeGrid, noticeColumns);">칼럼초기화</button>
                            </div>
                                </div>
                            </div>
                        </div>
                    </div>  
            </section>
        </div>
    </div>
     <!-- 팝업 -->
    <div class="popup" id="new_notice">
        <div class="popup_container" style="width:1200px;">
            <div class="popup_head">
                <p class="popup_title">공지추가</p>
                <button type="button" class="popup_close" onClick="closePop();">x</button>
            </div>
            <div class="popup_inner">
                <dfn>필수항목 *</dfn>
                <form id="newNoticeForm">
                    <table>
                        <tbody>
                           <tr>
                                <th><label for="noticeFlag">공지활성화</label></th>
                                <td>
                                    <input type="checkbox" id="noticeFlag" name="noticeFlag"><label for="noticeFlag">체크시 활성화</label>
                                </td>
                            </tr>
                            <tr>
                                <th><label for="category">카테고리<i>*</i></label></th>
                                <td>
                                    <select name="category" id="category">
                                        <option value="opt1">옵션</option>
                                        <option value="opt2">옵션</option>
                                        <option value="opt3">옵션</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th><label for="title">제목<i>*</i></label></th>
                                <td>
                                    <input type="text" id="title" name="title" style="width:800px;">
                                </td>
                            </tr>
                            <tr>
                                <th><label for="content" style="vertical-align:top;">내용</label></th>
                                <td class="editor">
                                   <textarea name="content" id="content"></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <div class="popup_btn_area">
                    <button type="button" class="btn confirm" onClick="saveNewNotice();">생성</button>
                </div>
            </div>
        </div>
    </div>
    <!-- 팝업 : 지역 정보 수정 -->
    <div class="popup" id="modify_location">
        <div class="popup_container" style="width:1100px;">
            <div class="popup_head">
                <p class="popup_title">정보수정</p>
                <button type="button" class="popup_close" onClick="closePop()">x</button>
            </div>
            <div class="popup_inner">
                <dfn>필수항목 *</dfn>
                <form id="updateLocationForm">
                    <div class="row">
                        <label for="activeFlag">활성화</label>
                        <input type="checkbox" id="activeFlag" name="activeFlag">체크 시, 활성화
                    </div>
                    <div class="row">
                        <label for="sidoCode">지역코드<i>*</i></label>
                        <input type="text" id="sidoCode" name="sidoCode" readonly/>
                    </div>
                    <div class="row">
                        <label for="sidoName">지역명<i>*</i></label>
                        <input type="text" id="sidoName" name="sidoName" readonly/>
                    </div>
                    <div class="row">
                        <label for="clusterCode">클러스터코드<i>*</i></label>
                        <input type="text" id="clusterCode" name="clusterCode" readonly/>
                    </div>
                    <div class="row">
                        <label for="clusterName">클러스터이름<i>*</i></label>
                        <input type="text" id="clusterName" name="clusterName" readonly/>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        $.getScript('/js/notice/notice001.js');
    </script>
</body>
</html>