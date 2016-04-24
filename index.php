<?php
    require_once 'data/data.php';

    $data   = OurClimateData::getInstance();
    $questions = $data->getAccDecQuestions();
?>

<!DOCTYPE html>

<html lang="en">
	<head>
		<meta content="text/html;charset=utf-8" http-equiv="Content-Type">
		<meta content="utf-8" http-equiv="encoding">
		
		<link rel="stylesheet" href="css/font-awesome.min.css">
		<link rel="stylesheet" href="css/main.css">
		<link rel="stylesheet" href="css/map.css">
        <!-- Add IntroJs styles -->
        <link href="js/introjs.css" rel="stylesheet">
		
		<script src="js/jquery-1.12.1.min.js" type="text/javascript"></script>
		<script src="js/map.js" type="text/javascript"></script>
		<script src="js/main.js" type="text/javascript"></script>
	<body>
		<div id="overlay"></div>
        <div id="popup">
			<div class="close"></div>
			<h3>Sample question goes here</h3>
			<div class="desc">Descriptions and stuff will go here</div>
			<ul class="options">
				<li><label><input type="radio" name="sample" /> Option 1</label></li>
				<li><label><input type="radio" name="sample" /> Option 2</label></li>
				<li><label><input type="radio" name="sample" /> Option 3</label></li>
			</ul>
		</div>
		<div id="top">
			<div id="history" data-step="1" data-intro="This will provide you with the history of your decisions">
				<div class="title">History</div>
                <div class="filler"></div>
				<ul>
					<li>
						<h4>Sample Event</h4>
						<div>Omigawd someone blew up the dam!</div>
					</li>
                    <li>
						<h4>Sample Event 2</h4>
						<div>Omigawd Michael Jackson is alive!</div>
					</li>
					<li>
						<h4>Sample Event 3</h4>
						<div>Nvm that's just Morgan Freeman!</div>
					</li>
				</ul>
			</div>
			<div id="current-date" data-step="2" data-intro="This is the current time in the simulation. Keep an eye on it!" data-position='right'>Date</div>
			<div id="menu">
				<span>Menu</span>
				<ul>
					<li class="about">About</li>
                    <li class="help"><a href="javascript:void(0);" onclick="javascript:introJs().start();">Help</a></li>
					<li class="restart">Restart</li>
				</ul>
			</div>
		</div>
		<div id="svgContainer" data-step="3" data-intro="This is the globe! Alerts will pop up on the map. Make sure you complete these to save the planet.">
		</div>
		
		<!--<button id="bounce">Bounce Random Alert</button>
		<button id="rand">Generate Alert</button>
		<label>Add Alert <input type="checkbox" id="add-alert" /></label>-->
		
		<div id="bottom">
			<ul>
				<li class="temp">
					<div class="change">+3.9</div>
					<div class="info">
						<h4>Global Temperature</h4>
						<span>14 F since 1980</span>
					</div>
					<div class="graphic"></div>
				</li>
				<li class="forst">
					<div class="change">+3.9</div>
					<div class="info">
						<h4>Forests</h4>
						<span>14 F since 1980</span>
					</div>
					<div class="graphic"></div>
				</li>
				<li class="co2">
					<div class="change">+3.9</div>
					<div class="info">
						<h4>Carbon Dioxide Level</h4>
						<span>14 F since 1980</span>
					</div>
					<div class="graphic"></div>
				</li>
				<li class="sea">
					<div class="change">+3.9</div>
					<div class="infa">
						<h4>Sea Level</h4>
						<span>14 F since 1980</span>
					</div>
					<div class="graphic"></div>
				</li>
			</ul>
		</div>
        <script type="text/javascript" src="js/intro.js"></script>
	</body>
</html>












