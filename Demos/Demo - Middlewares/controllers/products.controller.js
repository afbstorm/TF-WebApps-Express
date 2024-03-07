
const productsController = {

    getProducts: (req, res) => {
        res.send('<h1> Liste des produits </h1>')
    },

    getProductByName: (req, res) => {

        const product = req.params.productName
        res.send(`<h1>Affichage de l'article avec le nom ${product}`)
    }
}

module.exports = productsController;



