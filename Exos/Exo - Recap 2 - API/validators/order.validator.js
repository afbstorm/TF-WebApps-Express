const yup = require('yup');

const orderValidator = yup.object({
    produits: yup.string().required(),
    quantite: yup.number().required(),
    prixTotal: yup.number().required()
});

module.exports = orderValidator;