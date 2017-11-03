# easyshop
easyshop

Projet :

Le but de l'application est de générer une liste de course.
Cette liste de course sera générée automatiquement par l'application grâce aux recettes réalisées pas l'utilisateur au préalable.
L'application sera dans la mesure de trouver toutes les grandes surfaces se trouvant autour de l'utilisateur a un instant T.
Le projet easyshop est une partie d'un projet de plus grand envergure qui donnera suite a une application plus conséquente.
De ce fait, nous avons mis deux trois features n'ayant pas d'interet dans le projet finale afin de montrer que nous avons compris les concepts expliqués en cours.
   - une page login avec facebook  dans le but de montrer que nous avons compris la notion de connection + Oauth.
   - un bouton permettant de push de notification


Pluggin utilisés :

	- storage : Utilisé dans le but de stocker les données en locale. elles seront synccronisé par la suite dans une base de donnée une fois la connection internet stable.
	- geolocalisation : Utilisé dans le but de geolocaliser l'utilisateur et d'afficher les magasins / grandes surfaces autour de celui ci.
	- firebase : Nous utilisonsfirebase dans le but de link notre application a une application facebook pour une connection sécurisée.
	- splashscreen : Utilisés au début de l'application pendans le temps de l'initialisation.
	- Oauth : Pluggin utilisé dans le but de sécuriser la connection facebook par le biais de firebase.
	- Http / Onesignal : Nous sommes passé par ces deux pluggin afin de combler un problème de compaptibilité rencontré entre firebase et le pluggin natif de push ionic 2. 

API utilisées :
	- googlemap : api nous servant a utiliser graphiquement la geolocalisation (map)
	- mastercourse : Cette api nous sert actuellement a récupérer les informations des différentes enseignes (nom / adresse /longitude / lattitude ...). Elle servira par la suite a récupérer les produits disponibles de chaques groupe selon les enseignes ce qui permettra d'avoir une application userfriendly, et à l'utilisateur de ne plus avoir a entrer les produits a la main. 
	- facebook : api obligatoire pour toute connection via facebook
	- onesignal : Ce système permet le push de notifications mais aussi a un administrateur de push a distance une notification sur chacun des smartphones utilisant notre produit. 



groupe numero :????
membre groupe : Quentin Vieira / Florian Camus-Martin
Nous avons tout deux assistés au cours module hybrid.