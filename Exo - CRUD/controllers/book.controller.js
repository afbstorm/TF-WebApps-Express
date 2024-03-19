const { Request, Response } = require('express');

const bookService = require('../services/book.service');

const bookController = {

    /**
     * GetAll
     * @param {Request} req 
     * @param {Response} res 
     */
    getAll: (req, res) => {
        const books = bookService.getAll();

        if (books) {
            return res.status(200).json(books);
        }
        return res.sendStatus(404);
    },

    /**
     * GetById
     * @param {Request} req 
     * @param {Response} res 
     */
    getById: (req, res) => {
        // Transformation de l'id de l'url (string) en number pour le comparer de manière stricte dans le service
        const id = parseInt(req.params.id);

        const book = bookService.getById(id);
        if (book) {
            return res.status(200).json(book);
        }
        return res.status(404).json({code: 404, message: 'Le livre avec l\'id spécifié n\'existe pas.'});
    },

    /**
     * Create
     * @param {Request} req 
     * @param {Response} res 
     */
    create: (req, res) => {
        const newBook = req.body;
        const book = bookService.create(newBook);
        if (book) {
            res.location(`api/book/${book.id}`);
            return res.status(201).json(book);
        }
        return res.status(500).json({message: 'Erreur lors de l\'ajout du livre.'});
    },
    
    /**
     * Update
     * @param {Request} req 
     * @param {Response} res 
     */
    update: (req, res) => {
        const id = parseInt(req.params.id);
        const { author, title, edition, releaseYear, pageCount, target } = req.body;

        const updatedBook = bookService.update(id, { author, title, edition, releaseYear, pageCount, target });
        if (updatedBook) {
            res.location(`api/book/${updatedBook.id}`);
            return res.status(201).json(updatedBook);
        }
        return res.status(404).json({code: 404, message: `Le livre avec l'id ${id} n'existe pas.`});
    },

    /**
     * Delete
     * @param {Request} req 
     * @param {Response} res 
     */
    delete: (req, res) => {
        const id = parseInt(req.params.id);
        const deletedBook = bookService.delete(id);
        if (deletedBook) {
            return res.status(200).json({message: `Le livre avec l'id ${id} a bien été supprimé.`});
        }
        return res.status(404).json({code: 404, message: `Le livre avec l'id ${id} n'existe pas.`});
    },

    sortBy: (req, res) => {
        const { order, data } = req.body;
        console.log(order, data);
        const sortedBooks = bookService.sortBy(order, data);
        if (sortedBooks) {
            res.location('/api/books')
            return res.status(200).json(sortedBooks)
        }
        return res.status(404).json({message: 'Il n\'y a pas de livres à trier.'})
    }
}

module.exports = bookController;