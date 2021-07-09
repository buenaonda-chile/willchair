
var calendarInit = function(ic){
	
	ic.calendar.itemFormatter = function(date,e){
		var day = date.getDay();
		e.style.color = (day == 0 || day == 6) ? 'red' : '';
	}
	
}


var commonInput = function(){
	
	return {
		
		calendarInit: function(ic){
			calendarInit(ic);
		}
	};
}();