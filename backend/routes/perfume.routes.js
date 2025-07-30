const express = require("express");
const router = express.Router();
const perfumeController = require("../controllers/perfume.controller");
// Ajoutez ce middleware pour debug
router.use((req, res, next) => {
  console.log(`Requête reçue: ${req.method} ${req.path}`);
  next();
});
// Nouveautés
router.get("/new-arrivals", perfumeController.getNewArrivals);

// Tendances
router.get("/trends", perfumeController.getTrends);

// Recherche
router.get("/search", perfumeController.search);

module.exports = router;