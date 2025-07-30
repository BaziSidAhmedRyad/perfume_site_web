const { Op } = require('sequelize');
const db = require("../models");
// const Perfume = db.perfume;
// const Op = db.Sequelize.Op;

// Récupérer les nouveautés
exports.getNewArrivals = async (req, res) => {
 try {
    // Vérification que le modèle est bien chargé
    if (!db.Perfume) throw new Error('Modèle Perfume non trouvé');
    
    const perfumes = await db.Perfume.findAll({
      order: [['created_at', 'DESC']],
      limit: 10,
      attributes: ['id', 'name', 'price', 'image_url'] // Champs spécifiques
    });
    
    res.json(perfumes || []); // Retourne un tableau vide si aucun résultat
  } catch (error) {
    console.error('Erreur critique:', {
      message: error.message,
      stack: error.stack,
      dbModels: Object.keys(db) // Affiche les modèles disponibles
    });
    res.status(500).json({ 
      message: 'Erreur de chargement des données',
      details: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
};

// Récupérer les tendances
exports.getTrends = async (req, res) => {
  try {
    const trendingPerfumes = await db.Perfume.findAll({
      attributes: [
        'id',
        'name',
        'price',
        'image_url',
        [db.sequelize.fn('SUM', db.sequelize.col('Sales.quantity')), 'total_sales']
      ],
      include: [{
        model: db.Sale,
        as: 'sales',
        attributes: [],
        required: true,
        where: {
          createdAt: {
            [Op.gte]: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
          }
        }
      }],
      group: ['Perfume.id'],
      order: [[db.sequelize.literal('total_sales'), 'DESC']],
      limit: 10
    });

    res.json(trendingPerfumes || []);
  } catch (error) {
    console.error('Erreur dans getTrends:', {
      message: error.message,
      stack: error.stack,
      sql: error.sql // Affiche la requête SQL en erreur
    });
    res.status(500).json({
      message: 'Erreur lors du chargement des tendances',
      details: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
};

// Recherche et filtrage
exports.search = async (req, res) => {
  try {
    const { query, minPrice, maxPrice, categories, seasons, types, genders } = req.query;
    const whereConditions = {};
    const includeConditions = [];

    // Filtre par texte
    if (query) {
      whereConditions.name = {
        [db.Sequelize.Op.like]: `%${query}%`
      };
    }

    // Filtre par prix
    if (minPrice || maxPrice) {
      whereConditions.price = {};
      if (minPrice) whereConditions.price[Op.gte] = parseFloat(minPrice);
      if (maxPrice) whereConditions.price[Op.lte] = parseFloat(maxPrice);
    }

    // Filtre par catégories
    if (categories) {
      includeConditions.push({
        model: db.Category,
        as: 'categories',
        where: {
          id: categories.split(',')
        }
      });
    }

    // Filtre par saisons
    if (seasons) {
      includeConditions.push({
        model: db.Season,
        as: 'season',
        where: {
          id: seasons.split(',')
        }
      });
    }

    // Filtre par types
    if (types) {
      includeConditions.push({
        model: db.Type,
        as: 'type',
        where: {
          id: types.split(',')
        }
      });
    }

    // Filtre par genres
    if (genders) {
      includeConditions.push({
        model: db.Gender,
        as: 'gender',
        where: {
          id: genders.split(',')
        }
      });
    }

    const perfumes = await db.Perfume.findAll({
      where: whereConditions,
      include: includeConditions,
      attributes: ['id', 'name', 'price', 'image_url'],
      order: [['created_at', 'DESC']]
    });

    res.json(perfumes || []);
  } catch (error) {
    console.error('Erreur dans search:', {
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({
      message: 'Erreur lors de la recherche',
      details: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
};