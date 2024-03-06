// Importation d'express
const express = require('express');

// Création d'une constante pour stocker le port du serveur
const PORT = 8080;

// Initialisation du serveur express
const app = express();

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
})

