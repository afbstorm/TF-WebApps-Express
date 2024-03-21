const productService = require('../services/products.service');

const productController = {
    getAll: async (req, res) => {
        try {
            const result = await productService.getAll();
            if (result) {
                res.status(200).json(result)
            }
        } catch (err) {
            console.error(err)
            res.sendStatus(500)
        }
    }
}

module.exports = productController;