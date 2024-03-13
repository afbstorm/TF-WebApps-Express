const dishes = require('../datas/dishes.json');

const ProductController = {
    getDishes: (req, res) => {
        const starters = dishes.entrees
        const mainDishes = dishes.plats
        const desserts = dishes.desserts
        const wines = dishes.vins
        const threeService = dishes.menu;
        res.render('menus', {
            starters,
            mainDishes,
            desserts,
            wines,
            threeServiceStarters: threeService.entrees,
            threeServiceDishes: threeService.plats,
            threeServiceDesserts: threeService.desserts,
            threeServiceWines: threeService.vins})
    },

    getDisheDetails: (req, res) => {
        const dishId = parseInt(req.params.id);
        const dishType = req.params.type;
        const starters = dishes.entrees
        const mainDishes = dishes.plats
        const desserts = dishes.desserts
        let dish;
        if (dishType === 'entrees') {
            dish = starters.find(dish => dish.id === dishId);
        } else if (dishType === 'plats') {
            dish = mainDishes.find(dish => dish.id === dishId);
        } else {
            dish = desserts.find(dish => dish.id === dishId);
        }
        if (!dish) {
            return res.status(404).send('Product not found');
        }

        res.render('disheDetails', { dish })
    }
}

module.exports = ProductController;
