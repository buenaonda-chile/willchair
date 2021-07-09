<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="샘플">
    <meta name="description" content="샘플">
    <meta property="og:type" content="website">
    <meta property="og:title" content="샘플">
    <meta property="og:description" content="샘플">
    <title>작은시선</title>
    <link rel="stylesheet" href="../css/reset.css">
    <link rel="stylesheet" href="../css/common.css">
    <script src="https://code.jquery.com/jquery-2.2.4.js" integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI=" crossorigin="anonymous"></script>
    <script>
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
    </script>
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
                        <dt>타이틀</dt>
                        <dd>000</dd>
                    </dl>
                    <dl>
                        <dt>타이틀</dt>
                        <dd>000</dd>
                    </dl>
                    <a href="#" class="popup_trigger">팝업창 버튼</a>
                </div>
                <div class="main_utility">
                    <form action="#" method="post">
                        <label for="Date">조회일</label>
                        <input type="date" id="Date" value="2021-06-02">
                        <button class="btn att">조회</button>
                    </form>
                    <div class="btn_wrap">
                        <button class="btn">엑셀 업로드</button>
                        <button class="btn">엑셀 다운로드</button>
                    </div>
                </div>
                <div class="main_content">
                    <!-- 필터 영역 admin_filter-->
                    <div class="main_filter">
                        <form action="#" id="search_form" name="search_form">
                            <label for="con">검색조건</label>
                            <select name="con" id="con">
                                <option value="all" selected="selected">전체</option>
                                <option value="site">지역</option>
                                <option value="building">건물명</option>
                                <option value="depositor">입금자명</option>
                            </select>
                            <label for="inq"></label>
                            <input type="text" id="inq" placeholder=",로 다중검색 가능">
                            <button type="button" class="btn att">조회</button>
                        </form>
                        <div class="summary">
                            <dl>
                                <dt>타이틀</dt>
                                <dd>000</dd>
                            </dl>
                            <dl>
                                <dt>타이틀</dt>
                                <dd>000</dd>
                            </dl>
                            <dl>
                                <dt>타이틀</dt>
                                <dd>000</dd>
                            </dl>
                        </div>
                    </div>
                    <!-- 보드 영역 admin_dashboard-->
                    <div class="main_dashboard">
                        <div class="sub_cont">
                            <form action="#" id="search_form" name="search_form">
                                <label for="con">검색조건</label>
                                <select name="con" id="con">
                                    <option value="all" selected="selected">전체</option>
                                    <option value="option1">옵션</option>
                                    <option value="option2">옵션</option>
                                    <option value="option3">옵션</option>
                                </select>
                                <button type="button" class="btn att">조회</button>
                            </form>
                            <button type="button" class="btn stroke">버튼</button>
                            <div class="btn_wrap">
                                <button type="button" class="btn stroke">칼럼위치저장</button>
                                <button type="button" class="btn stroke">칼럼초기화</button>
                                <button type="button" class="btn">버튼</button>
                                <button type="button" class="btn">버튼</button>
                            </div>
                        </div>
                        <div class="grid_wrap">Grid 영역입니다</div>
                        <div class="sub_cont">
                            <div class="btn_wrap">
                                <button type="button" class="btn stroke">칼럼위치저장</button>
                                <button type="button" class="btn stroke">칼럼초기화</button>
                                <button type="button" class="btn">버튼</button>
                                <button type="button" class="btn">버튼</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
    <!-- 팝업 -->
    <div class="popup" id="popup">
        <div class="popup_container">
            <div class="popup_head">
                <p class="popup_title">팝업 타이틀</p>
                <button type="button" class="popup_close">x</button>
            </div>
            <div class="popup_inner">
                <dfn>필수항목 *</dfn>
                <form action="#" method="post">
                    <div class="row">
                        <label for="region">타이틀<i>*</i></label>
                        <input type="text" id="region" name="region" required>
                        <button type="button" class="btn att">검색</button>
                    </div>
                    <div class="row">
                        <label for="dtlAddr">타이틀<i>*</i></label>
                        <input type="text" id="dtlAddr" required>
                        <button type="button" class="btn att">중복확인</button>
                    </div>
                    <div class="row">
                        <label for="builName">타이틀<i>*</i></label>
                        <input type="text" id="builName" name="builName" required>
                    </div>
                    <div class="row">
                        <label for="builNum">타이틀<i>*</i></label>
                        <input type="text" id="builNum" name="builNum" onfocus="this.blur()" readonly>
                    </div>
                    <div class="row">
                        <label for="codeNum">타이틀<i>*</i></label>
                        <input type="text" id="codeNum" name="codeNum" required>
                        <button type="button" class="btn att">추가</button>
                    </div>
                    <div class="row">
                        <label for="downPay">타이틀<i>*</i></label>
                        <input type="text" id="downPay" name="downPay" required>
                    </div>
                    <div class="row">
                        <label for="memo" style="vertical-align:top;">메모</label>
                        <textarea name="memo" id="memo" cols="30" rows="10"></textarea>
                    </div>
                </form>
                <div class="popup_btn_area">
                    <button type="button" class="btn stroke">버튼</button>
                    <button type="button" class="btn fill">버튼</button>
                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript">
        $.getScript('../js/edu/sam001.js');
    </script>
</body>
</html>