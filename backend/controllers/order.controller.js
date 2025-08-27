const db = require('../models');

// Ajouter au panier
exports.addToCart = async (req, res) => {
  try {
    const { perfumeId, quantity = 1 } = req.body;
    const userId = req.user.id;

    let cart = await db.Cart.findOne({ where: { user_id: userId, perfume_id: perfumeId } });

    if (cart) {
      cart.quantity += quantity;
      await cart.save();
    } else {
      cart = await db.Cart.create({
        user_id: userId,
        perfume_id: perfumeId,
        quantity
      });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de l\'ajout au panier',
      error: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
};

// Voir le panier
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await db.Cart.findAll({
      where: { user_id: userId },
      include: [{ model: db.Perfume, as: 'perfume' }]
    });

    res.json(cart);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération du panier',
      error: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
};

// Passer commande
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, total, shipping_address } = req.body;

    const order = await db.Order.create({
      user_id: userId,
      total,
      shipping_address,
      status: 'pending'
    });

    for (const item of items) {
      await db.OrderItem.create({
        order_id: order.id,
        perfume_id: item.perfume_id,
        quantity: item.quantity,
        price: item.price
      });

      // Décrémenter le stock
      const perfume = await db.Perfume.findByPk(item.perfume_id);
      perfume.stock_quantity -= item.quantity;
      await perfume.save();
    }

    // Vider le panier
    await db.Cart.destroy({ where: { user_id: userId } });

    const completeOrder = await db.Order.findByPk(order.id, {
      include: [{ model: db.OrderItem, include: [db.Perfume] }]
    });

    res.status(201).json(completeOrder);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la création de la commande',
      error: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
};

// Historique des commandes
exports.getOrderHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await db.Order.findAll({
      where: { user_id: userId },
      include: [{ model: db.OrderItem, include: [db.Perfume] }],
      order: [['createdAt', 'DESC']]
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération de l\'historique',
      error: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
};