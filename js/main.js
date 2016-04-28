var gLoopInterval = 100;

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
		gPause = 0;
	});
	
	/*$(".svg-alert").click(function() {
		$("#popup").addClass("active");
		$("#overlay").addClass("active");
	});*/
	
	$("#popup .close").click(function() {
		$("#popup").removeClass("active");
		$("#overlay").removeClass("active");
		gPause = 0;
	});
	
	$(window).resize(function() {
	  resize();
	});
	resize();
	startTime();
	setInterval(startTime, 40);
	
	startGame();
	
	setInterval(alertsBounce, 2500);
	setInterval(gameLoop, gLoopInterval);
	
	$("#svgContainer").on("click", "g.svg-alert", function() {
		$(this).addClass("open");
		openEvent(parseInt($(this).attr("data-event")));
	});
	
	$("#popup .accdec div").click(function() {
		makeDecision($(this).attr("class"));
	});
	
});

var events = [
					{"id":1,"title":"Limit Transportation","text":"Request for the limit of 1 automobile per household. Fines will be issued for the breaking of this law.\r\n","provided_answer":null,"acceptID":2,"declineID":1,"type":"accdec","threshold":null,"location":null, "gStatus": null},
					{"id":2,"title":"Eliminate Subsidies for Fuel Use\r\n","text":"Eliminating these subsidies could reduce energy use and decrease carbon emission levels. \r\n","provided_answer":null,"acceptID":2,"declineID":1,"type":"accdec","threshold":null,"location":null, "gStatus": null},
					{"id":3,"title":"Reduce Regulatory Barriers for New Nuclear Power Plants\r\n","text":"Allowing more nuclear power plants to be made will cut back on other traditional energy sources which have high co2 emission rates. \r\n","provided_answer":null,"acceptID":2,"declineID":1,"type":"accdec","threshold":null,"location":null, "gStatus": null},
					{"id":4,"title":"Create Forest Management Institutions\r\n","text":"Decreasing Wildfires and having more regulated forest management could lead to a decrease in CO2 emissions. \r\n","provided_answer":null,"acceptID":3,"declineID":1,"type":"accdec","threshold":null,"location":null, "gStatus": null},
					{"id":5,"title":"Invest in Biotechnology\r\n","text":"It could be possible to use biotechnology to create tress that will absorb CO2 faster, as well as create crops that can thrive in a post climate change environment. \r\n","provided_answer":null,"acceptID":2,"declineID":1,"type":"accdec","threshold":null,"location":null, "gStatus": null},
					{"id":6,"title":"Repeal the National Flood Insurance Program\r\n","text":"Now that the sea level is so high, floods will be commonplace. If you remove the insurance it will encourage people to leave because of the impending floods. \r\n","provided_answer":null,"acceptID":1,"declineID":1,"type":"accdec","threshold":"{\"sea\", \"33\", \"+\"}","location":"america", "gStatus": null},
					{"id":7,"title":"Increase use of Congestion Pricing on Toll Roads\r\n","text":"Congestion Pricing will encourage people to carpool, thereby lowering the c02 emission rates.\r\n","provided_answer":null,"acceptID":2,"declineID":1,"type":"accdec","threshold":null,"location":null, "gStatus": null},
					{"id":8,"title":"Subsidize the Replacement of Older Automobiles\r\n","text":"If the trade in of older cars was encouraged we could replace them with more fuel efficient vehicles.\r\n","provided_answer":null,"acceptID":2,"declineID":1,"type":"accdec","threshold":null,"location":null, "gStatus": null},
					{"id":9,"title":"Reform Air Traffic Control Systems\r\n","text":"The current system has many planes using holding patterns and runway delays, reform so that more direct routes become available, decreasing the amount of time that the planes are in the air. \r\n","provided_answer":null,"acceptID":2,"declineID":1,"type":"accdec","threshold":null,"location":null, "gStatus": null},
					{"id":10,"title":"Remove environmental regulations for new energy facilities\r\n","text":"Reducing these could possibly allow more old facilities to be replaced with new, cleaner ones.\r\n","provided_answer":null,"acceptID":3,"declineID":1,"type":"accdec","threshold":null,"location":null, "gStatus": null},
					{"id":11,"title":"Subsidize Research for New Technologies\r\n","text":"Subsidizing research for new technologies related to climate change will incentivize more researchers to get involved. \r\n","provided_answer":null,"acceptID":1,"declineID":1,"type":"accdec","threshold":null,"location":null, "gStatus": null},
					{"id":12,"title":"Expand and Modernize the Electric Grid\r\n","text":"This will allow for more use of solar and wind energy, decreasing use of fossil fuels. \r\n","provided_answer":null,"acceptID":3,"declineID":1,"type":"accdec","threshold":null,"location":"america", "gStatus": null},
					{"id":13,"title":"The Kyoto Protocol","text":"A worldwide effort to reduce CO2 emissions, signed by many different countries. \r\n","provided_answer":null,"acceptID":4,"declineID":1,"type":"accdec","threshold":null,"location":"japan", "gStatus": null},
					{"id":14,"title":"Subsidize purchases of electric cars ","text":"Electric cars, when powered by nuclear energy, have much less emission rates than traditional cars. Subsidizing the use would enourage more adopters. ","provided_answer":null,"acceptID":3,"declineID":1,"type":"accdec","threshold":null,"location":null, "gStatus": null},
					{"id":15,"title":"Massive Flooding","text":"The sea has gotten to a point where massive flooding can be seen, and people have begun moving inland. ","provided_answer":null,"acceptID":1,"declineID":1,"type":"passiv","threshold":"{\"sea\", \"40\", \"+\"}","location":null, "gStatus": null},
					{"id":16,"title":"Technology Breakthrough","text":"Thanks to research subsidies, there has been a techonological breakthrough that significantly decreases CO2 emissions.","provided_answer":null,"acceptID":1,"declineID":1,"type":"passiv","threshold":null,"location":null, "gStatus": null},
					{"id":17,"title":"Widespread Droughts","text":"Droughts are becoming a huge problem throughout the world due to the rising temperature.","provided_answer":null,"acceptID":1,"declineID":1,"type":"passiv","threshold":"{\"temperature\", \"32\", \"+\"}","location":null, "gStatus": null},
					{"id":18,"title":"Nuisance Flooding","text":"With the sea level at its current state, nuisance flooding will be a common occurrence. Flooding now occurs frequently only when confronted with high tide conditions.","provided_answer":null,"acceptID":1,"declineID":1,"type":"passiv","threshold":"{\"sea\", \"32\", \"+\"}","location":null, "gStatus": null},
					{"id":19,"title":"Air Pollution","text":"The rising temperatures have caused significant air pollution by increasing the ground level ozone. People could begin feeling the effects of this.","provided_answer":null,"acceptID":1,"declineID":1,"type":"passiv","threshold":"{\"temperature\", \"36\", \"+\"}","location":null, "gStatus": null}
				];
				
var accepts = [
					{"id":1,"temp_delta":0,"forest_delta":0,"co2_delta":0,"sea_delta":0},
					{"id":2,"temp_delta":0,"forest_delta":0,"co2_delta":-100,"sea_delta":0},
					{"id":3,"temp_delta":0,"forest_delta":1,"co2_delta":-100,"sea_delta":0},
					{"id":4,"temp_delta":0,"forest_delta":0,"co2_delta":-1000,"sea_delta":0}
				];

var declines = [
					{"id":1,"temp_delta":0,"forest_delta":0,"co2_delta":0,"sea_delta":0}
				];
				
function randomNum(min, max, dec)
{
	return parseFloat((Math.random()*(max-min)+min).toFixed(dec));
}

function updateStatsDOM()
{
	// Temperature
	$("li.temp .change").text(gTemperature[2]+""+Math.abs(gTemperature[1]));
	
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
	$("li.co2 .change").text(gCO2[2]+""+Math.abs(gCO2[1]));
	
	if(gCO2[2] == '-')
		$("li.co2 .change").removeClass("up").addClass("down");
	else if(gCO2[2] == '+')
		$("li.co2 .change").addClass("up").removeClass("down");
	else
		$("li.co2 .change").removeClass("up").removeClass("down");
	
	$("li.co2 .info span").text(gCO2[0].toFixed(2)+" ppm");
	
	// Sea
	$("li.sea .change").text(gSea[2]+""+Math.abs(gSea[1]));
	
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

function startGame()
{
	
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
	
	// Update stats on DOM
	updateStatsDOM();
	
	// Randomly pick 3 events, and drop them
	
	createEvents(3);
	
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
	$(".svg-alert").each(function() {
		if(!$(this).is(":hover"))
			bounce($(this));
	});
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
	
	gPause = 1;
	
	$("#popup h3").text(events[i]["title"]);
	$("#popup .desc").text(events[i]["text"]);
	
	
	if(events[i]["type"] == "accdec")
	{
		$("#popup .accdec").show();
		$("#popup .options").hide();
	}
	
	$("#popup").addClass("active");
	$("#overlay").addClass("active");
}

function makeDecision(decision)
{
	var eventID = parseInt($(".svg-alert.open").attr("data-event"));
	
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
	}
	
	// apply delta to rate of change
	gTemperature[1] += temp_delta;
	gForests[1] += forests_delta;
	gCO2[1] += co2_delta;
	gSea[1] += sea_delta;
	
	// update the signs for each stat
	gTemperature[2] = gTemperature[1] > 0 ? '+' : gTemperature[1] == 0 ? '' : '-';
	gTemperature[1] = Math.abs(gTemperature[1]);
	
	gForests[2] = gForests[1] > 0 ? '+' : gForests[1] == 0 ? '' : '-';
	gForests[1] = Math.abs(gForests[1]);
	
	gCO2[2] = gCO2[1] > 0 ? '+' : gCO2[1] == 0 ? '' : '-';
	gCO2[1] = Math.abs(gCO2[1]);
	
	gSea[2] = gSea[1] > 0 ? '+' : gSea[1] == 0 ? '' : '-';
	gSea[1] = Math.abs(gSea[1]);
	
	updateStatsDOM();
	
	// close popup and remove alert
	$("#popup").removeClass("active");
	$("#overlay").removeClass("active");
	gPause = 0;
	
	$(".svg-alert.open").remove();
	events[i]["gStatus"] = "history";
}

function getSeconds(tracker, mills)
{
	return (tracker * mills) / 1000;
}

var gTimer = 0;
function gameLoop()
{
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

