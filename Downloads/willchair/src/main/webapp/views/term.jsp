<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <%@ include file="header.jsp" %>
    <script src="https://cdn.ckeditor.com/ckeditor5/29.0.0/classic/ckeditor.js"></script>
    <style type="text/css">
        .ck-content {height: 800px;}
    </style>
</head>
<body>
    <div class="main_wrap">
        <%@ include file="nav.jsp" %>
        <div class="main_container">
            <section class="main_section">
                <h2 class="main_title">이용약관</h2>
                    <div class="btn_wrap">
                        <button type="button" class="btn" onClick="saveTerm();">저장</button>
                    </div>
                    <div class="main_content">
                        <textarea name="content" id="content"></textarea>
                    </div>  
            </section>
        </div>
    </div>
    <script type="text/javascript">
        $.getScript('/js/term/term001.js');
    </script>
</body>
</html>
