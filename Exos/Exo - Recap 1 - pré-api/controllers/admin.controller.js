const dishes = require("../datas/dishes.json");
const fs = require('fs');
const path = require('path');

const AdminController = {
    getNewDishForm: (req, res) => {
        const categories = ['entrees', 'plats', 'desserts']
        res.render('admin', {categories})
    },

    postNewDish: (req, res) => {
        const { nom, prix, description, allergenes, img, category } = req.body;
        const mainDish = dishes.plats[3];
        const entradas = dishes.entrees[2];


        // On combine toutes les array de plats, entrées et desserts, puis on utilise la fonction sort
        // qui va permettre de trier en ordre décroissant le nouveau tableau pour récupérer plus facilement
        // le plus gros id car il sera a l'index 0. Une fois la valeur récupérer, on incrémente juste de 1 pour avoir le nouvel id
        const newId = [...dishes.entrees, ...dishes.plats, ...dishes.desserts].sort((a, b) => b.id - a.id)[0].id + 1;
        const newDish = {
            id: newId,
            nom,
            prix,
            description,
            allergenes,
            img
        };

        if (!dishes[category]) {
            return res.status(400).send('Catégorie inconnue');
        }
        dishes[category].push(newDish);

        fs.writeFile(path.join(__dirname, '../datas/dishes.json'), JSON.stringify(dishes, null, 2), (err) => {
            if (err) throw err;
        });

        res.render('home', {mainDish, entradas, message: `${category.charAt(0).toUpperCase() + category.slice(1)} correctement ajouté·e !`});
    }
}

module.exports = AdminController;
