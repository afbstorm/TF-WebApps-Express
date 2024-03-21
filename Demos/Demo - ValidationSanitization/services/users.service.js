const sql = require('mssql');
const sqlConfig = require('../database');

const userService = {

    getUserByEmail: async (email) => {

        try {
            await sql.connect(sqlConfig);
            // Préparer une nouvelle requête via l'object Request de mssql
            // Request va sanitize (nettoyage) les input qu'on lui donne, les stocker dans une variable sql et nous permettre de les envoyer à la DB
            const request = new sql.Request();
            // On utilise l'object Request et sa méthode input pour créer une variable SQL, lui donner son type et lui donner sa source
            request.input('email', sql.NVarChar, email)

            const result = await request.query('SELECT * FROM users WHERE email = @email')
            if (result.recordset.length > 0) {
                return result.recordset[0]
            }
        } catch (err) {
            console.error(err)
            throw new Error(err)
        }
    },

    register: async (data) => {
        try {
            await sql.connect(sqlConfig);
            const { nom, prenom, age, hashedPassword, email } = data;
            const request = new sql.Request();
            // On va devoir sanitize plusieurs données. On peut les mettre à la suite => .input(????).input(/..//).input(...)
            // Ou on peut les mettre à la ligne 
            request
                .input('nom', sql.NVarChar, nom)
                .input('prenom', sql.NVarChar, prenom)
                .input('age', sql.Int, age)
                .input('hashedPassword', sql.NVarChar, hashedPassword)
                .input('email', sql.NVarChar, email)
                .input('pseudo', sql.NVarChar, 'coucou')
            const result = await request.query `INSERT INTO users (nom, prenom, age, password, pseudo, email) 
                                            VALUES (@nom, @prenom, @age, @hashedPassword, @pseudo, @email)`

            if (result.rowsAffected[0] > 0) {
                return result
            }
        } catch (err) {
            console.error(err)
        }
    },

    login: async (data) => {
        try {
            await sql.connect(sqlConfig);

            const { token, id } = data;
            const result = await sql.query `UPDATE users SET jwt = ${token} WHERE id =${id}`

            if (result.rowsAffected[0] > 0) {
                return result
            }
        } catch (err) {
            console.error(err)
        }
    },
};

module.exports = userService;