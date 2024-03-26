const bookRouter = require('express').Router();
const bookController = require('../controllers/book.controller');

bookRouter.route('/')
    .get(bookController.getAll)
    .post(bookController.create)

bookRouter.route('/sort')
    .get(bookController.sortBy)

bookRouter.route('/:id')
    .get(bookController.getById)
    .put(bookController.update)
    .delete(bookController.delete)

module.exports = bookRouter;