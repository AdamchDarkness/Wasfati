CREATE TABLE IF NOT EXISTS `recette` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `temps_minute` int(11) NOT NULL,
  `titre` varchar(150) NOT NULL,
  `description` varchar(400) NOT NULL,
  `img_link` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS `ingredients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_recette` int(11) DEFAULT NULL,
  `nom` varchar(50) NOT NULL,
  `quantite` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKmjb0525noqfsoqrpi80frq2at` (`id_recette`),
  CONSTRAINT `FKd6eacudgl4rg1m5ucod5dwjru` FOREIGN KEY (`id_recette`) REFERENCES `recette` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
