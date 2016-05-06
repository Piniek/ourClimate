-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 05, 2016 at 04:55 AM
-- Server version: 5.6.26
-- PHP Version: 5.6.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ourclimate`
--
CREATE DATABASE IF NOT EXISTS `ourclimate` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `ourclimate`;

-- --------------------------------------------------------

--
-- Table structure for table `accdec_questions`
--

DROP TABLE IF EXISTS `accdec_questions`;
CREATE TABLE IF NOT EXISTS `accdec_questions` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `text` TEXT NOT NULL,
  `provided_answer` tinyint(1) DEFAULT NULL,
  `acceptID` int(11) NOT NULL,
  `declineID` int(11) NOT NULL,
  `type` char(6) NOT NULL,
  `threshold` varchar(50) DEFAULT NULL,
  `location` varchar(20) DEFAULT NULL,
  `accept_result` TEXT NOT NULL,
  `decline_result` TEXT NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `accdec_questions`:
--

--
-- Dumping data for table `accdec_questions`
--

INSERT INTO `accdec_questions` (`id`, `title`, `text`, `provided_answer`, `acceptID`, `declineID`, `type`, `threshold`, `location`, `accept_result`, `decline_result`) VALUES
(1, 'Limit Transportation', 'Request for the limit of 1 automobile per household. Fines will be issued for the breaking of this law. This will put serious strain on the public transportation system, and serious restructuring will be required. \r\n', NULL, 2, 1, 'accdec', NULL, NULL, 'Your decision led to the following:<ul><li>Outrage and protests from owners of multiple cars</li><li>Government talks regarding the restructing and expansion of public transportation systems</li><li>Decreased CO2 emissions by reducing number of cars on the road</li><li>Automobile sales fall drastically</li></ul>', 'Your decision led to the following:<ul><li>Automobile industry continues to expand</li><li>CO2 emissions continue to rise as petrol vehicles continue to fill the roads</li></ul>'),
(2, 'Eliminate Subsidies for Fuel Use\r\n', 'Eliminating these subsidies could reduce energy use and decrease carbon emission levels. Cutting these subsidies will anger the oil companies, and it may be hard to pass legislation in the future. \r\n', NULL, 2, 1, 'accdec', NULL, NULL, 'Your decision led to the following:<ul><li>Oil prices skyrocketed</li><li>Decreased CO2 emissions</li><li>People around the world find public transportation more cost effective, leaving their cars at home. Those living in cities with no public transportation suffer from the increased gas prices</li><li>he hike in gas prices increases demand for hybrid vehicles and companies started investing more in renewable energy</li></ul>', 'Your decision led to the following:<ul><li>Gas became extremely inexpensive, because of the low price of oil</li><li>There is increased traffic on the roads, causing grid lock and many accidents</li><li>Increased CO2 emissions as a result of the higher demand for oil</li></ul>'),
(3, 'Reduce Regulatory Barriers for New Nuclear Power Plants\r\n', 'Allowing more nuclear power plants to be made will cut back on other traditional energy sources which have high CO2 emission rates. This could upset some workers in the older coal power plants. \r\n', NULL, 2, 1, 'accdec', NULL, NULL, 'Your decision led to the following:<ul><li>The number of nuclear power plants increased dramatically</li><li>Decreased CO2 emissions </li><li>While new nuclear plants offered jobs previously unavailable, there are increased job loss rates reported in traditional coal power plants</li><li>Many people are forced to relocate their houses to make room for the additional power plants, causing tension in many communities</li></ul>', 'Your decision led to the following:<ul><li>CO2 emissions continue to rise, as more traditional coal power plants are built and maintained</li></ul>'),
(4, 'Create Forest Management Institutions\r\n', 'Decreasing wildfires and having more regulated forest management could lead to a decrease in CO2 emissions.  Creating this institution is be a serious undertaking and will cost the government millions. \r\n', NULL, 5, 1, 'accdec', NULL, NULL, 'Your decision led to the following:<ul><li>The number of wildfires is greatly reduced</li><li>Number of firefighters battling wildfires reduced, increasing response time in the cities</li><li>This program cost millions of dollars to implement, which had to be cut from other government programs</li></ul>', 'Your decision led to the following:<ul><li>The government pumped the money into other programs</li><li>Wildfires continue to wipe out acres of forests, reducting the number of trees and their ability to produce Oxygen from CO2</li></ul>'),
(5, 'Invest in Biotechnology\r\n', 'It could be possible to use biotechnology to create tress that will absorb CO2 faster, as well as create crops that can thrive in a post climate change environment. \r\n', NULL, 2, 1, 'accdec', NULL, NULL, 'Your decision led to the following:<ul><li>New technology increases the rate of absorption of CO2 by trees</li><li>Intreset in increasing the number of trees and parks in cities and around the world</li></ul>', 'Your decision led to the following:<ul><li>No change in the rate of absorption of CO2 by existing trees</li><li>Many parts of forests continue to be cut down, thus increasing CO2 levels</li></ul>'),
(6, 'Repeal the National Flood Insurance Program\r\n', 'Now that the sea level is so high, floods will be commonplace. If you remove the insurance it will encourage people to leave because of the impending floods, but it could upset the insurance companies. \r\n', NULL, 1, 1, 'accdec', '{"sea", "33", "+"}', 'america', 'Your decision led to the following:<ul><li>Relocation of many people living along coastlines</li><li>Number of deaths due to increasing floods decreased</li><li>Protests and demonstrations by workers of the insurance companies, as layoffs occur</li></ul>', 'Your decision led to the following:<ul><li>Chaos caused by increasing floods as people lose their homes</li><li>Increased number of flood-related deaths</li><li>Increased strain on the Red Cross and many other organizations trying to shelter victims of floods</li></ul>'),
(7, 'Increase use of Congestion Pricing on Toll Roads\r\n', 'Congestion Pricing will encourage people to carpool, thereby lowering the C02 emission rates. Increasing the toll cost even more could cause protests and different types of civil unrest. \r\n', NULL, 2, 1, 'accdec', NULL, NULL, 'Your decision led to the following:<ul><li>Decreased CO2 rates, as more people carpool</li><li>Increased tolls offset the loss of money caused by people carpooling</li><li>Outrage and protests by people who cannot carpool and are forced to use toll roads everyday</li></ul>', 'Your decision led to the following:<ul><li>Unchanged CO2 rates</li><li>Continued gridlock on bottleneck roads during rush hour</li><li>Not enough money earned to upkeep roads and water crossings, requiring the governemnts financial assistance.</li></ul>'),
(8, 'Subsidize the Replacement of Older Automobiles\r\n', 'If the trade in of older cars was encouraged we could replace them with more fuel efficient vehicles. However, these subsidies will cost the government millions of dollars. \r\n', NULL, 2, 1, 'accdec', NULL, NULL, 'Your decision led to the following:<ul><li>Reduced CO2 rates, as older inefficient engines produced many emissions</li><li>Increased demand in electic vehicles, as many people start looking for new cars</li></ul>', 'Your decision led to the following:<ul><li>CO2 rates continue to rise with the old vehicles on the road</li></ul>'),
(9, 'Reform Air Traffic Control Systems\r\n', 'The current system has many planes using holding patterns and runway delays, reform so that more direct routes are available, decreasing the amount of time that the planes are flying. \r\nAlthough, this is a costly process', NULL, 2, 1, 'accdec', NULL, NULL, 'Your decision led to the following:<ul><li>Reduced CO2 emissions as the amount of time the planes are in the air is decreased</li><li>Flights are noticeably faster</li><li>Flights are more expensive becuase of the cost of the reform</li></ul>', 'Your decision led to the following:<ul><li>CO2 emissions continue to rise as the demand for flight rises</li><li>Flight prices continue to rise as more fuel is needed for the currently established longer routes</li></ul>'),
(10, 'Remove environmental regulations for new energy facilities\r\n', 'Reducing these could possibly allow more old facilities to be replaced with new, cleaner ones. It''s possible that removing these regulations could allow for some unscrupulous energy practices. \r\n', NULL, 3, 1, 'accdec', NULL, NULL, 'Your decision led to the following:<ul><li>Many old facilities renovated and modernized, reduced the need to build new ones</li><li>Many acres of forests spared as there is no need to create space for large factories out of sight of the public</li><li>Many companies now lawfully dump harmful waste directly into the environemnt as it''s less expensive than proper disposal</li></ul>', 'Your decision led to the following:<ul><li>Many acres of forest cut down to make room for new factories.</li><li>Old facilities continue to sit untouched</li><li>Companies continue to be strictly upheld to enviornmental regualtions</li></ul>'),
(11, 'Subsidize Research for New Technologies\r\n', 'Subsidizing research for new technologies related to climate change will incentivize more researchers to get involved. Subisidies of this level will cost the government and taxpayers. \r\n', NULL, 1, 1, 'accdec', NULL, NULL, 'Your decision led to the following:<ul><li>New technologies discovered that aid in the reduction of CO2 levels around the world.</li><li>There is more interest in climate change from the public as the subsidies appear in different media outlets</li><li>Taxes rise as the governement finds ways to fund the subsidies</li></ul>', 'Your decision led to the following:<ul><li>Researchers struggle to locate funding for experimental technologies</li><li>Possible next-generation technologies fail to be discovered as investors are scarce</li></ul>'),
(12, 'Expand and Modernize the Electric Grid\r\n', 'This will allow for more use of solar and wind energy, decreasing use of fossil fuels. However, this is a huge undertaking financially, and finding the right people for the job will take time. \r\n', NULL, 3, 1, 'accdec', NULL, 'america', 'Your decision led to the following:<ul><li>Reduced CO2 emissions by decreasing the use of fossil fuels</li><li>Decrease of price of solar panels</li> <li>Reallocation of money for the project, with cuts made to other programs</li><li>Creation of many new jobs</li></ul>', 'Your decision led to the following:<ul><li>No change in the solar and wind program</li><li>Steady increase of fossil fuel use</li></ul>'),
(13, 'The Kyoto Protocol', 'A worldwide effort to reduce CO2 emissions, signed by many different countries. \r\n', NULL, 4, 1, 'accdec', NULL, 'japan', 'Your decision led to the following:<ul><li>Cooperation from many countries to reduce CO2 emissions</li><li>Acceptance of the fact that global warming exists and that man-made CO2 has caused it</li></ul>', 'Your decision led to the following:<ul><li>No change in CO2 emissions</li><li>Denial of the fact that global warming exists and that man-made CO2 has caused it</li><li>Public outraged about the denial of global warming</li></ul>'),
(14, 'Subsidize purchases of electric cars', 'Electric cars, when powered by nuclear energy, have much less emission rates than traditional cars. Subsidizing the use would encourage more adopters. These subsidies may upset other car manufacturers.', NULL, 3, 1, 'accdec', NULL, NULL, 'Your decision led to the following:<ul><li>Increased sales of electric cars</li><li>Decreased CO2 emissions</li><li>Increased number of nuclear power plants in the world</li><ul>', 'Your decision led to the following:<ul><li>There is no change in the sales of electric cars</li><li>Funding for the technology is decreased as a result of the low demand</li></ul>'),
(15, 'Massive Flooding', 'The sea has gotten to a point where massive flooding can be seen, and people have begun moving inland. ', NULL, 1, 1, 'passiv', '{"sea", "110", "+"}', NULL, '', ''),
(16, 'Technology Breakthrough', 'Thanks to research subsidies, there has been a techonological breakthrough that significantly decreases CO2 emissions.', NULL, 1, 1, 'passiv', NULL, NULL, '', ''),
(17, 'Widespread Droughts', 'Droughts are becoming a huge problem throughout the world due to the rising temperature.', NULL, 1, 1, 'passiv', '{"temperature", "60", "+"}', NULL, '', ''),
(18, 'Nuisance Flooding', 'With the sea level at its current state, nuisance flooding will be a common occurrence. Flooding now occurs frequently only when confronted with high tide conditions.', NULL, 1, 1, 'passiv', '{"sea", "90", "+"}', NULL, '', ''),
(19, 'Air Pollution', 'The rising temperatures have caused significant air pollution by increasing the ground level ozone. People could begin feeling the effects of this.', NULL, 1, 1, 'passiv', '{"temperature", "65", "+"}', NULL, '', ''),
(20, 'Acidic Oceans', 'Due to the high rate of carbon emissions the oceans are absorbing it, becoming progressively more acidic. This can seriously endanger underwater life. \r\n', NULL, 1, 1, 'passiv', '{"co2", "500", "+")', NULL, '', ''),
(21, 'Ozone Irreparable\r\n', 'Due to the extreme high rates of CO2 in the air, the ozone is now damaged to a irreparable state. Over time it could have repaired itself, but now it will never be back to how it was pre-industry.', NULL, 1, 1, 'passiv', '{"co2", "1500", "+")', NULL, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `accepted_stats`
--

DROP TABLE IF EXISTS `accepted_stats`;
CREATE TABLE IF NOT EXISTS `accepted_stats` (
  `id` int(11) NOT NULL,
  `temp_delta` int(11) NOT NULL,
  `forest_delta` int(11) NOT NULL,
  `co2_delta` int(11) NOT NULL,
  `sea_delta` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `accepted_stats`:
--

--
-- Dumping data for table `accepted_stats`
--

INSERT INTO `accepted_stats` (`id`, `temp_delta`, `forest_delta`, `co2_delta`, `sea_delta`) VALUES
(1, 0, 0, 0, 0),
(2, -1, 0, -1, -1),
(3, -1, 25000, -1, -1),
(4, -2, 0, -2, -2),
(5, -1, 50000, -1, -1);

-- --------------------------------------------------------

--
-- Table structure for table `decline_stats`
--

DROP TABLE IF EXISTS `decline_stats`;
CREATE TABLE IF NOT EXISTS `decline_stats` (
  `id` int(11) NOT NULL,
  `temp_delta` int(11) NOT NULL,
  `forest_delta` int(11) NOT NULL,
  `co2_delta` int(11) NOT NULL,
  `sea_delta` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `decline_stats`:
--

--
-- Dumping data for table `decline_stats`
--

INSERT INTO `decline_stats` (`id`, `temp_delta`, `forest_delta`, `co2_delta`, `sea_delta`) VALUES
(1, 0, 0, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accdec_questions`
--
ALTER TABLE `accdec_questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `accepted_stats`
--
ALTER TABLE `accepted_stats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `decline_stats`
--
ALTER TABLE `decline_stats`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accdec_questions`
--
ALTER TABLE `accdec_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `accepted_stats`
--
ALTER TABLE `accepted_stats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `decline_stats`
--
ALTER TABLE `decline_stats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
