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
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Utilisez created_at au lieu de createdAt
    const [results] = await db.sequelize.query(`
      SELECT 
        p.id,
        p.name,
        p.price,
        p.image_url,
        COALESCE(SUM(s.quantity), 0) as total_sales
      FROM Perfumes p
      LEFT JOIN Sales s ON p.id = s.perfume_id 
        AND s.created_at >= :thirtyDaysAgo
      GROUP BY p.id
      HAVING total_sales > 0
      ORDER BY total_sales DESC
      LIMIT 10
    `, {
      replacements: { thirtyDaysAgo },
      type: db.sequelize.QueryTypes.SELECT
    });

    res.json(results || []);
  } catch (error) {
    console.error('Erreur dans getTrends:', error.message);
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
// Récupérer les détails d'un parfum par ID
exports.getPerfumeById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const perfume = await db.Perfume.findByPk(id, {
      include: [
        { model: db.Category, as: 'categories' },
        { model: db.Type, as: 'type' },
        { model: db.Season, as: 'season' },
        { model: db.Gender, as: 'gender' },
        { model: db.Concentration, as: 'concentration' }
      ]
    });

    if (!perfume) {
      return res.status(404).json({ message: 'Parfum non trouvé' });
    }

    res.json(perfume);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération du parfum',
      error: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
};

// Récupérer les détails d'un parfum par nom
exports.getPerfumeByName = async (req, res) => {
  try {
    const { name } = req.params;
    
    const perfume = await db.Perfume.findOne({
      where: { name },
      include: [
        { model: db.Category, as: 'categories' },
        { model: db.Type, as: 'type' },
        { model: db.Season, as: 'season' },
        { model: db.Gender, as: 'gender' },
        { model: db.Concentration, as: 'concentration' }
      ]
    });

    if (!perfume) {
      return res.status(404).json({ message: 'Parfum non trouvé' });
    }

    res.json(perfume);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération du parfum',
      error: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
};

// Ajouter un nouveau parfum (Admin seulement)
exports.createPerfume = async (req, res) => {
  try {
    const { name, description, price, stock_quantity, image_url, categories, type_id, season_id, gender_id, concentration_id } = req.body;

    const perfume = await db.Perfume.create({
      name,
      description,
      price,
      stock_quantity,
      image_url,
      type_id,
      season_id,
      gender_id,
      concentration_id
    });

    if (categories && categories.length > 0) {
      await perfume.setCategories(categories);
    }

    const newPerfume = await db.Perfume.findByPk(perfume.id, {
      include: [{ model: db.Category, as: 'categories' }]
    });

    res.status(201).json(newPerfume);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la création du parfum',
      error: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
};

// Mettre à jour un parfum (Admin seulement)
exports.updatePerfume = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const perfume = await db.Perfume.findByPk(id);
    if (!perfume) {
      return res.status(404).json({ message: 'Parfum non trouvé' });
    }

    await perfume.update(updates);

    if (updates.categories) {
      await perfume.setCategories(updates.categories);
    }

    const updatedPerfume = await db.Perfume.findByPk(id, {
      include: [{ model: db.Category, as: 'categories' }]
    });

    res.json(updatedPerfume);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la mise à jour du parfum',
      error: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
};

// Supprimer un parfum (Admin seulement)
exports.deletePerfume = async (req, res) => {
  try {
    const { id } = req.params;

    const perfume = await db.Perfume.findByPk(id);
    if (!perfume) {
      return res.status(404).json({ message: 'Parfum non trouvé' });
    }

    await perfume.destroy();
    res.json({ message: 'Parfum supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la suppression du parfum',
      error: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
};

// Récupérer tous les parfums (pour la page de filtrage)
exports.getAllPerfumes = async (req, res) => {
  try {
    const perfumes = await db.Perfume.findAll({
      include: [
        { model: db.Category, as: 'categories' },
        { model: db.Type, as: 'type' },
        { model: db.Season, as: 'season' },
        { model: db.Gender, as: 'gender' },
        { model: db.Concentration, as: 'concentration' }
      ],
      order: [['name', 'ASC']]
    });

    res.json(perfumes);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des parfums',
      error: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
};