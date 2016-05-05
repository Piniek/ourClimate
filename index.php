<?php
    require_once 'data/data.php';

    $data   = OurClimateData::getInstance();
    $questions = json_encode($data->getAccDecQuestions());
    $accept_stats = json_encode($data->getAcceptStats());
    $decline_stats = json_encode($data->getDeclineStats());
	//echo "<div style='display:none'>";
    //echo $questions;
    //echo "\n--------\n";
    //echo $accept_stats;
    //echo "\n--------\n";
    //echo $decline_stats;
	//echo "</div>";

?>

<!DOCTYPE html>

<html lang="en">
	<head>
        <!-- Google Analytics Content Experiment code -->
<script>function utmx_section(){}function utmx(){}(function(){var
k='120885884-0',d=document,l=d.location,c=d.cookie;
if(l.search.indexOf('utm_expid='+k)>0)return;
function f(n){if(c){var i=c.indexOf(n+'=');if(i>-1){var j=c.
indexOf(';',i);return escape(c.substring(i+n.length+1,j<0?c.
length:j))}}}var x=f('__utmx'),xx=f('__utmxx'),h=l.hash;d.write(
'<sc'+'ript src="'+'http'+(l.protocol=='https:'?'s://ssl':
'://www')+'.google-analytics.com/ga_exp.js?'+'utmxkey='+k+
'&utmx='+(x?x:'')+'&utmxx='+(xx?xx:'')+'&utmxtime='+new Date().
valueOf()+(h?'&utmxhash='+escape(h.substr(1)):'')+
'" type="text/javascript" charset="utf-8"><\/sc'+'ript>')})();
</script><script>utmx('url','A/B');</script>
<!-- End of Google Analytics Content Experiment code -->

		<meta content="text/html;charset=utf-8" http-equiv="Content-Type">
		<meta content="utf-8" http-equiv="encoding">
		
		<link rel="stylesheet" href="css/font-awesome.min.css">
		<link rel="stylesheet" href="css/main.css">
		<link rel="stylesheet" href="css/map.css">
        <!-- Add IntroJs styles -->
        <link href="js/introjs.css" rel="stylesheet">
		
		<script src="js/jquery-1.12.1.min.js" type="text/javascript"></script>
		<script src="js/Chart.min.js" type="text/javascript"></script>
		<script src="js/map.js" type="text/javascript"></script>
		<script type="text/javascript">
			var events = <?php echo $questions; ?>;
			var accepts = <?php echo $accept_stats; ?>;
			var declines = <?php echo $decline_stats; ?>;
		</script>
		<script src="js/main.js" type="text/javascript"></script>
        <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-76827596-1', 'auto');
  ga('send', 'pageview');

</script>
    </head>
	<body>
		<div id="overlay"></div>
        <div id="popup">
			<div class="close"></div>
			<h3>Sample question goes here</h3>
			<div class="desc">Descriptions and stuff will go here</div>
			<div class="opts">
				<ul class="options">
					<li><label><input type="radio" name="sample" /> Option 1</label></li>
					<li><label><input type="radio" name="sample" /> Option 2</label></li>
					<li><label><input type="radio" name="sample" /> Option 3</label></li>
				</ul>
				<div class="accdec">
					<div class="accept">Accept</div>
					<div class="decline">Decline</div>
				</div>
				<div class="confirm">Okay</div>
				<div class="graph">
					<ul>
						<li class="active" data-stat="temperature">Temperature</li>
						<li data-stat="forests">Forests</li>
						<li data-stat="co2">CO2 Level</li>
						<li data-stat="sea">Sea Level</li>
					</ul>
					<div class="chartChoice">
						<span class="active" data-choice="vals">Level</span>
						<span data-choice="rate">Rate of Change</span>
					</div>
					<canvas id="statsChart" width="400" height="400"></canvas>
				</div>
			</div>
		</div>
		<div id="top">
			<div id="history" data-step="1" data-intro="This will provide you with the history of your decisions">
				<div class="title">History</div>
                <div class="filler"></div>
				<ul>
					<li class="start">
						<h4>Welcome!</h4>
						<div>Make a decision, and they'll start showing up here.</div>
					</li>
				</ul>
			</div>
			<div id="graph">
				<div class="title" data-step="5" data-intro="These will show you graphs that represent the changing stats over time. Keep an eye out on how your decisions are affecting these!" data-position='bottom'>Data</div>
			</div>
			<div id="current-date" data-step="2" data-intro="This is the current time in the simulation. Keep an eye on it!" data-position='right'>
			</div>
			<div id="menu">
                <div class="button" data-step="7" data-intro="Take our survey so we can improve" data-position='bottom'><a href="https://docs.google.com/a/stevens.edu/forms/d/1AHLz_QJc1Dm7Odzcs0hkRSsuQFCI4VKTJY9PZj9NI-4/viewform">Take Survey</a></div>
                <a href="https://twitter.com/intent/tweet?button_hashtag=ourClimateApp&text=I%20attempted%20to%20save%20our%20planet%20from%20climate%20change%20using%20the%20" class="twitter-hashtag-button">Tweet #ourClimateApp</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
				<span data-step="6" data-intro="Opening the Menu will allow you to see these tooltips again, as well as restart your progress to start fresh!" data-position='bottom'>Menu</span>
				<ul>
					<li class="about">About</li>
                    <li class="help"><a href="javascript:void(0);" onclick="javascript:introJs().start();">Help</a></li>
					<li class="restart">Restart</li>
				</ul>
			</div>
		</div>
        <div id="bottom">
			<ul>
				<li class="temp" data-step="4" data-intro="These represent the current status of the world's climate. These stats will change as you make your decisions" data-position='bottom'>
					<div class="graphic"><img src='./img/temperature/3.png' /></div>
					<div class="change">+3.9</div>
					<div class="info">
						<h4>Global Temperature</h4>
						<span>14 F since 1980</span>
					</div>
				</li>
				<li class="forest">
					<div class="graphic"><img src='./img/forests/3.png' /></div>
					<div class="change">+3.9</div>
					<div class="info">
						<h4>Forests</h4>
						<span>14 F since 1980</span>
					</div>
				</li>
				<li class="co2">
					<div class="graphic"><img src='./img/co2/3.png' /></div>
					<div class="change">+3.9</div>
					<div class="info">
						<h4>Carbon Dioxide Level</h4>
						<span>14 F since 1980</span>
					</div>
				</li>
				<li class="sea">
					<div class="graphic"><img src='./img/sea/5.png' /></div>
					<div class="change">+3.9</div>
					<div class="info">
						<h4>Sea Level</h4>
						<span>14 F since 1980</span>
					</div>
				</li>
			</ul>
		</div>
		<div id="svgContainer" data-step="3" data-intro="This is the globe! Red pin alerts will pop up on the map. Make sure you complete these by clicking on them. Help save the planet!">
		</div>
		
		<!--<button id="bounce">Bounce Random Alert</button>
		<button id="rand">Generate Alert</button>
		<label>Add Alert <input type="checkbox" id="add-alert" /></label>-->
		
        <script type="text/javascript" src="js/intro.js"></script>
	</body>
</html>





