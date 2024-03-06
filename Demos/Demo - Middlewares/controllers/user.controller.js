// Va gérer, nettoyer les éléments de la requête
// Envoyer les éléments a un service
// Et va gérer la réponse du service et envoyer au client le résultat

const userController = {

    getUsers: (req, res) => {
        // récupération de la liste entière des utilisateurs
        res.send('<h1> Liste des utilisateurs </h1>')
        // Si on arrive pas a récupérer la liste des utilisateurs, on affiche un message d'erreur
    },

    postUser: (req, res) => {
        // Récupèration des informations de l'utilisateur, envoi des infos à la db
        // Une fois l'utilisateur correctement enregistré, on récupère son id, et on le redirige vers sa page de détails
        res.redirect('/users/42')
        // Si on arrive pas a enregistrer l'utilisateur, on affiche un message d'erreur
    },

    getUserById: (req, res) => {

        throw Error('Utilisateur inconnu');

        // récupération de l'id depuis les params de la requête 
        // http://localhost:8080/api/users/42 <--- users/:id (param)
        // req.params.id
        res.send(`<h1>Affichage de l'utilisateur avec l'id ${req.params.id}`)
    }
}

module.exports = userController;



