insert into recette (titre,description,temps_minute,img_link) VALUES('Cookies américains', 'Les cookies que vous réaliserez avec cette recette sont beaux, bons, croustillants et moelleux à la fois, bref ils ont toutes les qualités pour que cette recette devienne votre préférée',12,'https://www.cookomix.com/wp-content/uploads/2016/08/cookies-thermomix-800x600.jpg');
insert into recette (titre,description,temps_minute,img_link) VALUES('Krachel – Brioche Marocaine','La brioche Marocaine tient son origine de la ville impériale de Fès au Maroc. Traditionnellement parfumées et aromatisées aux graines d’anis, de graines de sésames et de fleur d’oranger, elles se dégustent au petit déjeuner ou au goûter, accompagnées de miel, de beurre ou de confiture',30,'https://www.cookomix.com/wp-content/uploads/2023/04/IMG20230406142228-800x600.jpg');
insert into recette (titre,description,temps_minute,img_link) VALUES('Poulet rôti à la Marocaine','Le poulet rôti est un des plus importants et délicieux plats de la gastronomie marocaine. On le prépare pour les mariages, les réceptions, les fêtes mais aussi quand on a simplement envie. C’est tout simplement un vrai délice.',20,'https://www.cookomix.com/wp-content/uploads/2016/08/poulet-roti-marocaine-800x600.jpg');
insert into recette (titre,description,temps_minute,img_link) VALUES('Jus de fraises','Super rapide à réaliser, il est parfait pour le petit déjeuner. La quantité d’eau n’est pas très importante et du coup on sent bien la pulpe de la fraise. Perso j’adore faire craquer entre les dents les petits pépins de fraises lorsque je déguste cette boisson
',5,'https://www.cookomix.com/wp-content/uploads/2018/04/jus-de-fraises-thermomix-800x600.jpg');
insert into recette (titre,description,temps_minute,img_link) VALUES('Msemen','Originaire des pays du Maghreb, le Msemen est une crêpe légèrement feuilletée, confectionnée à base de farine de blé, de semoule fine et d’eau.',35,'https://img.cuisineaz.com/660x660/2014/01/16/i8709-msemen.webp');
insert into recette (titre,description,temps_minute,img_link) VALUES('Tarte normande aux pommes','Les pommes sont très souvent associées à la Normandie. Confectionnez une délicieuse tarte normande aux pommes en quelques minutes. Délicatement parfumée au Calvados, elle régalera vos convives.
',50,'https://img.cuisineaz.com/660x660/2017/11/03/i133765-tarte-aux-pommes-a-l-alsacienne.webp');
insert into recette (titre,description,temps_minute,img_link) VALUES('Seffa à la noix de coco','Le Seffa est un plat traditionnel marocain, généralement préparé pour fêter la fin du jeûne du Ramadan. Il s’agit d’un plat à base de semoule de blé, parfumé avec de la noix de coco et agrémenté d’épices, de miel et de fruits secs. ',15,'https://img.cuisineaz.com/660x660/2023/03/14/i191514-un-plat-de-seffa-a-la-noix-de-coco.webp');
insert into recette (titre,description,temps_minute,img_link) VALUES('Tride au poulet','Plat traditionnel, convivial et typique de la cuisine marocaine, le tride au poulet est généralement réservé pour les grandes occasions. ',45,'https://img.cuisineaz.com/660x660/2018/06/23/i140630-lanieres-de-crepes-fines-au-poulet.webp');

INSERT INTO utilisateur (username, password, role) VALUES (
  'admin',
  '$2a$10$R9I9RUTAo3Ue7gXp4vxUheUSqVaNO.gkx8CL2eT0zwz7MkwhJe4mG', -- "admin" encodé
  'ADMIN'
);
INSERT INTO utilisateur (username, password, role) 
VALUES ('adam', '$2a$10$kDYWl6jAWGEuE8b7/PqF1ug/4njsnRQJk3K3fxGZdu4.38UqG22Oa', 'ADMIN');
