function autoLoginCheck(){
    if($('#auto-login').val() =='off'){
      $('#auto-login').val('on');
    }else{
      $('#auto-login').val('off');
    }
  }
  
function enterkey() {
    if (window.event.keyCode == 13) {
        login();
    }
}

function login()
{
    if(!login_form.staffId.value){
        alert("아이디를 입력하세요");
        login_form.staffId.focus();
        return false;
    
    }else if(!login_form.staffPass.value){
        alert("비밀번호를 입력하세요");
        login_form.staffPass.focus();
        return false;
    }
    
    var params = {
        staffId 	: login_form.staffId.value
            ,staffPass	: login_form.staffPass.value
            ,autoLogin : $('#auto-login').val()
        }
        
        $.ajax({
        url : "/loging",
        async : true, // 비동기모드(화면전환 X) : true, 동기식모드 : false
        type : 'POST',
        cache : false,
        dataType : 'text',
        data : params,
        success : function(data) {
            if(data == "/user/staff")
                location.href = data; 
            else 
                alert(data);
        },
        error : function(request,status,error) {
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    });
}

$(document.body).ready(function() {
    document.addEventListener('keydown', enterkey);
});
