// Importation d'express
const express = require('express');
const router = require('./router/router');
const PORT = 8080;

// Initilisation du serveur
const app = express();

// Utilisation du router par le serveur express
app.use(router);

// app.get('/', (req, res) => {
//     res.writeHead(200);
//     res.end('Hello World')
// });

// app.get('/coucou', (req, res) => {
//     res.writeHead(200, {
//         'Content-Type': 'text/html'
//     });
//     res.end('<h1>Hibou</h1>');
// });

// app.get('/coucou/:text', (req, res) => {
//     const param = req.params.text;
//     res.writeHead(200, {
//         'Content-Type': 'text/html'
//     });
//     res.end(`<h1>${param}</h1>`);
// })


app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
});