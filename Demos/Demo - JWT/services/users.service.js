const sql = require('mssql');
const sqlConfig = require('../database');

const usersService = {
    getAll: async () => {
        try {
            // Connection à la DB
            await sql.connect(sqlConfig);

            // Une fois la connection établie on demande la liste des users
            const result = await sql.query `SELECT * FROM users`;
            if (result.recordset.length > 0) {
                return result.recordset;
            }
        } catch (err) {
            console.error(err)
        }
    },

    getUserByEmail: async (email) => {
        try {
            // Connection à la DB
            await sql.connect(sqlConfig);

            // Une fois la connection établie, on récupère un utilisateur via son email
            const result = await sql.query `SELECT * FROM users WHERE email = ${email}`
            if (result.recordset.length > 0) {
                return result.recordset[0];
            }
        } catch (err) {
            console.error(err)
        }
    },

    register: async (data) => {
        try {
            await sql.connect(sqlConfig);
            const { nom, prenom, age, hashedPassword, email } = data;
            const result = await sql.query `INSERT INTO users (nom, prenom, age, password, pseudo, email)
                                            VALUES (${nom}, ${prenom}, ${age}, ${hashedPassword}, 
                                            LOWER(CONCAT(SUBSTRING(${prenom}, 1, 3), RIGHT(${nom}, 3))), ${email})`

            if (result.rowsAffected[0] > 0) {
                return result
            }
        } catch (err) {
            console.error(err)
        }
    },
    // addJwt. Méthode qui va injecter un jsonwebtoken dans la BD
    login: async (data) => {
        try {
            await sql.connect(sqlConfig);

            const { token, id } = data;
            const result = await sql.query `UPDATE users SET jwt = ${token} WHERE id = ${id}`;
            
            if(result.rowsAffected[0] > 0) {
                return result
            }
            
        } catch (err) {
            console.error(err)
        }
    },
}

module.exports = usersService;