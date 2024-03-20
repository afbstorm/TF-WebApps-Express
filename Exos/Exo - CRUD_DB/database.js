const { DB_USER, DB_PSW, DB_NAME } = process.env;

// Configuration de la connection à la base de données
const sqlConfig = {
    user: DB_USER,
    password: DB_PSW,
    database: DB_NAME,
    server: 'localhost', // A modifier lors de la mise en production du projet
    pool: { // Paramètre de configuration de connection simultanées sur la DB
        max: 10, // Maximum de 10 connections simultanées sur la DB
        min: 0, // Minimum de connection simultanées sur la DB - si 0 = pas de minimum,
        idleTimeoutMillis: 300000 // 300.000 millisecondes = 5min -> Fermeture de la connection quand le temps d'inactivité dépasse les 5min 
    },
    options: {
        trustServerCertificate: true // Mettre en true pour le développement local
    } 
};

module.exports = sqlConfig;