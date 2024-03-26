const sql = require('mssql');
const sqlConfig = require('../database');

const ordersService = {
    getOrders: async (clientId) => {
        try {
            await sql.connect(sqlConfig);
            const request = new sql.Request();

            const result = await request
                            .input('clientId', sql.Int, clientId)
                            .query('SELECT * FROM commandes WHERE ClientID = @clientId')
            
            return result.recordset
        } catch (err) {
            console.error(err)
            throw err;
        }
    }, 

    createOrder: async (data) => {
        try {
            await sql.connect(sqlConfig);
            const request = new sql.Request();

            const { userId, produits, quantite, prixTotal, adresseLivraison } = data;

            const result = await request
                            .input('clientId', sql.Int, userId)
                            .input('produits', sql.NVarChar, produits)
                            .input('quantite', sql.Int, quantite)
                            .input('prixTotal', sql.Float, prixTotal)
                            .input('adresseLivraison', sql.NVarChar, adresseLivraison)
                            .input('statut', sql.Bit, 0)
                            .query('INSERT INTO commandes (clientId, produits, quantite, prixTotal, adresseLivraison, statut) VALUES (@clientId, @produits, @quantite, @prixTotal, @adresseLivraison, @statut)');

            return result;
        } catch (err) {
            console.error(err)
            throw err;
        }
    },

    getOrderById: async (orderId) => {
        try {
            await sql.connect(sqlConfig);
            const request = new sql.Request();

            const result = await request
                            .input('orderId', sql.Int, orderId)
                            .query('SELECT * FROM commandes WHERE commandeId = @orderId');
            if (result.recordset) {
                return result.recordset[0]
            }
            return null;
            // return result.recordset?.[0] --> Fonctionne pareil
            
        } catch (err) {
            console.error(err)
            throw err;
        }
    },
};

module.exports = ordersService;