-- MySQL dump 10.13  Distrib 5.7.36, for Linux (x86_64)
--
-- Host: localhost    Database: mentalyc
-- ------------------------------------------------------
-- Server version	5.7.36-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendees`;
--
CREATE DATABASE IF NOT EXISTS mentalyc;
use mentalyc;




DROP TABLE IF EXISTS `therapy_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `therapy_types` (
  `therapy_type_id` int(11) NOT NULL,
  `type_name` varchar(255) NOT NULL,
  `min_number_of_speakers` int(11) NOT NULL DEFAULT 2,
  `max_number_of_speakers` int(11) NOT NULL DEFAULT 2,
  PRIMARY KEY (`therapy_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Dumping data for table `therapy_types`
--

LOCK TABLES `therapy_types` WRITE;
/*!40000 ALTER TABLE `therapy_types` DISABLE KEYS */;
INSERT INTO `therapy_types` VALUES 
(1, 'Individual therapy', 2, 2),
(2, 'Couple therapy', 3, 3),
(3, 'Family therapy', 3, 5),
(4, 'Child therapy', 2, 3);
/*!40000 ALTER TABLE `therapy_types` ENABLE KEYS */;
UNLOCK TABLES;


DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `role_id` varchar(255) NOT NULL,
  `role_name` varchar(255) NOT NULL,
  `role_level` int(11) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES 
('06add1d1-b796-4f94-967c-97b379620900', 'Owner', 0),
('06add1d1-b796-4f94-967c-97b379620901', 'Admin', 1),
('06add1d1-b796-4f94-967c-97b379620999', 'Clinician', 5);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;



DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teams` (
  `team_id` varchar(255) NOT NULL,
  `max_members` int(11) DEFAULT 1 NOT NULL,
  `current_members` int(11) DEFAULT 1 NOT NULL,
  `created_timestamp` varchar(255) NOT NULL,
  PRIMARY KEY (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES 
('06add1d1-zzzz-4f94-967c-97b3796209zz',  3, 2, "1652853061889");
UNLOCK TABLES;


DROP TABLE IF EXISTS `mentalyc_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mentalyc_users` (
  `user_id` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  `user_type` varchar(255)  NOT NULL,
  `user_status` varchar(255) NOT NULL,
  `is_admin` tinyint(1) DEFAULT '0' NOT NULL,
  `is_owner` tinyint(1) DEFAULT '0' NOT NULL,
  `created` varchar(255) NOT NULL,
  `team_id` varchar(255) DEFAULT NULL,
  `finished_onboarding` tinyint(1) DEFAULT '0' NOT NULL,
  `finished_introduction` tinyint(1) DEFAULT '0' NOT NULL,
  `therapy_type_id` int(11) DEFAULT NULL,
  `therapy_type_name` varchar(255) DEFAULT NULL,
  `client_gender` varchar(255) DEFAULT "N",
  `session_speaker_count` int(11) DEFAULT 2,
  `stripe_customer_id` varchar(255) UNIQUE DEFAULT NULL,
  `client_age` int default null,
  `client_pronoun` varchar(50) default null,
  `extra_notes` varchar(255) DEFAULT NULL,
  `diagnosis` varchar(255) DEFAULT NULL,
  `comorbidity` varchar(255) DEFAULT NULL,
  `client_risk` boolean DEFAULT false NOT NULL,
  `birth_year` INT(11) DEFAULT NULL,
  `marketing_consent` boolean DEFAULT false NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `team_id` (`team_id`),
  KEY `therapy_type_id` (`therapy_type_id`),
  CONSTRAINT `mentalyc_users_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `teams` (`team_id`),
  CONSTRAINT `mentalyc_users_ibfk_2` FOREIGN KEY (`therapy_type_id`) REFERENCES `therapy_types` (`therapy_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;



--
-- Dumping data for table `mentalyc_users`
--

LOCK TABLES `mentalyc_users` WRITE;
/*!40000 ALTER TABLE `mentalyc_users` DISABLE KEYS */;
INSERT INTO `mentalyc_users` VALUES 
('06add1d1-b796-4f94-967c-97b379625db7', 'titi', 'titi@titi.ti', '$2b$12$OwcJ18qNKNVs97def6tuxeHMZrNIVl5OyW2gRM/LDw9Sw2c4Rf8CO', 'therapist', 'active', 0, 1, '1652853061889', '06add1d1-zzzz-4f94-967c-97b3796209zz', 0, 1, NULL, '', 'N', 2, NULL, 44, 'Him', NULL, NULL, NULL, FALSE, 1990, TRUE),
('06add1d1-b796-4f94-967c-97b379625db9', 'titi_subordinate', 'titi_sub@titi.ti', '$2b$12$OwcJ18qNKNVs97def6tuxeHMZrNIVl5OyW2gRM/LDw9Sw2c4Rf8CO', 'therapist', 'active', 0, 0, '1652853061889', '06add1d1-zzzz-4f94-967c-97b3796209zz', 0, 0, NULL, '', 'N', 2, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, 1990, TRUE), 
('4fdea379-9adb-488d-a5d0-281b47386ec2', 'ehab2', 'ttt@ttt.ttt', '$2b$12$EdQ2EkX6.SdGUVj8eNssLOtrFPsrS/r2nnqA0aiTXnAol7n7K4BIy', 'patient', 'active', 0, 0, '1652853061889', NULL, 0, 1, NULL, 'Individual therapy', 'M', 2, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, 1990, TRUE);
/*!40000 ALTER TABLE `mentalyc_users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-27 10:32:28



