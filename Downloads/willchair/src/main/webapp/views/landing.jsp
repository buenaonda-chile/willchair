<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="휠체어 사용자 맞춤 정보제공 플랫폼, 윌체어">
    <meta name="keywords" content="윌체어, 휠체어, 사용자 맞춤, 정보 제공, 플랫폼">
    <meta name="description" content="윌체어, 휠체어, 사용자 맞춤, 정보 제공, 플랫폼">
    <meta name="robots" content="윌체어">
    <meta name="title" content="일상을 잇다, 윌체어">
    <meta name="subject" content="일상을 잇다, 윌체어">
    <meta property="og:type" content="website">
    <meta property="og:title" content="윌체어">
    <meta property="og:description" content="일상을 잇다, 휠체어 사용자 맞춤 정보 제공 플랫폼">
    <meta property="og:image" content="image/ogimg.png">
    <meta property="og:url" content="https://willchair.co.kr">
    <title>일상을 잇다, 윌체어</title>
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/landing.css">
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
    <link rel="icon" type="image/x-icon" href="image/ico_favicon.ico">
    <link rel="shortcut icon" type="image/x-icon" href="image/ico_favicon.ico">
    <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script> 
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
    <script src="/js/landing/landing.js"></script>
</head>
<body>
    <div class="landing_wrp">
        <header class="landing_header">
            <div class="innr">
                <h1><a href="landing.html" class="logo">로고</a></h1>
                <div class="ham" id="btn_nav"><span></span></div>
                <div class="nav" id="nav">
                    <button class="btn_clse">닫기</button>
                    <ul>
                        <li class="mn"><a href="#intro">윌체어소개</a></li>
                        <li class="mn"><a href="#function">주요기능</a></li>
                        <li class="mn"><a href="#service">서비스지역</a></li>
                        <li class="mn"><a href="#download">다운로드</a></li>
                    </ul>
                </div>
            </div>
        </header>
        <div class="landing_visual" id="landing_visual">
            <div class="innr">
                <div class="text_box">
                    <h2 class="tit">일상을 잇다,<br><strong>윌체어</strong></h2>
                    <p class="des">휠체어 사용자 맞춤<br> 정보 제공 플랫폼 서비스</p>
                    <a href="#" class="store" onclick="appdown()"> <strong>앱 스토어</strong>바로가기</a>
                </div>
                <span class="thumb">
                    <img src="image/img_mobile.png" alt="앱이미지">
                </span>
            </div>
        </div>
        <section class="landing_intro" id="intro">
            <h3 class="tit aos-init aos-animate" data-aos="fade-up" data-aos-duration="800" data-aos-easing="ease-in-out">차이는 있지만 차별은 없는 <br>모두의 일상을 위해</h3>
            <ul>
                <li class="aos-init aos-animate" data-aos="fade-up" data-aos-duration="800" data-aos-delay="250">
                    <span class="icon"><img src="image/ico_problem.png" alt=""></span>
                    <p>휠체어 사용자, 노인, 유모차 보호자처럼 이동과 출입이 불편한 교통 약자들의 일상에 대해 고민했어요</p>   
                </li>
                <li class="aos-init aos-animate" data-aos="fade-up" data-aos-duration="800" data-aos-delay="500">
                    <span class="icon"><img src="image/ico_work.png" alt=""></span>
                    <p>전국 가게 데이터를 수집, 활용하여 이용자에게 편의성과 필요한 정보를 제공하고 있어요</p>   
                </li>
                <li class="aos-init aos-animate" data-aos="fade-up" data-aos-duration="800" data-aos-delay="700">
                    <span class="icon"><img src="image/ico_together.png" alt=""></span>
                    <p>이렇게 모두의 자유로운 일상을 꿈꾸며 탄생한 윌체어 앱은 누구나 출입할 수 있는 배리어프리 지점 정보를 제공해드려요</p> 
                </li>
            </ul>
        </section>
        <section class="landing_fnc" id="function">
                <div class="cont">
                    <div class="innr">
                        <div class="txt">
                            <h4>지금 바로 이곳,<br>내가 가고 싶은 그곳</h4>
                            <p class="des"><strong>주변보기</strong> 지금 내 위치 근처에 있는, <br>휠체어로 입장가능한 가게를 바로 확인 할 수있어요</p>
                        </div>
                        <div class="thumb"><img src="image/img_mobile_fnc1.png" alt="목업이미지"></div>
                    </div>
                </div>
                <div class="cont">
                    <div class="innr">
                        <div class="txt">
                            <h4>한번만 터치해서<br>한꺼번에 모아보기</h4>
                            <p class="des"><strong>가게보기</strong>윌체어 내에 등록된 모든 가게를 <br>메뉴별 지역별로 원하는대로 모아볼 수 있어요.<br>원하는 메뉴와 가까운 가게를 찾아보세요</p>
                        </div>
                        <div class="thumb"><img src="image/img_mobile_fnc2.png" alt="목업이미지"></div>
                    </div>
                </div>
                <div class="cont">
                    <div class="innr">
                        <div class="txt">
                            <h4>한 눈에 확인하는<br>시설물 정보</h4>
                            <p class="des"><strong>상세정보</strong>영업정보는 물론, 시설물 픽토그램과 사진을 통해<br>가게 정보를 한 눈에 볼 수 있어요.<br>길찾기와 전화걸기도 터치 한번으로 OK</p>
                        </div>
                        <div class="thumb"><img src="image/img_mobile_fnc3.png" alt="목업이미지"></div>
                    </div>
                </div>
                <div class="cont">
                    <div class="innr">
                        <div class="txt">
                            <h4>생생한 리뷰,<br>우리들의 커뮤니티</h4>
                            <p class="des"><strong>리뷰쓰기</strong>각 가게별로 리뷰를 작성하고 의견을 나눌 수 있어요.<br>다른 사람들이 작성한 후기도 확인해보세요.</p>
                        </div>
                        <div class="thumb"><img src="image/img_mobile_fnc4.png" alt="목업이미지"></div>
                    </div>
                </div>
                <div class="cont">
                    <div class="innr">
                        <div class="txt">
                            <h4>나에게 딱 맞는,<br>맞춤 지역필터</h4>
                            <p class="des"><strong>지역필터</strong>지역 설정을 통해 전국 어디서나,<br>원하는 가게 정보를 찾아볼 수 있어요.</p>
                        </div>
                        <div class="thumb"><img src="image/img_mobile_fnc5.png" alt="목업이미지"></div>
                    </div>
                </div>
        </section>
        <section class="landing_service" id="service">
            <div class="landing_service_wrp">
                <h3>윌체어 서비스 지역</h3>
                <p class="des">윌체어 서비스 지역은 계속해서 확대될 예정이에요</p>
                <div class="landing_service_region">
                    <div class="landing_service_map">
                        <img src="image/img_map.png" alt="지도이미지">
                        <i class="pulse pulse_rec"></i>
                        <span class="pin pin_white"><img src="image/ico_pin_white.png" alt="위치핀"></span>
                    </div>
                    <div class="landing_service_info">
                        <ul class="list">
                            <li class="item is_on">
                                <i></i>
                                <p>2021.07<br><strong>서울 OPEN</strong> </p>
                            </li>
                            <li class="item">
                                <i></i>
                                <p>2021.08<br><strong>지역이름 예정</strong> </p>
                            </li>
                            <li class="item">
                                <i></i>
                                <p>2021.10<br><strong>지역이름 예정</strong> </p>
                            </li>
                            <li class="item">
                                <i></i>
                                <p>2021.11<br><strong>지역이름 예정</strong> </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="landing_service_wrp">
                <h3>윌체어 서비스 지역</h3>
                <p class="des">윌체어 서비스 지역은 계속해서 확대될 예정이에요</p>
                <div class="landing_service_region">
                    <div class="landing_service_map">
                        <img src="image/img_map_seoul.png" alt="지도이미지">
                        <i class="pulse"></i>
                        <span class="anchor anchor_reg1">종로구</span>
                        <span class="anchor anchor_reg2">용산구</span>
                    </div>
                    <div class="landing_service_info">
                        <ul class="list">
                            <li class="item is_on">
                                <i></i>
                                <p>2021.07<br><strong>종로구 용산구 OPEN</strong> </p>
                            </li>
                            <li class="item">
                                <i></i>
                                <p>2021.08<br><strong>지역이름 예정</strong> </p>
                            </li>
                            <li class="item">
                                <i></i>
                                <p>2021.10<br><strong>지역이름 예정</strong> </p>
                            </li>
                            <li class="item">
                                <i></i>
                                <p>2021.11<br><strong>지역이름 예정</strong> </p>
                            </li>
                        </ul>
                    </div>
                    <button class="btn_prev">전국지도보기</button>
                </div>
            </div>
        </section>
        <section class="landing_video"><h3>비디오 영역입니다</h3></section>
        <section>
            <div class="landing_down" id="download">
                <h2 class="aos-init aos-animate" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-out">윌체어와 함께하는 일상,<br>지금 바로 시작해보세요</h2>
                <a href="#" class="store" onclick="appdown()"><strong>앱 스토어</strong>바로가기</a>
            </div>
            <footer class="landing_footer">
                <div class="innr">
                    <span class="logo">로고</span>
                    <div class="f_sns">
                        <a href="https://www.instagram.com/_willchair/" class="insta" target="_blank">인스타그램</a>
                        <a href="https://blog.naver.com/barrierfree055" class="blog" target="_blank">블로그</a>
                    </div>
                    <div class="f_info">
                        <p class="terms">
                            <a href="/locateTerms" target="_blank">위치기반 서비스 이용약관 |</a>
                            <a href="/terms" target="_blank">서비스 이용약관 |</a>
                            <a href="/privacyTerms" target="_blank">개인정보 처리방침</a>
                        </p>
                        <dl>
                            <dt>대표자</dt>
                            <dd>조준섭</dd>
                            <dt>사업자 등록 번호</dt>
                            <dd>784-81-01668</dd>
                        </dl>
                        <dl>
                            <dt>주소</dt>
                            <dd>경남 진주시 동진로 99 소셜캠퍼스온 201호 협동조합 작은시선</dd>
                        </dl>
                    </div>
                    <div class="f_cs">
                        <strong>CONTACT US</strong>
                        <a href="tel:010-3166-1206">010-3166-1206</a>
                        <a href="mailto:barrierfree055@naver.com">barrierfree055@naver.com</a>
                    </div> 
                </div>
                <a href="#landing_visual" class="landing_top">TOP</a>
            </footer>
        </section>
        <a href="#" class="landing_store" onclick="appdown()">앱 다운로드</a>
    </div>
</body>
</html>