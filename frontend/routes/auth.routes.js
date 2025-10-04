const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Routes publiques
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Routes protégées
router.get('/profile', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// Route admin seulement
router.patch('/promote/:userId', authenticateToken, requireAdmin, authController.promoteToAdmin);

module.exports = router;