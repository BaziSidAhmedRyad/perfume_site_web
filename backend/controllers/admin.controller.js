const db = require('../models');

// Statistiques de ventes
exports.getSalesStats = async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    
    let groupBy, dateFormat;
    switch (period) {
      case 'day':
        groupBy = 'DATE(createdAt)';
        dateFormat = '%Y-%m-%d';
        break;
      case 'month':
        groupBy = 'MONTH(createdAt), YEAR(createdAt)';
        dateFormat = '%Y-%m';
        break;
      case 'quarter':
        groupBy = 'QUARTER(createdAt), YEAR(createdAt)';
        dateFormat = '%Y-Q%q';
        break;
      default:
        groupBy = 'MONTH(createdAt), YEAR(createdAt)';
        dateFormat = '%Y-%m';
    }

    const salesStats = await db.sequelize.query(`
      SELECT 
        DATE_FORMAT(createdAt, '${dateFormat}') as period,
        COUNT(*) as total_orders,
        SUM(total) as total_revenue,
        AVG(total) as average_order_value
      FROM Orders
      GROUP BY ${groupBy}
      ORDER BY period DESC
    `, { type: db.sequelize.QueryTypes.SELECT });

    res.json(salesStats);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des statistiques',
      error: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
};

// Produits les plus vendus
exports.getTopProducts = async (req, res) => {
  try {
    const topProducts = await db.sequelize.query(`
      SELECT 
        p.id,
        p.name,
        p.image_url,
        SUM(oi.quantity) as total_sold,
        SUM(oi.quantity * oi.price) as total_revenue
      FROM OrderItems oi
      JOIN Perfumes p ON oi.perfume_id = p.id
      GROUP BY p.id
      ORDER BY total_sold DESC
      LIMIT 10
    `, { type: db.sequelize.QueryTypes.SELECT });

    res.json(topProducts);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des produits populaires',
      error: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
};

// Gestion des stocks
exports.getStockAlert = async (req, res) => {
  try {
    const lowStockProducts = await db.Perfume.findAll({
      where: {
        stock_quantity: {
          [db.Sequelize.Op.lt]: 10 // Moins de 10 en stock
        }
      },
      order: [['stock_quantity', 'ASC']]
    });

    res.json(lowStockProducts);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des alertes de stock',
      error: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
};