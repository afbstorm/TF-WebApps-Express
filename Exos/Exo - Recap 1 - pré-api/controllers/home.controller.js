const dishes = require('../datas/dishes.json');

const HomeController = {
    getHome: (req, res) => {
        const mainDish = dishes.plats[3];
        const entradas = dishes.entrees[2];
        res.render('home', {mainDish, entradas})
    }
}

module.exports = HomeController;
