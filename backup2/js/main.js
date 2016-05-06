var gLoopInterval = 100;

$(function() {
	$("#menu span").click(function() {
		$("#menu").toggleClass("active");
	});
	
	$("#history .title").click(function() {
		if(!$("#history").hasClass("active"))
		{
			gPause = 1;
			$("#history ul").scrollTop(0);
		}
		else
			gPause = 0;
		
		$("#history").toggleClass("active");
		$("#overlay").toggleClass("active");
	});
	
	$("#menu .about").click(function() {
		openPopup("About", "This is an HCI project created by four people. One of them misses Five Guys & In-N-Out.", "confirm");
	});
	
	$("#graph .title").click(function() {
		openChart($("#popup .graph ul li.active").attr("data-stat"), $("#popup .graph .chartChoice span.active").attr("data-choice"), 1);
	});
	
	$("#popup .graph ul li").click(function() {
		$("#popup .graph ul li.active").removeClass("active");
		$(this).addClass("active");
		openChart($(this).attr("data-stat"), $("#popup .graph .chartChoice span.active").attr("data-choice"), 0);
	});
	
	$("#popup .graph .chartChoice span").click(function() {
		$("#popup .graph .chartChoice span.active").removeClass("active");
		$(this).addClass("active");
		openChart($("#popup .graph ul li.active").attr("data-stat"), $(this).attr("data-choice"), 0);
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
	
	$("#current-date").text(currDate.toDateString().substring(4));
	
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
		
		//closePopup();
	});
	
});
var gIntro = 0;
function showIntro()
{
	gIntro = 1;
	openPopup("Welcome!", "Hi, welcome to the ourClimate app. ourClimate will challenge you with real world issues that arise everyday. You will control the environment through a number of law making decisions. We will get you started with a quick tutorial.", "confirm");
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


var gHistory, gTempHistory, gForestsHistory, gCO2History, gSeaHistory;
gHistory = [];
gStatsHistory = {
	"temperature":
	{
		"rate": [],
		"vals": [],
	},
	"forests":
	{
		"rate": [],
		"vals": [],
	},
	"co2":
	{
		"rate": [],
		"vals": [],
	},
	"sea":
	{
		"rate": [],
		"vals": [],
	}
};
gTempHistory = {"rate": [], "vals": []};
gForestsHistory = {"rate": [], "vals": []};
gCO2History = {"rate": [], "vals": []};
gSeaHistory = {"rate": [], "vals": []};
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
	closePopup();
	
	if(decision == "decline")
		return;
	
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
	
	gGameOver = 0;
	
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
	$("#popup .desc").html(text);
	
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
	
	var text = "<div class='graphic'><img src='./img/events/"+events[i]["id"]+".png' alt='"+events[i]["title"]+"' /></div>";
	text += events[i]["text"];
	
	openPopup(events[i]["title"], text, events[i]["type"]);
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
		
		if(events[i]["type"] != "passiv")
			openPopup(events[i]["title"], events[i]["accept_result"], "confirm");
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
		
		if(events[i]["type"] != "passiv")
			openPopup(events[i]["title"], events[i]["decline_result"], "confirm");
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
	gForests[1] = Math.round(Math.abs(gForests[1]));
	
	gCO2[2] = gCO2[1] > 0 ? '+' : gCO2[1] == 0 ? '' : '-';
	gCO2[1] = Math.abs(gCO2[1]);
	
	gSea[2] = gSea[1] > 0 ? '+' : gSea[1] == 0 ? '' : '-';
	gSea[1] = Math.abs(gSea[1]);
	
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
var gGameOver = 0;
function gameLoop()
{
	if(gPause)
		return;
	
	if(gGameOver)
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
			
			var rand = randomNum(0, 1000, 0);
			
			if(rand < 100 && rand >= 98)
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
	
	var text = "<div class='graphic'><img src='./img/events/"+events[i]["id"]+".png' alt='"+events[i]["title"]+"' /></div>";
	text += events[i]["text"];
	
	// show event
	openPopup(events[eventID]["title"], text, "confirm");
	
	// update stats + add event to history
	makeDecision("accept", events[eventID]["id"]);
}

function createEvents(n)
{
	var i;
	
	for(i = 0; i < events.length; i++)
	{
		if(events[i]["gStatus"] == null && events[i]["type"] != "passiv")
			break;
	}
	
	if(i == events.length)
	{
		openPopup("Congrats!", "You have completed the game! Thank you for playing, and please take our survey if you haven't yet. Thanks!", "confirm");
		gGameOver = 1;
		return;
	}
	
	for(i = 0; i < n; i++)
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
var currMonth = "";

function startTime() {
	if(gPause)
		return;
	if(gGameOver)
		return;
	
	if(currMonth != monthNames[currDate.getMonth()])
	{
		currMonth = monthNames[currDate.getMonth()];
		
		updateHistory();
	}
	
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

function updateHistory()
{
	var pastLimit = 12; // number of months to show total
	var shiftFlag = 0;
	var val, rate;
	
	if(gHistory.length >= pastLimit)
	{
		gHistory.shift();
		shiftFlag = 1;
	}
	
	gHistory.push(currMonth);
	
	for (var key in gStatsHistory) {
		if(key == "temperature")
		{
			val = gTemperature[0].toFixed(2);
			rate = gTemperature[1].toFixed(2);
			rate = gTemperature[2] == '-' ? -1 * rate : rate;
		}
		else if(key == "forests")
		{
			val = gForests[0].toFixed(0);
			rate = gForests[1].toFixed(2);
			rate = gForests[2] == '-' ? -1 * rate : rate;
		}
		else if(key == "co2")
		{
			val = gCO2[0].toFixed(2);
			rate = gCO2[1].toFixed(2);
			rate = gCO2[2] == '-' ? -1 * rate : rate;
		}
		else if(key == "sea")
		{
			val = gSea[0].toFixed(2);
			rate = gSea[1].toFixed(2);
			rate = gSea[2] == '-' ? -1 * rate : rate;
		}
		
		if(shiftFlag)
		{
			gStatsHistory[key]["vals"].shift();
			gStatsHistory[key]["rate"].shift();
		}
		
		gStatsHistory[key]["vals"].push(val);
		gStatsHistory[key]["rate"].push(rate);
	}
}

var gLineChart;

function openChart(stat, choice, open)
{
	var ctx = $("#statsChart");
	var data = {
		labels: gHistory,
		datasets: [
			{
				label: "",
				fill: false,
				lineTension: 0.1,
				backgroundColor: "rgba(75,192,192,0.4)",
				borderColor: "rgba(75,192,192,1)",
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: "rgba(75,192,192,1)",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: "rgba(75,192,192,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: gStatsHistory[stat][choice],
			}
		]
	};
	
	if(gLineChart != null)
		gLineChart.destroy();
	
	// hide legend
	Chart.defaults.global.legend = false;
	// just to add padding to top of graph
	Chart.defaults.global.title["display"] = true;
	
	gLineChart = new Chart(ctx, {
		type: 'line',
		data: data,
		options: {}
	});
	
	if(open)
		openPopup("Data", "", "graph");
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

