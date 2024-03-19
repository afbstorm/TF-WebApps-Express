const sql = require('mssql');
const bcrypt = require('bcrypt');

const { DB_USER, DB_PSW, DB_NAME } = process.env;

// Configuration de la connection à la base de données
const sqlConfig = {
    user: DB_USER,
    password: DB_PSW,
    database: DB_NAME,
    server: 'localhost', // A modifier lors de la mise en production du projet
    pool: { // Paramètre de configuration de connection simultanées sur la DB
        max: 10, // Maximum de 10 connections simultanées sur la DB
        min: 0, // Minimum de connection simultanées sur la DB - si 0 = pas de minimum,
        idleTimeoutMillis: 300000 // 300.000 millisecondes = 5min -> Fermeture de la connection quand le temps d'inactivité dépasse les 5min 
    },
    options: {
        trustServerCertificate: true // Mettre en true pour le développement local
    } 
};

const queries = {

    getAll: async (req, res) => {
        try {
            await sql.connect(sqlConfig);

            const result = await sql.query `SELECT * FROM users`
            if (result) {
                // recordset est utilisé lorsque la requête SQL ne comprend qu'un seul SELECT -> return uniquement un SELECT
                // recordsets est utilisé uniquement lorsque la requête SQL comprend plusieurs SELECT -> return TOUTES les infos des select
                res.status(200).send(result.recordset);
            }

        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    },

    getUserById: async (req, res) => {
        try {
            await sql.connect(sqlConfig)
            const { id } = req.params;
            // Exécution de la requête SQL avec insertion de l'id
            const result = await sql.query `SELECT * FROM users WHERE id = ${id}`

            // if (result.recordset.length > 0) {
            //     res.status(200).send(result.recordset)
            // } else {
            //     return res.status(404).json({code: 404, message: `L'utilisateur avec id : ${id} n'existe pas.`})
            // }
            if (!result.recordset.length > 0) {
                return res.status(404).json({code: 404, message: `L'utilisateur avec id : ${id} n'existe pas.`})
            }

            return res.status(200).send(result.recordset)
            
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    },

    addUser: async (req, res) => {
        try {

            await sql.connect(sqlConfig)
            // Destructuring des informations rentrées dans le body de la requête
            const { nom, prenom, age, password } = req.body;
            const hashedPassword = bcrypt.hashSync(password, 10);

            const result = await sql.query `INSERT INTO users (nom, prenom, age, password, pseudo)
                                            VALUES (${nom}, ${prenom}, ${age}, ${hashedPassword}, 
                                            LOWER(CONCAT(SUBSTRING(${prenom}, 1, 3), RIGHT(${nom}, 3))))`

            if (result.rowsAffected[0] > 0) {
                return res.status(200).json({code: 200, message: 'Utilisateur correctement ajouté'})
            } else {
                return res.status(500).json({message: 'Le serveur ne veut pas de cet utilisateur'})
            }

        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    },

    updateUser: async (req, res) => {
        try {
            
            await sql.connect(sqlConfig);

            const { id } = req.params;
            const { nom, prenom, age, newPassword, oldPassword } = req.body;

            const userQuery = await sql.query `SELECT * FROM users WHERE id = ${id}`
            const user = userQuery.recordset[0];

            if (!user) {
                return res.status(404).json({message: `L'utilisateur avec l'id : ${id} n'existe pas.`})
            }

            let updateFields = [];

            // Vérification que newPassword et oldPassword sont bien récupérés depuis le body de la request
            if (newPassword && oldPassword) {
                // Comparaison du oldPassword et du password de la DB (dehash pendant l'opération)
                // Si comparaison valide = return true / Si pas = return false
                const isPasswordValid = bcrypt.compareSync(oldPassword, user.password);

                // Si false, on envoi un message d'erreur
                if (!isPasswordValid) {
                    return res.status(401).json({error: 'Mot de passe invalide'});
                } else {
                    // Sinon === true, on hash le nouveau mot de passe et le on stocke dans le tableau qui va préparer notre requête
                    const hashedPassword = bcrypt.hashSync(newPassword, 10);
                    updateFields.push(`password = '${hashedPassword}'`)
                }
            }

            // Stockage des inputs présents dans le body de la requête dans le tableau updateFields
            if (nom) updateFields.push(`nom = '${nom}'`);
            if (prenom) updateFields.push(`prenom = '${prenom}'`);
            if (age) updateFields.push(`age = ${age}`);

            // Créer le nouveau pseudo
            if (prenom && nom) {
                const pseudo = prenom.substring(0,3).toLowerCase() + nom.substring(nom.length - 3).toLowerCase();
                updateFields.push(`pseudo = '${pseudo}'`);
            }

            // ⚠️ Lors d'une injection de valeur par variable exemple name = ${name} on doit rajouter des singles quotes name = '${name}'
            // Sinon, SQL server prend ${name} comme nom de colonne.
            const updateQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ${id}`
            const result = await sql.query(updateQuery);

            if (result.rowsAffected[0] > 0) {
                return res.status(200).json({code: 200, message: `L'utilisateur ${id} a bien été modifié.`})
            } else {
                return res.status(404).json({code: 404, message: `L'utilisateur ${id} n'existe pas.`})
            }
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    },

    deleteUser: async (req, res) => {
        try {
            await sql.connect(sqlConfig);
            const { id } = req.params;

            const result = await sql.query `DELETE FROM users WHERE id = ${id}`
            if (!result.rowsAffected[0] > 0) {
                return res.status(404).json({code: 404, message: `Il n'y a pas d'utilisateur avec cet id : ${id}`})
            }
            return res.status(200).send(result)

        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }
};

module.exports = queries;