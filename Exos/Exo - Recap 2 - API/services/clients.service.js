const sql = require('mssql');
const sqlConfig = require('../database');
const bcrypt = require('bcrypt');

const clientsService = {

    register: async (data) => {
        try {

            const { nom, hashedPassword, email, adresseLivraison } = data;
            await sql.connect(sqlConfig);
            const request = new sql.Request()

            // Vérification si l'utilisateur existe déjà (vérification par email)
            const userExists = await request
                                .input('email', sql.NVarChar, email)
                                .query('SELECT * FROM clients WHERE email = @email')
            
            if (userExists.recordset.length > 0) {
                throw new Error('L\'utilisateur avec cet email existe déjà');
            } 

            const insertNewUser = await request
                                .input('nom', sql.NVarChar, nom)
                                .input('hashedPassword', sql.NVarChar, hashedPassword)
                                .input('adresseLivraison', sql.NVarChar, adresseLivraison)
                                .query('INSERT INTO clients (nom, email, motDePasse, adresseLivraison) VALUES (@nom, @email, @hashedPassword, @adresseLivraison)')

            return insertNewUser;
        } catch (err) {
            console.error(err)
            throw err;
        }
    },

    getProfile: async (userId) => {
        try {

            await sql.connect(sqlConfig);
            const request = new sql.Request();

            const result = await request
                            .input('id', sql.Int, userId)
                            .query('SELECT * FROM clients WHERE ClientID = @id')
            
            return result.recordset[0];
        } catch (err) {
            console.error(err)
            throw err;
        }
    },

    login: async (email, motDePasse) => {
        try {
            await sql.connect(sqlConfig);
            const request = new sql.Request();

            const result = await request
                            .input('email', sql.NVarChar, email)
                            .query('SELECT * FROM clients WHERE email = @email');

            if (result.recordset.length > 0) {
                const user = result.recordset[0];
                // ⚠️ Le SQL n'est pas du tout sensible à la case mais lorsque l'on stocke les infos dans une variable JS, le respect de 
                // la case devient important.
                const matchPassword = bcrypt.compareSync(motDePasse, user.MotDePasse)

                if (matchPassword) {
                    return user;
                }
            }

            return null;
        } catch (err) {
            console.error(err)
            throw err;
        }
    },

    updateJwt: async (userId, jwt) => {
        try {
            await sql.connect(sqlConfig);
            const request = new sql.Request()
            
            const result = await request
                            .input('userId', sql.Int, userId)
                            .input('jwt', sql.NVarChar, jwt)
                            .query('UPDATE clients SET JWT = @jwt WHERE ClientID = @userId')      
            
            return result.rowsAffected[0] > 0
        } catch (err) {
            console.error(err)
            throw err;
        }
    }
}

module.exports = clientsService;