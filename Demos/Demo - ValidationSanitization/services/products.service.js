const sql = require('mssql');
const sqlConfig = require('../database');

const productService = {

    getAll: async () => {
        try {
            await sql.connect(sqlConfig);
            const result = await sql.query('SELECT * FROM produits')
            if (result) {
                return result.recordset;
            }
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = productService;