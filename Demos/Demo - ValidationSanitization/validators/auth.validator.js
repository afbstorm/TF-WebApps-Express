// L'importation de yup va permettre de spécifier les validateurs que l'on veut utiliser
const yup = require('yup'); 
// L'importation de { object } va nous permettre de créer un object de validation qui sera appeler comme une promise
const { object } = require('yup'); 

const authValidator = object({
    // Yup nous permet de définir les validateurs, ces validateurs peuvent être : le type, le nombre minimum et / ou maximum de caractères
    // l'obligation de remplir l'input ou non, etc...
    email: yup.string().min(5).max(100).required('Ce champ est obligatoire'), // Nous pouvons inclure des messages pour indiquer l'erreur au client
    password: yup.string().min(1).max(50).required(), // Causera une erreur si non rempli lors de la soumission

    // Ne causera pas d'erreurs si non rempli lors de la soumission, car non requis (required)
    // optionnel: yup.string().min(25).max(500), 

    // Le numéro de téléphone DOIT être un string et DOIT avoir 10 chiffres
    // tel: yup.string().matches(/^[0-9]{10}$/) 
});

module.exports = authValidator;
