$(function() {
	xhr = new XMLHttpRequest();
	xhr.open("GET","Continents.svg",false);
	// Following line is just to be on the safe side;
	// not needed if your server delivers SVG with correct MIME type
	xhr.overrideMimeType("image/svg+xml");
	xhr.send("");
	document.getElementById("svgContainer")
		.appendChild(xhr.responseXML.documentElement);
		
	/*$("#svgContainer").on("mouseenter", "g", function() {
		$(this).css("fill", "#cccccc");
	}).on("mouseleave", "g", function() {
		$(this).css("fill", "#000000");
	});*/
	
	var mapPos = { 	normal: 				'0 0 468 239', 
							northamerica:		'43 5 173 105',
							southamerica: 	'115.5 101.7 60.5 99',
							europe: 				'200.1 7 91.7 61.8', 
							asia: 				'252.7 7.5 157.4 127.8', 
							africa: 				'200 65 89 106', 
							australia: 			'362.7 120.5 53.5 63.5'
						};
	var animTime = 200;
	
	/*$("#svgContainer").on("click", "g", function() {
		return;
		
		if($(this).hasClass("svg-alert"))
			return;
		
		if($(this).hasClass("active"))
		{
			$("#svgAnim-normal")[0].beginElement();
			$('svg#map')[0].setAttribute('viewBox', mapPos['normal']);
			$elem = $(this);
			
			//$("g[id^='alert']").removeClass("active");
			//scaleAlert2($("g[id^='alert']"), 0.025);
			//var attr = $("g[id^='alert']").attr("transform").replace("scale(0.015)", "scale(0.025)");
			//$("g[id^='alert']").attr("transform", attr);
			
			setTimeout(function() {
				$elem.removeClass("active");
				$("#svgContainer").removeClass("active");
				$(".svg-alert.active").removeClass("active");
			}, animTime);
		}
		else
		{
			var id = $(this).attr("id");
			$(".svg-alert").each(function() {
				if($(this).attr("data-continent") == id)
					$(this).addClass("active");
			});
			$(this).addClass("active");
			$("#svgContainer").addClass("active");
			setTimeout(function() {
				//var attr = $("g[id^='alert']").attr("transform").replace("scale(0.025)", "scale(0.015)");
				//$("g[id^='alert']").attr("transform", attr);
				//scaleAlert2($("g[id^='alert']"), 0.015);
				//$("g[id^='alert']").addClass("active");
				
				$("#svgAnim-"+id)[0].beginElement();
			}, animTime);
		}
	});*/
	
	
	$("#bounce").click(function() {
		rand = Math.floor(Math.random() * gNumAlerts)+1;
		bounce($("#alert-"+rand));
	});
	$("#rand").click(function() {
		rand1 = Math.floor(Math.random() * 468);
		rand2 = Math.floor(Math.random() * 239);
		
		newAlert(rand1, rand2);
	});
	
	
	/** BEGIN DEV STUFF **/
	$("#add-alert").click(function() {
		if($(this).is(":checked"))
		{
			newAlert(0, 0, 1);
		}
		else
		{
			$(".svg-alert.temp").remove();
		}
	});
	
	$("#svgContainer").on("mousemove", function(e) {
		svg = document.getElementById("map");
		pt = svg.createSVGPoint();
		pt.x = e.clientX-9;
		pt.y = e.clientY-21;
		loc = pt.matrixTransform(svg.getScreenCTM().inverse());
		scaleVal = 0.016;
		
		if($(".svg-alert.temp").length == 1)
		{
			loc.x = loc.x.toFixed(2);
			loc.y = loc.y.toFixed(2);
			$(".svg-alert.temp").attr("transform", "translate(" + loc.x + "," + loc.y + ") scale(" + scaleVal + ")");
		}
	});
	
	/** END DEV STUFF **/
	
	alertsBounceLoop();
});

function alertsBounceLoop()
{
	if(!$("#svgContainer").hasClass("active"))
	{
		$(".svg-alert").each(function() {
			if(!$(this).is(":hover"))
				bounce($(this));
		});
	}
	setTimeout(alertsBounceLoop, 2500);
}

/*function scaleAlert2($elem, scaleTo)
{
	bleh = $elem.attr("transform").match("translate\(([^)]+)\)(.*?)")[0];
	bleh2 = bleh.split(",");
	
	cx = parseInt(bleh2[0].replace(/^\D+/g, ''));
	cy = parseInt(bleh2[1].replace(/^\D+/g, ''));
	
	$elem.animate(
		{ scale: scaleTo },
		{ duration: 200,
		  step: function(now, fx) {
				scaleVal = now;
				$elem.attr("transform", "translate(" + cx + "," + cy + ") scale(" + scaleVal + ")");
			} 
		}
	);
}

function scaleAlert($elem, scaleTo)
{
	var box = $elem[0].getBBox();
	var cx = box.x + box.width/2;
	var cy = box.y + box.height/2;
	
	bleh = $elem.attr("transform").match("translate\(([^)]+)\)(.*?)")[0];
	bleh2 = bleh.split(",");
	
	cx = parseInt(bleh2[0].replace(/^\D+/g, ''));
	cy = parseInt(bleh2[1].replace(/^\D+/g, ''));
	
	$elem.animate(
		{ scale: scaleTo },
		{ duration: 200,
		  step: function(now, fx) {
				scaleVal = now;
				$elem.attr("transform", "translate(" + (cx * (1 - scaleVal)) + "," + (cy * (1 - scaleVal)) + ") scale(" + scaleVal + ")");
				//$elem.attr("transform", "translate(" + cx + "," + cy + ") scale(" + scaleVal + ") translate(" + ((-cx)*(scaleVal-1)) + "," +((-cy)*(scaleVal-1)) + ")");
			} 
		}
	);
}*/

gNumAlerts = 1;
function newAlert(x, y, temp)
{
	scaleVal = 0.016;
	$newAlert = $("#alert-1").clone();
	gNumAlerts++;
	
	$newAlert.attr("transform", "translate(" + x + ",-100) scale(" + scaleVal + ")");
	$newAlert.attr("id", "alert-"+gNumAlerts);
	$newAlert.appendTo($("#svgContainer svg"));
	//$newAlert.animate({ "transform": "translate(" + x + "," + y + ") scale(" + scaleVal + ")"}, 1);
	if(temp == 1)
		$newAlert.addClass("temp");
	else
		bounceLoop($newAlert, 6, 5, y, x, scaleVal, 120);
}

function bounce($elem)
{
	bleh = $elem.attr("transform").match("translate\(([^)]+)\)(.*?)")[0];
	bleh2 = bleh.split(",");
	
	cx = parseInt(bleh2[0].replace(/^\D+/g, ''));
	cy = parseInt(bleh2[1].replace(/^\D+/g, ''));
	
	scaleVal = 0.016;
	//$elem.animate({ "transform": "translate(" + cx + "," + cy + ") scale(" + scaleVal + ")"}, 1);
	bounceLoop($elem, 1, 5, cy, cx, scaleVal, 0);
}

function bounceLoop($elem, run, mod, cy, cx, scaleVal, dur)
{
	
	if(run%2 == 0)
		val = 0;
	else
	{
		val = mod;
		mod = mod / 2;
	}
	
	if(dur == 0)
		dur = 100 - (Math.pow(run, 2));
		
	
	$elem.animate(
		{ translate: cy-val },
		{ 
			duration: dur,
			step: function(now, fx) {
						$elem.attr("transform", "translate(" + cx + "," + now + ") scale(" + scaleVal + ")");
					},
			queue: false
		}
	).promise().done(function() {
		if(run < 6)
			bounceLoop($elem, run+1, mod, cy, cx, scaleVal, 0);
	});
}
