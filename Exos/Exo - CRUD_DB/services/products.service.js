const sql = require('mssql');
const sqlConfig = require('../database');

const productsService = {

    getAll: async () => {
        try {
            await sql.connect(sqlConfig);
            const result = await sql.query `SELECT * FROM produits`
            if (result) {
                return result.recordset;
            }
        } catch (err) {
            console.error(err)
        }
    },

    getProductById: async (id) => {
        try {
            await sql.connect(sqlConfig);
            const result = await sql.query `SELECT * FROM produits WHERE id = ${id}`
            if (result.recordset.length > 0) {
                return result.recordset[0];
            }
        } catch (err) {
            console.error(err);
        }
    },

    getProductByName: async (name) => {
        try {
            await sql.connect(sqlConfig);
            const result = await sql.query `SELECT * FROM produits WHERE name = ${name}`
            if (result.recordset.length > 0) {
                return result.recordset[0];
            }
        } catch (err) {
            console.error(err);
        }
    },

    addProduct: async (data) => {
        try {
            await sql.connect(sqlConfig);
            const { name, description, category, hashedStorageZone } = data;
            const result = await sql.query `INSERT INTO produits (name, description, categorie, zone_de_stockage)
                                            VALUES (${name}, ${description}, ${category}, ${hashedStorageZone})`
            
            if (result.rowsAffected[0] > 0) {
                return result
            }
        } catch (err) {
            console.error(err)
        }
    },

    updateProduct: async (product, data) => {
        try {
            await sql.connect(sqlConfig);
            const updateQuery = `UPDATE produits SET ${data.join(', ')} WHERE id = ${product.id}`;
            const result = await sql.query(updateQuery);
            return (result.rowsAffected[0] > 0)

        } catch (err) {
            console.error(err)
        }
    },

    deleteProduct: async (id) => {
        try {
            await sql.connect(sqlConfig);
            const result = await sql.query `DELETE FROM produits WHERE id = ${id}`;
            if (result.rowsAffected[0] > 0) {
                return result
            }
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = productsService;