const yup = require('yup');
const { object } = require('yup');

const registerValidator = object({
    nom: yup.string().min(2).max(50).required(),
    prenom: yup.string().min(2).max(50).required(),
    age: yup.number(),
    password: yup.string().min(1).max(50).required(),
    email: yup.string().min(5).max(100).required(),

    // Pour une date (de naissance par exemple)
    // date: yup.date()
})

module.exports = registerValidator;