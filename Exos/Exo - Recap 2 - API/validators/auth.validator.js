const yup = require('yup');

const authValidator = yup.object({
    email: yup.string().email().required(),
    motDePasse: yup.string().required()
});

module.exports = authValidator;
