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
                <h2 class="main_title">댓글 관리</h2>
                <div class="main_summary">
                    <dl>
                        <dt>총 작성글</dt>
                        <dd id="totalComment"><%=request.getAttribute("totalComment")%></dd>
                    </dl>
                    <dl>
                        <dt>활성화 댓글수</dt>
                        <dd id="totalCommentY"><%=request.getAttribute("totalCommentY")%></dd>
                    </dl>
                    <dl>
                        <dt>비활성화 댓글수</dt>
                        <dd id="totalCommentN"><%=request.getAttribute("totalCommentN")%></dd>
                    </dl>
                    <!-- 클릭시 지역추가 팝업창 띄움 -->
                    <%-- <a href="javascript:void(0);" onclick="showPop('new_location');" class="popup_trigger">지역 추가</a> --%>
                </div>
                <div class="main_utility">
                 <label for="Date">조회일</label>
                    <input id="searchDtFr">
                    - <input id="searchDtTo">
                </div>
                    <div class="main_content">
                        <!-- 필터 영역 admin_filter-->
                        <div class="main_filter">
                            <form action="#" id="search_form" name="search_form">
                                <label for="con">검색조건</label>
                                <select name="con" id="commnetCon">
                                    <option value="all" selected="selected">전체</option>
                                    <option value="name">닉네임</option>
                                    <option value="id">아이디</option>
                                    <option value="storename">가게이름</option>
                                </select>
                                <label for="inq"></label>
                                <input type="text" id="commentInq" placeholder=",로 다중검색 가능">
                                <button type="button" class="btn att" onClick="getCommentList();">조회</button>
                            </form>
                        </div>
                        <!-- 보드 영역 admin_dashboard-->
                        <div class="main_dashboard">
                            <div class="sub_cont">
                                <div class="btn_wrap">
                            <div class="btn_wrap">
                                <button type="button" class="btn stroke" onClick="_getUserGridLayout('commentLayout', commentGrid);">칼럼위치저장</button>
                                <button type="button" class="btn stroke" onClick="_resetUserGridLayout('commentLayout', commentGrid, commentColumns);">칼럼초기화</button>
                            </div>
                                </div>
                            </div>
                                <div id="commentGrid"  style="height:500px;"></div>
                                <div id="commentGridPager" class="pager"></div>
                            <div class="sub_cont">
                                <div class="btn_wrap">
                            <div class="btn_wrap">
                                <button type="button" class="btn stroke" onClick="_getUserGridLayout('commentLayout', commentGrid);">칼럼위치저장</button>
                                <button type="button" class="btn stroke" onClick="_resetUserGridLayout('commentLayout', commentGrid, commentColumns);">칼럼초기화</button>
                            </div>
                                </div>
                            </div>
                        </div>
                    </div>  
            </section>
        </div>
    </div>
    <!-- 팝업 : 지역 정보 수정 -->
    <div class="popup" id="modify_comment">
        <div class="popup_container">
            <div class="popup_head">
                <p class="popup_title">정보수정</p>
                <button type="button" class="popup_close" onClick="closePop()">x</button>
            </div>
            <div class="popup_inner">
                <dfn>필수항목 *</dfn>
                <form id="updateCommentForm">
                    <table>
                        <tbody>
                            <tr>
                                <th> <label for="activeFlag">활성화</label></th>
                                <td>
                                    <input type="checkbox" id="activeFlag" name="activeFlag">
                                    <label for="activeFlag">체크 시, 활성화</label>
                                </td>
                            </tr>
                            <tr>
                                <th> <label for="imgPathFlag">이미지경로활성화</label></th>
                                <td>
                                    <input type="checkbox" id="imgPathFlag" name="imgPathFlag">
                                    <label for="imgPathFlag">체크 시, 활성화</label>
                                </td>
                            </tr>
                            <tr>
                                <th><label for="commentIdx">댓글번호</label></th>
                                <td>
                                    <input type="text" id="commentIdx" name="commentIdx" readonly/>
                                </td>
                            </tr>
                            <tr>
                                <th><label for="commentAddidx">댓글추가번호</label></th>
                                <td>
                                    <input type="text" id="commentAddidx" name="commentAddidx" readonly/>
                                </td>
                            </tr>
                            <tr>
                                <th><label for="userId">유저ID</label></th>
                                <td>
                                    <input type="text" id="userId" name="userId" readonly/>
                                </td>
                            </tr>
                            <tr>
                                <th><label for="cretTime">작성일</label></th>
                                <td>
                                    <input type="text" id="cretTime" name="cretTime" readonly>
                                </td>
                            </tr>
                            <tr>
                                <th> <label for="img">이미지</label></th>
                                <td id="imgPath">
                                </td>         
                            </tr>
                            <tr>
                                <th><label for="bodyText" style="vertical-align:top;">댓글내용</label></th>
                                <td>
                                    <textarea name="bodyText" id="bodyText" cols="30" rows="10"></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <div class="popup_btn_area">
                    <button type="button" class="btn confirm" onClick="updateComment();">수정</button>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        $.getScript('/js/comment/comment001.js');
    </script>
</body>
</html>