const dishes = require("../datas/dishes.json");
const ReservationController = {
    getReservation: (req, res) => {
        res.render('reservation')
    },

    postReservation: (req, res) => {
        const { email, message, firstname, lastname, phoneNumber } = req.body;
        const mainDish = dishes.plats[3];
        const entradas = dishes.entrees[2];
        console.log(email, message, firstname, lastname, phoneNumber);
        res.render('home', {mainDish, entradas, message: 'Demande de réservation soumise avec succès !'})
    }
}

module.exports = ReservationController;
