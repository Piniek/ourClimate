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

var currDate = new Date();

function startTime() {
	$("#current-date").text(currDate.toDateString());
	
	var nextDay = new Date(currDate);
	nextDay = nextDay.setDate(nextDay.getDate() + 1);
	currDate = new Date(nextDay);
	
    //document.getElementById('txt').innerHTML = today.toDateString();
    //var t = setInterval(startTime, 500);
}


/*******************
* Game Logic
*	Game start, add 3 alerts, start off with randomly generated stats? Maybe random stats that are good?
*	If a decision is made after X number of days, randomly choose a decision
*		What should X be?
*	While a decision is being made (i.e., the popup is open), pause or slow down the time?
*	Once a decision is made, update stats + images
*	Every X number of days add 2 events (max at 6)
*		If no events are available, immediately drop 2 or 3 events, and wait until 
*			X number of days to add more (this resets the timer for dropping more events)
*		What should X be?
*	Game is over when stats are too bad (thresholds needed for this) or when they run out of events
*		Need to figure out how results should be shown
*******************/

