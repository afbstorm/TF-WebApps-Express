const ContactController = {
    getContact: (req, res) => {
        res.render('contact')
    },

    postContact: (req, res) => {
        // Récupération des inputs utilisateur par destructuring du body de la request
        const { email, message } = req.body;
        console.log(email, message);
        res.send(`Formulaire soumis avec succès ! Voici les informations du formulaire : ${email} - ${message}`)
    }
}

module.exports = ContactController;