# easyshop
easyshop

Projet :

Le but de l'application est de générer une liste de course.
Cette liste de course sera générée automatiquement par l'application grâce aux recettes réalisées pas l'utilisateur au préalable.
L'application est capable de trouver toutes les grandes surfaces se trouvant autour de l'utilisateur a un instant T Le projet finale conseillera quelle grandes surfaces sera la plus rentable pour celui ci.
Le projet easyshop est donc une partie d'un projet de plus grand envergure qui donnera suite a une application plus conséquente, nous n'en sommes qu'aux prémices.
De ce fait, certaines features n'ayant pas d'interet dans le projet finale on été intégrées afin de montrer que nous avons compris les concepts expliqués pendant le cours.
   - une page login avec facebook dans le but de montrer que nous avons compris la notion de Connection sécuriser(Oauth).
   - Systeme de push de notification (nous reflechissons actuellement a garder cette features pour le projet finale)


Pluggin utilisés :
	- Storage : Utilisé dans le but de stocker les données en locale dans l'appareil , sans perte en cas de faible mémoires de l'appareil.
	- Geolocation : Utilisé dans le but de geolocaliser l'utilisateur et d'afficher les magasins / grandes surfaces autour de celui ci.
	- Firebase : Nous utilisons firebase pour link notre application a une application facebook pour une connection sécurisée.
	- Splashscreen : initiallisé au début de l'application pendans le temps de chargement des modules interne.
	- Oauth : Pluggin utilisé dans le but de sécuriser la connection facebook par le biais de firebase.
	- Http : Nous nous servons de http pour vers les differentes Api utilisé par notre application (voir plus bas pour liste des API).
	- Onesignal : Plugin utilisé afin de permettre a l'application de recevoir les notification que nous souhaitons transmettre a nos utilisateur.
	- Unirest : Unirest est un plugin qui encapsule http. Il nous sert a faciliter les requêtes http pour un code plus propre et lisible lors des appel aux différentes api.


API utilisées :
	- Googlemap : Api nous servant a generer des map , afin de dirigez l'utilisateur vers les magasins potentiel pour ces courses.
	- Mastercourse : Cette api nous sert actuellement a récupérer les informations des différentes enseignes (nom / adresse...). Elle servira par la suite a récupérer les produits disponibles dans les differentes enseigne.
	- Facebook : Api forcée par facebook pour toute connection via leur système.
	- Onesignal : Ce système permet le push de notifications mais aussi a un administrateur de push a distance une notification sur chacun des smartphones utilisant notre application. 

Se projet ne se limite donc pas au module de Mobiles Hybrid Dev et sera poursuivis aprés celui ci.
Les fonctionnalité actuellement présente sont donc celle annoncé lors du cours de mobiles hybrid , a savoir :
	- Ajout de Produit personnalisé par l'utilisateur.
	- Ajout de recettes personnalisé par l'utilisateur.
	- Génération d'une liste de course en fonction des différentes recettes personnalisé de l'utilisateur.
	- Géolocalisatio de l'utilisateur et génération de map via Googlemap
	- Affichage des différentes enseigne disponsibles autours de l'utilisateur (rayon ~150km)
	- Connection sécurisé a facebook
	- Systéme de notification permettant a l'utilisateur de recevoir les notifications que nous souhaitons lui transmettre (Boutons de push de notification présent actuellement pour vous permettre de tester se systeme).
	- Stockage des données sur le téléphones gérer correctement afin de ne pas perdre de données en cas de surchargre mémoire de l'appareil.
	- Systéme de sideMenu facilitant la naviguation dans l'application.

groupe numero : 15
membre groupe : Quentin Vieira / Florian Camus-Martin
Nous avons tout deux assistés au cours module hybrid.