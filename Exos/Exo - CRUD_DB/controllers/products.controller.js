const bcrypt = require('bcrypt');
const productsService = require('../services/products.service');

const productsController = {

    getAll: async (req, res) => {
        try {
            const result = await productsService.getAll();
            if (result) {
                res.status(200).send(result);
            }

        } catch (err) {
            console.error(err)
            res.sendStatus(500)
        }
    }, 

    getProductById: async (req, res) => {
        try {
            // const id = req.params.id; ---> Stockage dans une constante sans destructuring
            const { id } = req.params; // ---> Stockage dans une constante avec destructuring
            const result = await productsService.getProductById(id);
            if (result) {
                return res.status(200).json(result)
            } else {
                return res.status(404).json({message: `Le produit avec l'id : ${id} est introuvable ou n'existe pas.`})
            }

        } catch (err) {
            console.error(err)
            res.sendStatus(500)
        }
    }, 

    getProductByName: async (req, res) => {
        try {
            const { name } = req.params; // ---> Stockage dans une constante avec destructuring
            const result = await productsService.getProductByName(name);
            if (result) {
                return res.status(200).json(result)
            } else {
                return res.status(404).json({message: `Le produit avec le nom : ${name} est introuvable ou n'existe pas.`})
            }
        } catch (err) {
            console.error(err)
            res.sendStatus(500)
        }
    }, 

    addProduct: async (req, res) => {
        try {
            const { name, description, category, storageZone } = req.body;
            const hashedStorageZone = bcrypt.hashSync(storageZone, 10);

            const result = await productsService.addProduct({name, description, category, hashedStorageZone});
            if (result) {
                return res.status(200).json({message: 'Produit correctement ajouté.'})
            } else {
                return res.status(500).json({message: `Le serveur n'a pas pu ajouter le produit : ${name} suite à une erreur`})
            }
        } catch (err) {
            console.error(err)
            res.sendStatus(500)
        }
    }, 

    updateProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description, category, oldStorageZone, newStorageZone } = req.body;

            const product = await productsService.getProductById(id)

            if (!product) {
                return res.status(404).json({message: `Le produit avec l'id : ${id} n'existe pas.`})
            }

            let updateFields = [];
            if (newStorageZone && oldStorageZone) {
                const isZoneValid = bcrypt.compareSync(oldStorageZone, product.zone_de_stockage);
                if (!isZoneValid) {
                    return res.status(401).json({message: 'La zone de stockage est incorrecte'})
                } else {
                    const hashedStorageZone = bcrypt.hashSync(newStorageZone, 10);
                    updateFields.push(`zone_de_stockage = '${hashedStorageZone}'`);
                }
            }

            if (name) updateFields.push(`name = '${name}'`)
            if (description) updateFields.push(`description = '${description}'`)
            if (category) updateFields.push(`categorie = '${category}'`)

            const result = await productsService.updateProduct(product, updateFields);

            if (result) {
                return res.status(200).json({message: `Le produit avec l'id : ${id} a bien été modifié`})
            } else {
                return res.status(500).json({message: `Le serveur a recontré une erreur`})
            }

        } catch (err) {
            console.error(err)
            res.sendStatus(500)
        }
    }, 

    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await productsService.deleteProduct(id)
            if (!result) {
                return res.status(404).json({message: `Il n'y a pas de produit avec l'id spécifié : ${id}`})
            }
            return res.status(200).json(result)
        } catch (err) {
            console.error(err)
            res.sendStatus(500)
        }
    }, 

}

module.exports = productsController;