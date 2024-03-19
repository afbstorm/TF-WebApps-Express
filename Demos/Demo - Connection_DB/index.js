const express = require('express');
const router = require('./router/router');

const PORT = 8001;
const app = express();

app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
});
