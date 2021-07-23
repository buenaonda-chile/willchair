<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<aside class="main_sidebar">
        <h1 class="logo logo_s">로고</h1>
        <ul class="main_nav">
            <li>
                <a href="/user/staff" class="dept1 member" id="member">회원관리</a>
            </li>
            <li>
                <a href="/comment/commentinfo" class="dept1 content" id="contents">콘텐츠관리</a>
                <ul class="dept2">
                    <%-- <li><a href="/notice/noticeInfo" id="notice">공지관리</a></li> --%>
                    <li><a id="comment" href="/comment/commentinfo">댓글관리</a></li>
                </ul>
            </li>
            <li>
                <a href="/store/storeinfo" class="dept1 data" id="data">데이터관리</a>
                <ul class="dept2">
                    <li><a id="store" href="/store/storeinfo">가게관리</a></li>
                    <li><a id="location" href="/location/locationinfo">지역관리</a></li>
                </ul>
            </li>
            <li>
                <%-- <a href="#" class="dept1 stats">통계관리</a> --%>
            </li>
            <li>
                <a href="/term/termservice" class="dept1 terms" id="term">약관관리</a>
                <ul class="dept2">
                    <li><a id="termservice" href="/term/termservice">이용약관</a></li>
                    <li><a id="termlocate" href="/term/termlocate">위치기반서비스약관</a></li>
                    <li><a id="termprivate" href="/term/termprivate">개인정보취급방침</a></li>
                </ul>
            </li>
        </ul>
        <div class="terms_area">
            <a href="/terms" target="_blank">이용약관</a>
            <a href="/locateTerms" target="_blank">위치기반서비스약관</a>
            <a href="/privacyTerms" target="_blank">개인정보취급방침</a>
        </div>
        <a href="javascript:_logOut()" class="main_out">로그아웃</a>
</aside>