//Utiliser le module express
const express = require("express");

// Extraire toutes les variables d'environnement dont on a besoin
const PORT = 8080;

//Créer le serveur
const app = express();

app.use(express.urlencoded({extended: true}))
//Middleware pour permettre à notre serveur de lire le json
app.use(express.json());

// Utiliser les routes
const router = require("./routes");
app.use("/api", router)

//Lancer mon serveur
app.listen(PORT, () => {
    console.log(`[Start] on port ${PORT}`);
})
