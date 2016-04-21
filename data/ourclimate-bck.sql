-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 21, 2016 at 06:05 PM
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
  `text` varchar(200) NOT NULL,
  `provided_answer` tinyint(1) DEFAULT NULL,
  `acceptID` int(11) NOT NULL,
  `declineID` int(11) NOT NULL,
  `type` char(6) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `accdec_questions`:
--

--
-- Dumping data for table `accdec_questions`
--

INSERT INTO `accdec_questions` (`id`, `title`, `text`, `provided_answer`, `acceptID`, `declineID`, `type`) VALUES
(1, 'Limit Transportation', 'Request for the limit of 1 automobile per household. Fines will be issued for the breaking of this law.\r\n', NULL, 2, 1, 'accdec'),
(2, 'Eliminate Subsidies for Fuel Use\r\n', 'Eliminating these subsidies could reduce energy use and decrease carbon emission levels. \r\n', NULL, 2, 1, 'accdec'),
(3, 'Reduce Regulatory Barriers for New Nuclear Power Plants\r\n', 'Allowing more nuclear power plants to be made will cut back on other traditional energy sources which have high co2 emission rates. \r\n', NULL, 2, 1, 'accdec'),
(4, 'Create Forest Management Institutions\r\n', 'Decreasing Wildfires and having more regulated forest management could lead to a decrease in CO2 emissions. \r\n', NULL, 3, 1, 'accdec'),
(5, 'Invest in Biotechnology\r\n', 'It could be possible to use biotechnology to create tress that will absorb CO2 faster, as well as create crops that can thrive in a post climate change environment. \r\n', NULL, 2, 1, 'accdec'),
(6, 'Repeal the National Flood Insurance Program\r\n', 'Now that the sea level is so high, floods will be commonplace. If you remove the insurance it will encourage people to leave because of the impending floods. \r\n', NULL, 1, 1, 'accdec'),
(7, 'Increase use of Congestion Pricing on Toll Roads\r\n', 'Congestion Pricing will encourage people to carpool, thereby lowering the c02 emission rates.\r\n', NULL, 2, 1, 'accdec'),
(8, 'Subsidize the Replacement of Older Automobiles\r\n', 'If the trade in of older cars was encouraged we could replace them with more fuel efficient vehicles.\r\n', NULL, 2, 1, 'accdec'),
(9, 'Reform Air Traffic Control Systems\r\n', 'The current system has many planes using holding patterns and runway delays, reform so that more direct routes become available, decreasing the amount of time that the planes are in the air. \r\n', NULL, 2, 1, 'accdec'),
(10, 'Remove environmental regulations for new energy facilities\r\n', 'Reducing these could possibly allow more old facilities to be replaced with new, cleaner ones.\r\n', NULL, 3, 1, 'accdec'),
(11, 'Subsidize Research for New Technologies\r\n', 'Subsidizing research for new technologies related to climate change will incentivize more researchers to get involved. \r\n', NULL, 1, 1, 'accdec'),
(12, 'Expand and Modernize the Electric Grid\r\n', 'This will allow for more use of solar and wind energy, decreasing use of fossil fuels. \r\n', NULL, 3, 1, 'accdec'),
(13, 'The Kyoto Protocol', 'A worldwide effort to reduce CO2 emissions, signed by many different countries. \r\n', NULL, 4, 1, 'accdec'),
(14, 'Subsidize purchases of electric cars ', 'Electric cars, when powered by nuclear energy, have much less emission rates than traditional cars. Subsidizing the use would enourage more adopters. ', NULL, 3, 1, 'accdec'),
(15, 'Massive Flooding', 'The sea has gotten to a point where massive flooding can be seen, and people have begun moving inland. ', NULL, 1, 1, 'passiv'),
(16, 'Technology Breakthrough', 'Thanks to research subsidies, there has been a techonological breakthrough that significantly decreases CO2 emissions.', NULL, 1, 1, 'passiv'),
(17, 'Widespread Droughts', 'Droughts are becoming a huge problem throughout the world due to the rising temperature.', NULL, 1, 1, 'passiv'),
(18, 'Nuisance Flooding', 'With the sea level at its current state, nuisance flooding will be a common occurrence. Flooding now occurs frequently only when confronted with high tide conditions.', NULL, 1, 1, 'passiv'),
(19, 'Air Pollution', 'The rising temperatures have caused significant air pollution by increasing the ground level ozone. People could begin feeling the effects of this.', NULL, 1, 1, 'passiv'),
(20, 'Acidic Oceans', 'Due to the high rate of carbon emissions the oceans are absorbing it, becoming progressively more acidic. This can seriously endanger underwater life. \r\n', NULL, 1, 1, 'passiv');

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- RELATIONS FOR TABLE `accepted_stats`:
--

--
-- Dumping data for table `accepted_stats`
--

INSERT INTO `accepted_stats` (`id`, `temp_delta`, `forest_delta`, `co2_delta`, `sea_delta`) VALUES
(1, 0, 0, 0, 0),
(2, 0, 0, -100, 0),
(3, 0, 1, -100, 0),
(4, 0, 0, -1000, 0);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `accepted_stats`
--
ALTER TABLE `accepted_stats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `decline_stats`
--
ALTER TABLE `decline_stats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
