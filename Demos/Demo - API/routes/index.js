// Création du routeur
const router = require("express").Router();

// Création de la racine du routeur
const taskRouter = require("./task.router");
router.use("/task", taskRouter)
// router.use("user", () => {})

// Export du routeur
module.exports = router;