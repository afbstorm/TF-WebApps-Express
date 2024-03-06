// Importation du router express
const userRouter = require('express').Router();
const userController = require('../controllers/user.controller');
const routeMiddleware = require('../middlewares/routeMiddleware');

// Définition de plusieurs actions (verbes HTTP) sur une même route
// userRouter.route('/users')
//     .get(() => {})
//     .post(() => {})
//     .delete(() => {})
// ========= //
// userRouter.get('/users', () => {})
// userRouter.post('/users', () => {})
// userRouter.delete('/users', () => {})

// Test application-level middleware
// userRouter.get('/', (req, res) => {
//     res.writeHead(200, {
//         'Content-Type': 'text/html'
//     })
//     res.end('<h1>Hello World</h1>')
// })

// Utilisation du controller et de ses méthodes
userRouter.get('/', routeMiddleware, userController.getUsers);
userRouter.post('/', userController.postUser);

// :id -> paramètre formel remplacé par une valeur réelle a l'appel de la route (exemple : /42)
userRouter.get('/:id', userController.getUserById);

module.exports = userRouter;