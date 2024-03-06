// Importation du router d'express
// Façon 1 : (plus longue)
const express = require('express');
const router = express.Router();

// Façon 2 : (plus courte)
const router2 = require('express').Router();

router.get('/', (req, res) => {
    res.writeHead(200);
    res.end('Hello World')
});

router.get('/coucou', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end('<h1>Hibou</h1>');
});

router.get('/coucou/:text', (req, res) => {
    const param = req.params.text;
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(`<h1>${param}</h1>`);
})

module.exports = router;