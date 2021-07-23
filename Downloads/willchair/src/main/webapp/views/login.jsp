<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>윌체어</title>
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
    <link rel="stylesheet" href="/css/reset.css">
    <link rel="stylesheet" href="/css/common.css">
    <link rel="shortcut icon" type="image/x-icon" href="/image/favicon.ico">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.8.18/jquery-ui.min.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.8.18/themes/base/jquery-ui.css" type="text/css" /> 
    <script type="text/javascript">

<%
Cookie[] cookies = request.getCookies();
if(cookies !=null){
    for(Cookie tempCookie : cookies){
        if(tempCookie.getName().equals("staff_id")){
            //쿠키값으로 대신 로그인 처리함
            %>
            $.ajax({
                  url : '<%=request.getContextPath()%>/autoLogin',
                  async : false, // 비동기모드 : true, 동기식모드 : false
                  type : 'POST', 
                  cache : false,
                  dataType : 'text',
                  data : {id : "<%=tempCookie.getValue()%>"},
                  success : function(data) {
                    location.href="/user/staff";
                  },
                  error : function(request,status,error) {
                    alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                  }
            });
            <%
        }
    }
}
%>
</script>
</head>
<body>
    <div class="login_wrap">
        <!--로그인 영역-->
        <div class="login_box">
            <h1 class="logo">로고</h1>
            <form action="#" id="login_form" method="post" name="login_form">
                <fieldset class="login_fld">
                    <legend class="blind">로그인</legend>
                    <label for="identity">아이디</label>
                    <input type="text" id="staffId" name="staffId" placeholder="아이디를 입력해주세요">
                    <label for="password">비밀번호</label>
                    <input type="password" id="staffPass" name="staffPass" placeholder="비밀번호를 입력해주세요">
                    <input type="checkbox" id="auto-login" name="auto-login" value="off" onchange="autoLoginCheck()">
                    <label for="auto-login">자동 로그인</label>
                    <button type="button" class="login_btn" onClick="login()">login</button>
                </fieldset>
            </form>
            <a href="#" class="inquiry" target="_blank">아이디 | 비밀번호 찾기는 관리자에게 문의바랍니다</a>
        </div>
        <div class="terms_area">
            <a href="/terms" target="_blank">이용약관 |</a>
            <a href="/locateTerms" target="_blank">위치기반서비스약관 |</a>
            <a href="/privacyTerms" target="_blank">개인정보취급방침</a>
        </div>
    </div>
    <script type="text/javascript">
        $.getScript('/js/login/login.js');
    </script>
</body>
</html>