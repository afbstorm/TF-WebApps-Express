const ordersService = require('../services/orders.service');
const clientsService = require('../services/clients.service');
const orderValidator = require('../validators/order.validator');

const ordersController = {
    getOrders: async (req, res) => {
        try {
            const { userId } = req.payload;
            const orders = await ordersService.getOrders(userId);

            if (orders.length > 0) {
                // res.status(200).json({ orders: orders })
                res.status(200).json({ orders })
            } else {
                res.status(404).json({ message: "Vous n'avez pas encore passé de commande" })
            }
        } catch (err) {
            console.error(err)
            res.sendStatus(500);
        }
    }, 

    createOrder: async (req, res) => {
        try {

            const { userId } = req.payload;
            const validationResult = await orderValidator.validate(req.body);
            if (validationResult.error) {
                res.status(400).json({error: validationResult.error})
            }

            const { produits, quantite, prixTotal } = validationResult;
            const client = await clientsService.getProfile(userId);

            if (client) {
                const adresseLivraison = client.AdresseLivraison;
                const order = await ordersService.createOrder({ userId, produits, quantite, prixTotal, adresseLivraison });

                if (order) {
                    res.status(201).json({message: 'Commande correctement effectuée'})
                }
            }
        } catch (err) {
            console.error(err)
            res.sendStatus(500);
        }
    }, 

    getOrderById: async (req, res) => {
        try {
            const { userId } = req.payload;
            // Si destructuring, on récupère le nom du param EXACT -- param === :id 
            // --> const { id } = req.params;

            // Si pas de destructuring on stocke le param dans ce qu'on veut en ciblant la key du param 
            // --> const { orderId } = req.params.id;
            const { id } = req.params;

            console.log(userId, id);

            const order = await ordersService.getOrderById(id);

            if (!order || order.ClientID !== userId) {
                return res.status(404).json({message: 'Commande inexistante ou introuvable'})
            }
            res.status(200).json({ order })

        } catch (err) {
            console.error(err)
            res.sendStatus(500);
        }
    }
}

module.exports = ordersController;