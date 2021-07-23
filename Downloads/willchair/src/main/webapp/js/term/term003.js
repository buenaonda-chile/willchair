
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
		url : "/term/saveTermPrivate",
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
		url : "/term/getTermPrivate",
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
	$('#termprivate').addClass("current");
    getTerm();
	ClassicEditor
				.create( document.querySelector( '#content' ), {
					
				toolbar: {
					items: [
						'heading',
						'|',
						'bold',
						'italic',
						'link',
						'bulletedList',
						'numberedList',
						'|',
						'outdent',
						'indent',
						'|',
						'blockQuote',
						'insertTable',
						'undo',
						'redo',
						'fontColor',
						'fontBackgroundColor',
						'fontSize',
						'underline',
						'specialCharacters',
						'horizontalLine',
						'htmlEmbed'
					]
				},
				language: 'ko',
				image: {
					toolbar: [
						'imageTextAlternative',
						'imageStyle:inline',
						'imageStyle:block',
						'imageStyle:side'
					]
				},
				table: {
					contentToolbar: [
						'tableColumn',
						'tableRow',
						'mergeTableCells'
					]
				},
					licenseKey: '',
					
					
					
				} )
				.then( editor => {
					window.editor = editor;
					editor.setData(termContent);
					
					
					
				} )
				.catch( error => {
					console.error( 'Oops, something went wrong!' );
					console.error( 'Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:' );
					console.warn( 'Build id: eed83e2ex4oz-pejoxvy7ffif' );
					console.error( error );
				} );
});
