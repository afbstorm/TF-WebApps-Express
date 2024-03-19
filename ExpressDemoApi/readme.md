# API REST en Express (page 71 support)

## Principe d'une API :
API : Application Programming Interface
Elle peut être faite dans plein de langages.
Elle permet de donner accès à des données à n'importe quel type de client (application, site web, appmobile, iot etc...). Ces données peuvent venir de différents endroits (bdd, autre api, fichiers etc...). Elle permet aussi de gérer facilement la sécurité d'accès aux données (Token), la bonne syntaxe d'envoi des données et le bon formatage des données en sortie (DTO).

## C'est quoi Rest ?
**Re**pre**S**entational **S**tate **T**ransfert
Une API Rest (Restful) doit
* Permettre via des requêtes, des verbs et du json, d'envoyer, modifier, récupérer et supprimer des données.
* Respecter ces contraintes :
    - **Client-Serveur** : Votre API doit juste, en fonction de la requête, gérer les données. Ceci, totalement indépendamment du client qui l'interroge.
    - **Stateless** : L'API ne conserve pas d'état sur le client qui la consulte. C'est le client qui va sauvegarder son identifiant (Token) et l'envoyer pour chaque future requête.
    - **Cacheable** : Doit permettre la mise en cache. Pour ne pas refaire une requête plusieurs fois de suite pour rien, on peut rendre une réponse de requête cacheable. Le client pourra alors décider de mettre en cache la réponse et ainsi, ne pas refaire une requête. (Un temps devra être précisé pour la mise en case)
    - **Interface Uniforme** : Les url et les réponses (ressources) des requêtes, doivent être parlantes et uniformes. (dans la mesure du possible, en anglais). L'API doit se charger de renvoyer les bons codes d'erreurs.
    - **Système de couches** : Chaque couche est indépendante d'une autre. Si j'ai une modification à faire, de la sécu à rajouter, je n'ai (en général) qu'une couche à modifier.

## Les Verb :
* **Get** : Récupérer des données (principalement json)
* **Post** : Envoyer des données (principalement dans le but d'ajouter)
* **Put** : Envoyer des données dans le but de modifier (souvent, on aura besoin d'un id pour savoir quelle ressource modifier) → L'objet envoyé remplacera l'objet en DB (ou ailleurs)
* **Patch** : Envoyer des données dans le but de modifier (souvent, on aura besoin d'un id pour savoir quelle ressource modifier) → L'objet envoyé contient uniquement les champs que je veux modifier. On remplacera en DB uniquement le champs précisé.
* **Delete** : Supprimer des données (souvent, on aura besoin d'un id)

## Les URL :
Elles doivent être lisibles par un humain.
Si je veux le produit 22 qui est en promo et qui fait partie de la Catégorie chassures, je privilégie
http://www.boutique.com/Promotions/Chaussures/22
plutôt que 
http://www.boutique.com/details?id=22&categorie=12&promo=1 

Si je veux tous les produits de la catégorie chaussure :
http://www.boutique.com/Categories/12 ✔
http://www.boutique.com/Categories/Chaussure ✔
http://www.boutique.com/?categorie=chaussure ❌

On va plutôt utiliser la query pour des options (comme une pagination par ex)
http://www.boutique.com/Produits?offset=0&limit=40
Ou si j'ai une page avec des filtres
http://www.boutique.com/Produits?lowestPrice=5&highestPrice=20&color=black

## Création de l'API :
### Créer un serveur Express
* Init
* Création app.js
* Install express nodemon
* Création du script dev
* Création du fichier env
* Modification du script dev pour prendre les variables d'env
* Création du serveur express dans le app.js

### Téléchargement d'un outil pour tester notre API :
* Postman : https://www.postman.com/downloads/?utm_source=postman-home
* Insomnia : https://insomnia.rest/download (mon pref 💜)

### Création architecture
* routes : spécifier toutes les routes notre api
* controllers : traitement de la requête et envoie d'une réponse
    - On envoie le bon code http : https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP
* services : là où on gère toute la logique d'accès aux données