const express = require("express");
const router = express.Router();
const perfumeController = require("../controllers/perfume.controller");
const orderController = require("../controllers/order.controller");
const adminController = require("../controllers/admin.controller");
const { authenticateToken, requireAdmin } = require("../middleware/auth");

// Middleware de debug
router.use((req, res, next) => {
  console.log(`Requête reçue: ${req.method} ${req.path}`);
  next();
});

// Routes publiques
router.get("/new-arrivals", perfumeController.getNewArrivals);
router.get("/trends", perfumeController.getTrends);
router.get("/search", perfumeController.search);
router.get("/all", perfumeController.getAllPerfumes);
router.get("/id/:id", perfumeController.getPerfumeById);
router.get("/name/:name", perfumeController.getPerfumeByName);

// Routes protégées (utilisateurs connectés)
router.post("/addcart", authenticateToken, orderController.addToCart);
router.get("/cart", authenticateToken, orderController.getCart);
router.post("/order", authenticateToken, orderController.createOrder);
router.get("/orders/history", authenticateToken, orderController.getOrderHistory);
router.get("/allorders",authenticateToken,requireAdmin,adminController.getAllOrders);

// Routes Admin seulement
router.post("/createperfume", authenticateToken, requireAdmin, perfumeController.createPerfume);
router.put("/updateparfume/:id", authenticateToken, requireAdmin, perfumeController.updatePerfume);
router.delete("/deleteparfume/:id", authenticateToken, requireAdmin, perfumeController.deletePerfume);

// Routes statistiques Admin
router.get("/admin/stats", authenticateToken, requireAdmin, adminController.getSalesStats);
router.get("/admin/top-products", authenticateToken, requireAdmin, adminController.getTopProducts);
router.get("/admin/stock-alert", authenticateToken, requireAdmin, adminController.getStockAlert);

module.exports = router;