// Création du routeur
const router = require("express").Router();

// Création de la racine du routeur
const bookRouter = require("./book.router");
router.use("/books", bookRouter)
// router.use("user", () => {})

// Export du routeur
module.exports = router;
