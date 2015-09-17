-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Sam 25 Avril 2015 à 11:03
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `sitefrancoise`
--

-- --------------------------------------------------------

--
-- Structure de la table `menuitems`
--

CREATE TABLE IF NOT EXISTS `menuitems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menuItemName` varchar(16) NOT NULL,
  `urlName` varchar(32) NOT NULL,
  `class` varchar(32) NOT NULL,
  `active` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `menuItemName` (`menuItemName`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Contenu de la table `menuitems`
--

INSERT INTO `menuitems` (`id`, `menuItemName`, `urlName`, `class`, `active`) VALUES
(1, 'ACCUEIL', 'accueil', 'glyphicon glyphicon-home', 'accueil'),
(2, 'PHOTOTHEQUE', 'phototheque', 'glyphicon glyphicon-picture', 'phototheque'),
(3, 'AUDIOTHEQUE', 'audiotheque', 'glyphicon glyphicon-music', 'audiotheque'),
(4, 'VIDEOTHEQUE', 'videotheque', 'glyphicon glyphicon-film', 'videotheque'),
(5, 'AGENDA', 'agenda', 'glyphicon glyphicon-calendar', 'agenda'),
(6, 'CONTACT', 'contact', 'glyphicon glyphicon-pencil', 'contact');

-- --------------------------------------------------------

--
-- Structure de la table `priority`
--

CREATE TABLE IF NOT EXISTS `priority` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `taskstatus`
--

CREATE TABLE IF NOT EXISTS `taskstatus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `taskstatus`
--

INSERT INTO `taskstatus` (`id`, `name`) VALUES
(2, 'in progress'),
(1, 'todo');

-- --------------------------------------------------------

--
-- Structure de la table `tasktype`
--

CREATE TABLE IF NOT EXISTS `tasktype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `tasktype`
--

INSERT INTO `tasktype` (`id`, `name`) VALUES
(2, 'bug'),
(1, 'story');

-- --------------------------------------------------------

--
-- Structure de la table `todos`
--

CREATE TABLE IF NOT EXISTS `todos` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `taskName` varchar(32) NOT NULL,
  `description` varchar(150) NOT NULL,
  `assignee` varchar(32) DEFAULT NULL,
  `type` varchar(32) DEFAULT NULL,
  `taskstatus` varchar(32) DEFAULT NULL,
  `menuItem` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `taskName` (`taskName`),
  KEY `assignee` (`assignee`),
  KEY `type` (`type`),
  KEY `taskstatus` (`taskstatus`),
  KEY `FK_M` (`menuItem`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(32) NOT NULL,
  `lastName` varchar(32) NOT NULL,
  `userName` varchar(32) NOT NULL,
  `email` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userName` (`userName`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `firstName`, `lastName`, `userName`, `email`) VALUES
(1, 'ebela', 'yannick', 'yanning86', 'yanning86@gmail.com'),
(2, 'ondoa', 'eric', 'ondoer', 'eric.ondoa@gmail.com');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `todos`
--
ALTER TABLE `todos`
  ADD CONSTRAINT `FK_M` FOREIGN KEY (`menuItem`) REFERENCES `menuitems` (`menuItemName`),
  ADD CONSTRAINT `todos_ibfk_1` FOREIGN KEY (`assignee`) REFERENCES `user` (`userName`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `todos_ibfk_2` FOREIGN KEY (`type`) REFERENCES `tasktype` (`name`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `todos_ibfk_3` FOREIGN KEY (`taskstatus`) REFERENCES `taskstatus` (`name`) ON DELETE SET NULL ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
