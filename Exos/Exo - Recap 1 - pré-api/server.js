const express = require('express');
const path = require('path');
const router = require('./routers/router');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: true}));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
