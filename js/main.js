$(function() {
	$("#menu span").click(function() {
		$("#menu").toggleClass("active");
	});
	
	$("#history span").click(function() {
		$("#history").toggleClass("active");
		$("#overlay").toggleClass("active");
	});
});