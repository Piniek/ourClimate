$(function() {
	$("#menu span").click(function() {
		$("#menu").toggleClass("active");
	});
	
	$("#history .title").click(function() {
		$("#history").toggleClass("active");
		$("#overlay").toggleClass("active");
	});
	
	$("#overlay").click(function() {
		$(this).removeClass("active");
		$("#history").removeClass("active");
		$("#popup").removeClass("active");
	});
	
	$(".svg-alert").click(function() {
		$("#popup").addClass("active");
		$("#overlay").addClass("active");
	});
	
	$("#popup .close").click(function() {
		$("#popup").removeClass("active");
		$("#overlay").removeClass("active");
	});
	
	$(window).resize(function() {
	  resize();
	});
	resize();
	
	setInterval(startTime, 500);
});

function resize()
{
	var winHeight = $(window).height();
	// remove top bar height
	winHeight -= $("#top").outerHeight();
	//remove bottom bar height
	winHeight -= ($("#bottom ul li").outerHeight()+20);
	
	// convert to points
	winHeight *= 72 / 96;
	
	$("#map").attr("height", winHeight+"pt");
}

function startTime() {
    var today = new Date();
    today.setSeconds(today.getSeconds());
    
    document.getElementById('txt').innerHTML = today.toDateString();
    //var t = setInterval(startTime, 500);
}