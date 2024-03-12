// Importation des modules
const express = require('express');
const path = require('path');
// Importation de la liste des produits
const productsList = require('./datas/products.json');

const PORT = 8080;

// Initialisation de l'app
const app = express();

// Donner l'instruction à express d'utiliser un moteur de templating, et on va préciser QUEL moteur de templating 
// en lui indiquant le dossier qu'il doit chercher dans les node_modules
app.set('view engine', 'pug');
// Donner l'instruction à express d'utiliser des vues, et on va précisier OU elles se situent
app.set('views', path.join(__dirname, 'views'));

// Donner l'instruction à express d'utiliser la méthode de fichier statique pour pouvoir lire les fichiers css, images, etc... 
// On va également indiquer le dossier ou ils se trouvent
app.use(express.static(path.join(__dirname, 'public')));

// Création de la route qui va utiliser le fichier de vue main.pug et envoi des données des produits
app.get('/', (req, res) => {
    res.render('main', {products: productsList})
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${PORT}`);
});