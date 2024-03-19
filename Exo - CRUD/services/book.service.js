const fs = require('fs');
const path = require('path');
const books = require('../datas/books.json');

const bookService = {
    getAll: () => {
        return books;
    },

    // Récupération de l'id passé en paramètre par le controller
    getById: (id) => {
        const book = books.find(book => book.id === id);
        return book

        // return books.find(book => book.id === id);
    },

    create: (newBook) => {
        newBook.id = Math.max(...books.map(book => book.id)) + 1;
        // Ajout du nouveau livre dans le tableau local
        books.push(newBook);
        // Réécriture du fichier json avec les nouvelles données
        fs.writeFileSync(path.resolve(__dirname, '../datas/books.json'), JSON.stringify(books, null, 2));
        return newBook;
    },
    
    update: (id, data) => {
        const bookIndex = books.findIndex(book => book.id === id);

        // Si le livre n'est pas trouvé, n'existe pas. findIndex nous renvoi -1
        if (bookIndex === -1) {
            return null;
        }

        // Spread de l'object existant à cet index
        // Insertion des nouvelles datas a l'index spécifié

        // 1) Création d'un nouvel object qui va remplacer l'object existant ==> { }
        // 2) Spread dans l'object (le livre) qui se situe a l'index spécifié [bookIndex]
        // 3) Spread dans l'object data qu'on reçoit de notre controller pour remplacer / écraser les données éxistantes
        // 4) Assignation du nouvel object à l'index spécifié [bookIndex] ==> books[bookIndex] = ... 
        books[bookIndex] = {...books[bookIndex], ...data};
        fs.writeFileSync(path.resolve(__dirname, '../datas/books.json'), JSON.stringify(books, null, 2));
        return books[bookIndex];
    },

    delete: (id) => {
        const filteredBooks = books.filter(book => book.id !== id);
        fs.writeFileSync(path.resolve(__dirname, '../datas/books.json'), JSON.stringify(filteredBooks, null, 2));
        return filteredBooks;
    },

    sortBy: (order, property) => {
        books.sort((a, b) => {
            if (order === 'asc') {
                // Pour trier des strings, on réduit en lowerCase pour être sur de comparer les mêmes caractères (a et A ont des valeurs différentes)
                // Ensuite on compare les valeurs avec localeCompare
                return a[property].toLowerCase().localeCompare(b[property].toLowerCase())
            } else {
                return b[property].toLowerCase().localeCompare(a[property].toLowerCase())
            }
        });
        return books;
    } 
}

module.exports = bookService;