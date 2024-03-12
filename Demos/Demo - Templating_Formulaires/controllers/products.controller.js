const products = require('../datas/products.json');

const ProductController = {
    // Affichage de la page qui va contenir la liste des produits
    getProducts: (req, res) => {
        res.render('products', { products }) // { products } === { products: products } -> Quand la key et la value sont identiques, il n'est pas obligatoire d'écrire les deux
    },

    // Affichage de la page qui va contenir les détails d'un produit en particulier que l'on retrouver via son id
    getProductDetails: (req, res) => {
        const productId = parseInt(req.params.id); // details/:id
        // Recherche dans la liste des produits, on compare l'id de chaque produit avec celui récupéré en params
        // Si correspondance, on le stocke dans la constante product
        const product = products.find(product => product.id === productId); 
        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.render('productDetails', { product })
    }
}

module.exports = ProductController;