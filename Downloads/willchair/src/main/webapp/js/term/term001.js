
var termContent;

//약관추가 
function saveTerm(){
	//필수값 체크
	if(editor.getData() == ""){
    	alert("내용을 입력해주세요.");
        return false;
    }
    
	var params = {
		content :editor.getData()
	}
    	
	$.ajax({
		url : "/term/saveTermService",
		async : false, // 비동기모드 : true, 동기식모드 : false
		type : 'POST',
		cache : false,
		dataType : 'text',
		data : params,
		success : function(data) {
			alert("약관 작성이 완료되었습니다.");
		},
		error : function(request,status,error) {
			alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
		});
}

var getTerm  = function(){
    $.ajax({
		url : "/term/getTermService",
		async : false, // 비동기모드 : true, 동기식모드 : false
		type : 'POST',
		cache : false,
		dataType : 'text',
		data : null,
		success : function(data) {
            termContent = data;
		},
		error : function(request,status,error) {
			alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
		});
}




$(document.body).ready(function() {   
    $('#term').addClass("current");
	$('#termservice').addClass("current");
    getTerm();
	ClassicEditor
	.create(document.querySelector('#content'), {
		ckfinder: {
			uploadUrl:'/ck/fileupload'	
		},
		language: {ui: 'ko', content: 'ko'},
		alignment: {
			options: ['left','center','right']
		}
	})
	.then( editor => {
		console.log('Editor was initialized', editor);
		window.editor = editor;
        editor.setData(termContent);
	})
	.catch(error=>{
		console.error(error);
	});
   
});
