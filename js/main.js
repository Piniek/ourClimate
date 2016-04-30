var gLoopInterval = 100;

$(function() {
	$("#menu span").click(function() {
		$("#menu").toggleClass("active");
	});
	
	$("#history .title").click(function() {
		if(!$("#history").hasClass("active"))
			$("#history ul").scrollTop(0);
		
		$("#history").toggleClass("active");
		$("#overlay").toggleClass("active");
	});
	
	$("#overlay").click(function() {
		closePopup();
	});
	
	/*$(".svg-alert").click(function() {
		$("#popup").addClass("active");
		$("#overlay").addClass("active");
	});*/
	
	$("li.restart").click(function() {
		openPopup("Restart Game", "Are you sure? This cannot be undone!", "accdec");
	});
	
	$("#popup .close").click(function() {
		closePopup();
	});
	
	$("#popup .opts .confirm").click(function() {
		closePopup();
	});
	
	$(window).resize(function() {
	  resize();
	});
	resize();
	
	startTime();
	showIntro();
	
	$("#svgContainer").on("click", "g.svg-alert", function() {
		$(this).addClass("open");
		openEvent(parseInt($(this).attr("data-event")));
	});
	
	$("#popup .accdec div").click(function() {
		if($(".svg-alert.open").length == 1)
			makeDecision($(this).attr("class"), parseInt($(".svg-alert.open").attr("data-event")));
		else
			restartGame($(this).attr("class"));
		
		closePopup();
	});
	
});
var gIntro = 0;
function showIntro()
{
	gIntro = 1;
	openPopup("Welcome!", "Hi, welcome to the ourClimate app. Someone please write this intro, i'm bad at this. We're gonna show you tooltips once you click okay", "confirm");
}

function closePopup()
{
	$("#history").removeClass("active");
	$("#popup").removeClass("active");
	$("#overlay").removeClass("active");
	$(".svg-alert.open").removeClass("open");
	gPause = 0;
	
	if(gIntro)
	{
		introJs().start();
		gIntro = 0;
		setTimeout(startGame, 500);
	}
}
				
function randomNum(min, max, dec)
{
	return parseFloat((Math.random()*(max-min)+min).toFixed(dec));
}

function updateStatsDOM()
{
	// Temperature
	$("li.temp .change").text(gTemperature[2]+""+Math.abs(gTemperature[1]).toFixed(2));
	
	if(gTemperature[2] == '-')
		$("li.temp .change").removeClass("up").addClass("down");
	else if(gTemperature[2] == '+')
		$("li.temp .change").addClass("up").removeClass("down");
	else
		$("li.temp .change").removeClass("up").removeClass("down");
	
	$("li.temp .info span").html(gTemperature[0].toFixed(2) + "&deg;F");
	
	//Forest
	$("li.forest .change").text(gForests[2]+""+Math.abs(gForests[1]));
	
	if(gForests[2] == '-')
		$("li.forest .change").removeClass("up").addClass("down");
	else if(gForests[2] == '+')
		$("li.forest .change").addClass("up").removeClass("down");
	else
		$("li.forest .change").removeClass("up").removeClass("down");
	
	$("li.forest .info span").html(gForests[0].toFixed(0)+ " km<sup>2</sup>");
	
	// CO2
	$("li.co2 .change").text(gCO2[2]+""+Math.abs(gCO2[1]).toFixed(2));
	
	if(gCO2[2] == '-')
		$("li.co2 .change").removeClass("up").addClass("down");
	else if(gCO2[2] == '+')
		$("li.co2 .change").addClass("up").removeClass("down");
	else
		$("li.co2 .change").removeClass("up").removeClass("down");
	
	$("li.co2 .info span").text(gCO2[0].toFixed(2)+" ppm");
	
	// Sea
	$("li.sea .change").text(gSea[2]+""+Math.abs(gSea[1]).toFixed(2));
	
	if(gSea[2] == '-')
		$("li.sea .change").removeClass("up").addClass("down");
	else if(gSea[2] == '+')
		$("li.sea .change").addClass("up").removeClass("down");
	else
		$("li.sea .change").removeClass("up").removeClass("down");
	
	$("li.sea .info span").text(gSea[0].toFixed(2)+" mm");
}

var gTemperature, gForests, gCO2, gSea; //Changed this from var gTampature (spelling was wrong)
gTemperature = [0, 0, ''];
gForests = [0, 0, ''];
gCO2 = [0, 0, ''];
gSea = [0, 0, ''];
gOrigStats = {"temperature": 0, "forests": 0, "co2": 0, "sea": 0};

function startGame()
{
	// tool tips intro still open, so wait
	if($(".introjs-overlay").length == 1)
	{
		setTimeout(startGame, 200);
		return;
	}
	// Randomly generate stats (sources provided)
	
	// all rate of change are per year
	
	//https://www.ncdc.noaa.gov/sotc/global/201401
	//http://climate.nasa.gov/vital-signs/global-temperature/
	gTemperature = [randomNum(55, 60, 0), randomNum(0, 1, 1), '+']; // use F for units
	
	//http://www.greenfacts.org/en/forests/l-2/2-extent-deforestation.htm
	gForests = [randomNum(39000000, 41000000, 0), randomNum(125000, 135000, 0), '-']; //use km^2 for units
	
	//https://en.wikipedia.org/wiki/Carbon_dioxide_in_Earth%27s_atmosphere
	//https://www.co2.earth/co2-acceleration
	gCO2 = [randomNum(390, 405, 0), randomNum(1.5, 2.5, 1), '+']; //use ppm for units
	
	//http://climate.nasa.gov/vital-signs/sea-level/
	gSea = [randomNum(72, 78, 2), randomNum(2, 4, 2), '+']; //use mm for units
	
	gOrigStats["temperature"] = gTemperature[0];
	gOrigStats["forests"] = gForests[0];
	gOrigStats["co2"] = gCO2[0];
	gOrigStats["sea"] = gSea[0];
	
	// Update stats on DOM
	updateStatsDOM();
	
	// start timer
	//startTime();
	setInterval(startTime, 40);
	
	// alerts bouncing
	setInterval(alertsBounce, 2500);
	// official game loop
	setInterval(gameLoop, gLoopInterval);
	
	
	// Randomly pick 3 events, and drop them
	
	createEvents(3);
	
}

function restartGame(decision)
{
	if(decision == "decline")
	{
		closePopup();
		return;
	}
	
	for(var i = 0; i < events.length; i++)
	{
		events[i]["gStatus"] = null;
	}
	
	$("#history ul li").each(function() {
		if($(this).hasClass("start"))
			$(this).show();
		else
			$(this).remove();
	});
	
	$(".svg-alert").each(function() {
		if($(this).attr("id") != "alert-1")
			$(this).remove();
	});
	
	currDate = new Date();
	
	startGame();
}

var gNumAlerts = 1;
function newAlert(x, y, eventID)
{
	scaleVal = 0.016;
	$newAlert = $("#alert-1").clone();
	gNumAlerts++;
	
	$newAlert.attr("transform", "translate(" + x + ",-"+ + y + ") scale(" + scaleVal + ")");
	$newAlert.attr("id", "alert-"+gNumAlerts);
	$newAlert.attr("data-event", eventID);
	$newAlert.appendTo($("#svgContainer svg"));
	$newAlert.show();
}

function alertsBounce()
{
	if(gPause)
		return;
	
	$(".svg-alert").each(function() {
		if(!$(this).is(":hover"))
			bounce($(this));
	});
}

function openPopup(title, text, opts)
{
	gPause = 1;
	
	$("#popup h3").text(title);
	$("#popup .desc").text(text);
	
	$("#popup .opts > *").hide();
	
	if(opts != "")
		$("#popup .opts ."+opts).show();
	
	$("#popup").addClass("active");
	$("#overlay").addClass("active");
}

function openEvent(eventID)
{	
	for(var i = 0; i < events.length; i++)
	{
		if(events[i]["id"] == eventID)
			break;
	}
	
	if(i == events.length)
		return;
	
	openPopup(events[i]["title"], events[i]["text"], events[i]["type"]);
}

function makeDecision(decision, eventID)
{
	
	for(var i = 0; i < events.length; i++)
	{
		if(events[i]["id"] == eventID)
			break;
	}
	
	var temp_delta, forests_delta, co2_delta, sea_delta;
	
	if(decision == "accept")
	{
		var acceptID = events[i]["acceptID"];
		for(var j = 0; j < accepts.length; j++)
		{
			if(accepts[j]["id"] == acceptID)
				break;
		}
		
		temp_delta = accepts[j]["temp_delta"];
		forests_delta = accepts[j]["forest_delta"];
		co2_delta = accepts[j]["co2_delta"];
		sea_delta = accepts[j]["sea_delta"];
		
		events[i]["gStatus"] = "accepted";
	}
	else if(decision == "decline")
	{
		var declineID = events[i]["declineID"];
		for(var j = 0; j < declines.length; j++)
		{
			if(declines[j]["id"] == declineID)
				break;
		}
		
		temp_delta = declines[j]["temp_delta"];
		forests_delta = declines[j]["forest_delta"];
		co2_delta = declines[j]["co2_delta"];
		sea_delta = declines[j]["sea_delta"];

		events[i]["gStatus"] = "declined";
	}
	
	// apply delta to rate of change
	gTemperature[1] += temp_delta;
	gForests[1] += forests_delta;
	gCO2[1] += co2_delta;
	gSea[1] += sea_delta;
	
	console.log("----");
	console.log("Temperature: "+gTemperature);
	console.log("Forests: "+gForests);
	console.log("CO2: "+gCO2);
	console.log("Sea: "+gSea);
	console.log("----");
	
	// update the signs for each stat
	gTemperature[2] = gTemperature[1] > 0 ? '+' : gTemperature[1] == 0 ? '' : '-';
	gTemperature[1] = Math.abs(gTemperature[1]);
	
	gForests[2] = gForests[1] > 0 ? '+' : gForests[1] == 0 ? '' : '-';
	gForests[1] = Math.round(Math.abs(gForests[1]));
	
	gCO2[2] = gCO2[1] > 0 ? '+' : gCO2[1] == 0 ? '' : '-';
	gCO2[1] = Math.abs(gCO2[1]);
	
	gSea[2] = gSea[1] > 0 ? '+' : gSea[1] == 0 ? '' : '-';
	gSea[1] = Math.abs(gSea[1]);
	
	console.log("----");
	console.log("Temperature: "+gTemperature);
	console.log("Forests: "+gForests);
	console.log("CO2: "+gCO2);
	console.log("Sea: "+gSea);
	console.log("----");
	
	updateStatsDOM();
	
	// add event to history
	$("#history ul li.start").hide();
	$("#history ul").prepend("<li class=\""+events[i]["gStatus"]+"\"><h4>"+events[i]["title"]+"</h4><div>"+events[i]["text"]+"</div></li>");
	
	$(".svg-alert.open").remove();
}

function getSeconds(tracker, mills)
{
	return (tracker * mills) / 1000;
}

var gTimer = 0;
function gameLoop()
{
	if(gPause)
		return;
	
	gTimer++;
	
	// checks if 45 seconds has passed yet
	if(getSeconds(gTimer, gLoopInterval) % 45 == 0)
	{
		var numEvents = randomNum(1, 2, 0);
		
		if($(".svg-alert").length >= 6)
			return;
		else if($(".svg-alert").length + numEvents > 6)
		{
			if(numEvents == 2)
				numEvents = 1;
			else
				return;
		}
		
		// create 1 or 2 events
		createEvents(randomNum(1, 2, 0));
	}
	else if($(".svg-alert").length == 1) // no alerts are being shown (one alert is hidden for cloning)
	{
		createEvents(randomNum(2, 3, 0));
	}
	
	// check for passive events
	var threshold;
	for(var i = 0; i < events.length; i++)
	{
		// skip if event is not passive
		if(events[i]["type"] != "passiv" || events[i]["gStatus"] != null)
			continue;
		
		// if no threshold, then generate a random number to see if we should fire it now
		if(events[i]["threshold"] == null)
		{
			if(events[i]["gStatus"] != null)
				continue;
			
			var rand = randomNum(0, 100, 0);
			
			if(rand < 2)
				events[i]["gStatus"] = "fired";
		}
		else
		{
			// grab threshold info
			threshold = events[i]["threshold"].match(/"(.*?)"/g);
			for(var j = 0; j < threshold.length; j++)
				threshold[j] = threshold[j].replace(/"/g, "");
			
			
			// check if threshold has been met
			switch(threshold[0])
			{
				case "temperature":
					if(threshold[2] == "+")
					{
						if(gTemperature[0] > threshold[1])
							events[i]["gStatus"] = "fired";
					}
					else
					{
						if(gTemperature[0] < threshold[1])
							events[i]["gStatus"] = "fired";
					}
					break;
				case "sea":
					if(threshold[2] == "+")
					{
						if(gSea[0] > threshold[1])
							events[i]["gStatus"] = "fired";
					}
					else
					{
						if(gSea[0] < threshold[1])
							events[i]["gStatus"] = "fired";
					}
					break;
				case "co2":
					if(threshold[2] == "+")
					{
						if(gCO2[0] > threshold[1])
							events[i]["gStatus"] = "fired";
					}
					else
					{
						if(gCO2[0] < threshold[1])
							events[i]["gStatus"] = "fired";
					}
					break;
				case "forests":
					if(threshold[2] == "+")
					{
						if(gForests[0] > threshold[1])
							events[i]["gStatus"] = "fired";
					}
					else
					{
						if(gForests[0] < threshold[1])
							events[i]["gStatus"] = "fired";
					}
					break;
			}
			
		}
		
		// if event is fired, then set a timeout for it
		if(events[i]["gStatus"] == "fired")
		{
			(function(eventID)
			{
				setTimeout(function() {
					fireEvent(eventID);
				}, randomNum(3000, 15000, 0));
			})(i);
		}
		
	}
	
}

function fireEvent(eventID)
{
	// in case another event is already open, delay this one
	if($("#popup").hasClass("active"))
	{
		setTimeout(function() { fireEvent(eventID); }, 7000);
		return;
	}
	
	// show event
	openPopup(events[eventID]["title"], events[eventID]["text"], "confirm");
	
	// update stats + add event to history
	makeDecision("accept", events[eventID]["id"]);
}

function createEvents(n)
{
	for(var i = 0; i < n; i++)
	{
		var n = randomNum(0, events.length-1, 0)
		
		if(events[n]["gStatus"] == null && events[n]["type"] != "passiv") // if event hasn't been added yet, let's add it
		{
			// active on map
			events[n]["gStatus"] = "active";
			
			// generate alert with given x y positions, and event id
			newAlert(randomNum(100, 300, 0), randomNum(50, 200, 0), events[n]["id"]);
		}
		else // event has already been added, so keep looking
			i--;
	}
	alertsBounce();
}



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
var gPause = 0;

function startTime() {
	if(gPause)
		return;
	
	$("#current-date").text(currDate.toDateString().substring(4));
	
	var nextDay = new Date(currDate);
	nextDay = nextDay.setDate(nextDay.getDate() + 1);
	currDate = new Date(nextDay);
	
    //document.getElementById('txt').innerHTML = today.toDateString();
    //var t = setInterval(startTime, 500);
	
	// update stats
	
	gTemperature[0] += (gTemperature[2] == '-' ? -1 : 1) * gTemperature[1] / (365);
	gForests[0] += (gForests[2] == '-' ? -1 : 1) * gForests[1] / (365);
	gCO2[0] += (gCO2[2] == '-' ? -1 : 1) * gCO2[1] / (365);
	gSea[0] += (gSea[2] == '-' ? -1 : 1) * gSea[1] / (365);
	
	updateStatsDOM();
}


/*******************
* Game Logic
*	Game start, add 3 alerts, start off with randomly generated stats? Maybe random stats that are good?
*		going to start with random stats that are comparable to today's stats
*
*	If a decision is made after X number of days, randomly choose a decision
*		What should X be?
*			Going to be 15 seconds, maybe make it slowly fade out in the past 7 seconds or change colors?
*
*	While a decision is being made (i.e., the popup is open), pause or slow down the time?
*		decided to pause the time
*
*	Once a decision is made, update stats + images
*
*	Every X number of days add 1 or 2 events (max at 6)
*		If no events are available, immediately drop 2 or 3 events, and wait until 
*			X number of days to add more (this resets the timer for dropping more events)
*		What should X be?
*			Every 45 seconds
*
*	Game is over when stats are too bad (thresholds needed for this) or when they run out of events
*		Need to figure out how results should be shown
*******************/

