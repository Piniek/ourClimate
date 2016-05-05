-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 05, 2016 at 02:58 AM
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
  `text` varchar(220) NOT NULL,
  `provided_answer` tinyint(1) DEFAULT NULL,
  `acceptID` int(11) NOT NULL,
  `declineID` int(11) NOT NULL,
  `type` char(6) NOT NULL,
  `threshold` varchar(50) DEFAULT NULL,
  `location` varchar(20) DEFAULT NULL,
  `accept_result` varchar(255) NOT NULL,
  `decline_result` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `accdec_questions`:
--

--
-- Dumping data for table `accdec_questions`
--

INSERT INTO `accdec_questions` (`id`, `title`, `text`, `provided_answer`, `acceptID`, `declineID`, `type`, `threshold`, `location`, `accept_result`, `decline_result`) VALUES
(1, 'Limit Transportation', 'Request for the limit of 1 automobile per household. Fines will be issued for the breaking of this law. This will put serious strain on the public transportation system, and serious restructuring will be required. \r\n', NULL, 2, 1, 'accdec', NULL, NULL, '', ''),
(2, 'Eliminate Subsidies for Fuel Use\r\n', 'Eliminating these subsidies could reduce energy use and decrease carbon emission levels. Cutting these subsidies will anger the oil companies, and it may be hard to pass legislation in the future. \r\n', NULL, 2, 1, 'accdec', NULL, NULL, '', ''),
(3, 'Reduce Regulatory Barriers for New Nuclear Power Plants\r\n', 'Allowing more nuclear power plants to be made will cut back on other traditional energy sources which have high co2 emission rates. This could upset some workers in the older coal power plants. \r\n', NULL, 2, 1, 'accdec', NULL, NULL, '', ''),
(4, 'Create Forest Management Institutions\r\n', 'Decreasing Wildfires and having more regulated forest management could lead to a decrease in CO2 emissions.  Creating this institution is be a serious undertaking and will cost the government millions. \r\n', NULL, 5, 1, 'accdec', NULL, NULL, '', ''),
(5, 'Invest in Biotechnology\r\n', 'It could be possible to use biotechnology to create tress that will absorb CO2 faster, as well as create crops that can thrive in a post climate change environment. \r\n', NULL, 2, 1, 'accdec', NULL, NULL, '', ''),
(6, 'Repeal the National Flood Insurance Program\r\n', 'Now that the sea level is so high, floods will be commonplace. If you remove the insurance it will encourage people to leave because of the impending floods, but it could upset the insurance companies. \r\n', NULL, 1, 1, 'accdec', '{"sea", "33", "+"}', 'america', '', ''),
(7, 'Increase use of Congestion Pricing on Toll Roads\r\n', 'Congestion Pricing will encourage people to carpool, thereby lowering the c02 emission rates. Increasing the toll cost even more could cause protests and different types of civil unrest. \r\n', NULL, 2, 1, 'accdec', NULL, NULL, '', ''),
(8, 'Subsidize the Replacement of Older Automobiles\r\n', 'If the trade in of older cars was encouraged we could replace them with more fuel efficient vehicles. However, these subsidies will cost the government millions of dollars. \r\n', NULL, 2, 1, 'accdec', NULL, NULL, '', ''),
(9, 'Reform Air Traffic Control Systems\r\n', 'The current system has many planes using holding patterns and runway delays, reform so that more direct routes are available, decreasing the amount of time that the planes are flying. \r\nAlthough, This is a costly process', NULL, 2, 1, 'accdec', NULL, NULL, '', ''),
(10, 'Remove environmental regulations for new energy facilities\r\n', 'Reducing these could possibly allow more old facilities to be replaced with new, cleaner ones. It''s possible that removing these regulations could allow for some unscrupulous energy practices. \r\n', NULL, 3, 1, 'accdec', NULL, NULL, '', ''),
(11, 'Subsidize Research for New Technologies\r\n', 'Subsidizing research for new technologies related to climate change will incentivize more researchers to get involved. Subisidies of this level will cost the government and taxpayers. \r\n', NULL, 1, 1, 'accdec', NULL, NULL, '', ''),
(12, 'Expand and Modernize the Electric Grid\r\n', 'This will allow for more use of solar and wind energy, decreasing use of fossil fuels. However, this is a huge undertaking financially, and finding the right people for the job will take time. \r\n', NULL, 3, 1, 'accdec', NULL, 'america', '', ''),
(13, 'The Kyoto Protocol', 'A worldwide effort to reduce CO2 emissions, signed by many different countries. \r\n', NULL, 4, 1, 'accdec', NULL, 'japan', '', ''),
(14, 'Subsidize purchases of electric cars ', 'Electric cars, when powered by nuclear energy, have much less emission rates than traditional cars. Subsidizing the use would encourage more adopters. These subsidies may upset other car manufacturers.', NULL, 3, 1, 'accdec', NULL, NULL, '', ''),
(15, 'Massive Flooding', 'The sea has gotten to a point where massive flooding can be seen, and people have begun moving inland. ', NULL, 1, 1, 'passiv', '{"sea", "40", "+"}', NULL, '', ''),
(16, 'Technology Breakthrough', 'Thanks to research subsidies, there has been a techonological breakthrough that significantly decreases CO2 emissions.', NULL, 1, 1, 'passiv', NULL, NULL, '', ''),
(17, 'Widespread Droughts', 'Droughts are becoming a huge problem throughout the world due to the rising temperature.', NULL, 1, 1, 'passiv', '{"temperature", "32", "+"}', NULL, '', ''),
(18, 'Nuisance Flooding', 'With the sea level at its current state, nuisance flooding will be a common occurrence. Flooding now occurs frequently only when confronted with high tide conditions.', NULL, 1, 1, 'passiv', '{"sea", "32", "+"}', NULL, '', ''),
(19, 'Air Pollution', 'The rising temperatures have caused significant air pollution by increasing the ground level ozone. People could begin feeling the effects of this.', NULL, 1, 1, 'passiv', '{"temperature", "36", "+"}', NULL, '', ''),
(20, 'Acidic Oceans', 'Due to the high rate of carbon emissions the oceans are absorbing it, becoming progressively more acidic. This can seriously endanger underwater life. \r\n', NULL, 1, 1, 'passiv', '{"co2", "5000", "+")', NULL, '', ''),
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
