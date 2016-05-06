-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 15, 2016 at 10:49 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `accdec_questions`
--

CREATE TABLE IF NOT EXISTS `accdec_questions` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `text` varchar(200) NOT NULL,
  `provided_answer` tinyint(1) DEFAULT NULL,
  `acceptID` int(11) NOT NULL,
  `declineID` int(11) NOT NULL,
  `type` char(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `accepted_stats`
--

CREATE TABLE IF NOT EXISTS `accepted_stats` (
  `id` int(11) NOT NULL,
  `temp_delta` int(11) NOT NULL,
  `forest_delta` int(11) NOT NULL,
  `co2_delta` int(11) NOT NULL,
  `sea_delta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `decline_stats`
--

CREATE TABLE IF NOT EXISTS `decline_stats` (
  `id` int(11) NOT NULL,
  `temp_delta` int(11) NOT NULL,
  `forest_delta` int(11) NOT NULL,
  `co2_delta` int(11) NOT NULL,
  `sea_delta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `accepted_stats`
--
ALTER TABLE `accepted_stats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `decline_stats`
--
ALTER TABLE `decline_stats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
