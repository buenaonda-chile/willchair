
// AOS animation 실행
$(document).ready(function() {
    AOS.init();
} );

// 헤더 스크롤 이벤트
$(function(){
    $(window).on("scroll", function() {
        if($(window).scrollTop() > 110) {
            $(".landing_header").addClass("is_on");
        } else {
            $(".landing_header").removeClass("is_on");
        }
    });
});

// 모바일 햄버거 메뉴
$(function(){
    if($(window).width() < 1100) { 
        $('.ham').on('click',function(e){
            $('#nav').fadeIn(350);
            e.preventDefault();
        });
        $('#nav li a').on('click',function(e){
            $('#nav').fadeOut(350);
            var locate = this.attr[href=""]
            document.location.href=locate
            e.preventDefault();
        });
    } 
});

// 모바일 햄버거 메뉴 닫기 버튼 
$(function(){
    $('#nav .btn_clse').on('click',function(e){
        $('#nav').fadeOut(350);
    });
});

// 서비스 영역 화면전환 
$(function(){
    $('.pin_white').on('click',function(e){
        $('.landing_service').css("margin-left","-100%");
        e.preventDefault();
    });
    $('.btn_prev').on('click',function(e){
      $('.landing_service').css("margin-left","0");
        e.preventDefault();
    });
});

// 탑 메뉴
$(function(){
    $(window).on("scroll", function() {
        if($(window).scrollTop() < 300) {
            $(".landing_top").css("opacity","0");
        } else {
            $(".landing_top").css("opacity","1");
        }
    });
});

//  앱다운로드버튼 .landing_store 스크롤 이벤트
$(function(){
    var docHeight = $(document).height();
    var winHeight = $(window).height();
    buffer = 200
    $('.landing_store').hide();
    $(window).on("scroll", function() {
        if($(window).scrollTop() < 200 || ($(window).scrollTop() + winHeight + buffer >= docHeight )){   
            $('.landing_store').hide();
        } else  {
            $('.landing_store').show();
        }
    });
});

// 앱다운로드버튼 .landing_store 클릭시 os별 앱스토어 링크 이동
var varUA = navigator.userAgent.toLowerCase(); 
function appdown() {
  if (varUA.match('android') != null) { 
    window.location.href='https://play.google.com/store/apps/details?id=com.js.willchair';
  } else if (varUA.indexOf("iphone")>-1||varUA.indexOf("ipad")>-1||varUA.indexOf("ipod")>-1||varUA.indexOf("mac")>-1) { 
    window.location.href='https://apps.apple.com/app/id1577352377';
  } else {
    window.location.href='https://play.google.com/store/apps/details?id=com.js.willchair';
  }
};




