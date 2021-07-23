<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <%@ include file="header.jsp" %>
    <script src="/ckeditor5/build/ckeditor.js"></script>
    <link rel="stylesheet" type="text/css" href="/ckeditor5/sample/styles.css">
    <style type="text/css">
        .ck-content {height: 800px;}
    </style>
</head>
<body>
    <div class="main_wrap">
        <%@ include file="nav.jsp" %>
        <div class="main_container">
            <section class="main_section">
                <h2 class="main_title" style="margin-bottom:0px;">위치기반서비스약관</h2>
                    <div class="main_utility">
                    <div class="btn_wrap">
                        <button type="button" class="btn" onClick="saveTerm();">저장</button>
                    </div>
                    </div>
                    <div class="main_content">
                        <textarea name="content" id="content"></textarea>
                    </div>  
            </section>
        </div>
    </div>
    <script type="text/javascript">
        $.getScript('/js/term/term002.js');
    </script>
</body>
</html>
