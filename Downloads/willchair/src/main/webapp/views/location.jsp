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
                <h2 class="main_title">지역 관리</h2>
                <div class="main_summary">
                    <dl>
                        <dt>지역수</dt>
                        <dd id="totalLocation"><%=request.getAttribute("totalLocation")%></dd>
                    </dl>
                    <dl>
                        <dt>활성화수</dt>
                        <dd id="totalActive"><%=request.getAttribute("totalActive")%></dd>
                    </dl>
                    <dl>
                        <dt>비활성화수</dt>
                        <dd id="totalActiveN"><%=request.getAttribute("totalActiveN")%></dd>
                    </dl>
                    <!-- 클릭시 지역추가 팝업창 띄움 -->
                    <%-- <a href="javascript:void(0);" onclick="showPop('new_location');" class="popup_trigger">지역 추가</a> --%>
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
                                <button type="button" class="btn att" onClick="getLocationList();">조회</button>
                            </form>
                             <div class="btn_wrap">
                                <button class="btn" onClick="exportLocationExcel();">엑셀 다운로드</button>
                            </div>   
                        </div>
                        <!-- 보드 영역 admin_dashboard-->
                        <div class="main_dashboard">
                            <div class="sub_cont">
                                <div class="btn_wrap">
                            <div class="btn_wrap">
                                <button type="button" class="btn stroke" onClick="_getUserGridLayout('locationLayout', locationGrid);">칼럼위치저장</button>
                                <button type="button" class="btn stroke" onClick="_resetUserGridLayout('locationLayout', locationGrid, locationColumns);">칼럼초기화</button>
                            </div>
                                </div>
                            </div>
                                <div id="locationGrid"  style="height:500px;"></div>
                                <div id="locationGridPager" class="pager"></div>
                            <div class="sub_cont">
                                <div class="btn_wrap">
                            <div class="btn_wrap">
                                <button type="button" class="btn stroke" onClick="_getUserGridLayout('locationLayout', locationGrid);">칼럼위치저장</button>
                                <button type="button" class="btn stroke" onClick="_resetUserGridLayout('locationLayout', locationGrid, locationColumns);">칼럼초기화</button>
                            </div>
                                </div>
                            </div>
                        </div>
                    </div>  
            </section>
        </div>
    </div>
    <!-- 팝업 : 지역 정보 수정 -->
    <div class="popup" id="modify_location">
        <div class="popup_container">
            <div class="popup_head">
                <p class="popup_title">정보수정</p>
                <button type="button" class="popup_close" onClick="closePop()">x</button>
            </div>
            <div class="popup_inner">
                <dfn>필수항목 *</dfn>
                <form id="updateLocationForm">
                    <table>
                        <tbody>
                            <tr>
                                <th><label for="activeFlag">활성화</label></th>
                                <td>
                                    <input type="checkbox" id="activeFlag" name="activeFlag"><label for="activeFlag">체크시 활성화</label>
                                </td>
                            </tr>
                            <tr>
                                <th><label for="sidoCode">지역코드<i>*</i></label></th>
                                <td>
                                    <input type="text" id="sidoCode" name="sidoCode" readonly/>
                                </td>
                            </tr>
                            <tr>
                                <th><label for="sidoName">지역명<i>*</i></label></th>
                                <td>
                                    <input type="text" id="sidoName" name="sidoName" readonly/>
                                </td>
                            </tr>
                            <tr>
                                <th><label for="clusterCode">클러스터코드<i>*</i></label></th>
                                <td>
                                    <input type="text" id="clusterCode" name="clusterCode" readonly/>
                                </td>
                            </tr>
                            <tr>
                                <th><label for="clusterName">클러스터이름<i>*</i></label></th>
                                <td>
                                    <input type="text" id="clusterName" name="clusterName" readonly/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                 <div class="popup_btn_area">
                    <button type="button" class="btn confirm" onClick="updateLocation();">수정</button>
                </div>
            </div>
        </div>
    </div>
    
    <script type="text/javascript">
        $.getScript('/js/location/location001.js');
    </script>
</body>
</html>
