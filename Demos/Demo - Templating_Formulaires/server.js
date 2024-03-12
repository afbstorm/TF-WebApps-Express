const express = require('express');
const path = require('path');
const router = require('./routers/router');

// Initialisation de l'app
const app = express();
const PORT = 3000;


// L'option extended: true permet de choisir la bibliothèque qs.
// qs va permettre de créer des objets complexe à partir de chaine de requête dans l'url
// par exemple : 
/*
    Imaginons une requête avec dans l'url = person[name]=jc&car[0][marque]=mitsubishi&car[0][model]=spacestar&moto[0][marque]=bmw&moto[0][model]=f900r

    {
        person: {
            name: 'jc'
        },
        car: [
            {
                marque: 'mitsubishi',
                model: 'spacestar'
            }
        ],
        moto: [
            {
                marque: 'bmw',
                model: 'f900r'
            }
        ]
    }
*/
// L'option extended: false permet de choisir la bibliothèque querystring
// querystring va applatir une chaine de requête dans l'url
/*
    Imaginons une requête avec dans l'url = person[name]=jc&car[0][marque]=mitsubishi&car[0][model]=spacestar&moto[0][marque]=bmw&moto[0][model]=f900r
    {
        'person[name]': 'jc',
        'car[0][marque]'='mitsubishi',
        'car[0][model]'='spacestar',
        'moto[0][marque]'='bmw',
        'moto[0][model]'='f900r'
    }
*/
app.use(express.urlencoded({extended: true}));

// Initialisation du moteur de templating
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Instruction à express d'utiliser les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})