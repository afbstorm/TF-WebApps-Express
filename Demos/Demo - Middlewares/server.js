const express = require('express');
const router = require('./routers/router');
const applicationMiddleware = require('./middlewares/applicationMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware');

const PORT = 8080;
const app = express();

// Utilisation du middleware application level par le serveur express
app.use(applicationMiddleware)

// Utilisation du routeur général par le serveur
app.use('/api', router);




// Utilisation du middleware d'erreur par la serveur express 
// Toujours le dernier à être utilisé par l'app (le serveur)
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${PORT}`)
});