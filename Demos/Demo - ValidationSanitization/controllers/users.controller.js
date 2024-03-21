const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/users.service');
const authValidator = require('../validators/auth.validator');
const registerValidator = require('../validators/register.validator');

const userController = {
    login: async (req, res) => {
        try {
            // Envoi des inputs de la requête dans le validateur (req.body contient l'email et le password entré par l'utilisateur)
            // La méthode validate de yup envoi une promise donc on doit attendre la réponse
            const bodyValidated = await authValidator.validate(req.body);
            // Une fois les inputs validés, on destructure pour stocker les infos et les manipuler plus facilement
            const { email, password } = bodyValidated;
            // On envoi l'email validé au service qui lui va nous renvoyer les infos de l'utilisateur dont nous allons avoir besoin
            // pour le connecter (password et le jwt s'il y en a un)
            const user = await userService.getUserByEmail(email);

            if (!user) {
                return res.status(404).json({message: `L'utilisateur avec l'email : ${email} n'existe pas.`})
            }

            if (user.jwt) {
                return res.status(200).redirect('/api/products');
            } else if (password) {
                const isPasswordValid = bcrypt.compareSync(password, user.password);

                if(!isPasswordValid) {
                    return res.status(401).json({message: 'Password invalide'});
                }

                const id = user.id;
                const payload = {
                    userId: id,
                    email: user.email
                };
                const options = {
                    expiresIn: '24h'
                };

                const secret = process.env.JWT_SECRET;
                const token = jwt.sign(payload, secret, options);
                const clientJwt = await userService.login({token, id})

                if (clientJwt) {
                    res.setHeader('Authorization', `Bearer ${token}`);
                    res.status(200).json({token});
                } else {
                    res.status(500).json({message: 'Erreur lors de l\'écriture du header \'Authorization\''})
                }
            }
        } catch(err) {
            console.error(err)
            res.sendStatus(500);
        }
    },

    register: async (req, res) => {
        try {

            // Récupération des inputs utilisateur depuis le body de la requête
            // Envoi des inputs au validateur
            const bodyValidated = await registerValidator.validate(req.body);
            // Récupération des informations validées
            const { nom, prenom, age, password, email } = bodyValidated;
            const hashedPassword = bcrypt.hashSync(password, 10);

            const result = await userService.register({nom, prenom, age, hashedPassword, email})
            if (result) {
                return res.status(200).json({message: "L'utilisateur a bien été enregistré"});
            }

        } catch(err) {
            console.error(err)
            res.sendStatus(500);
        }
    }
}

module.exports = userController;