const yup = require('yup');

const registerValidator = yup.object({
    nom: yup.string().max(100).required(),
    email: yup.string().email().required(),
    motDePasse: yup.string().required(),
    adresseLivraison: yup.string().required()
});

module.exports = registerValidator;