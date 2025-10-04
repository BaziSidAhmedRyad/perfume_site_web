const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');

// Inscription
exports.signup = async (req, res) => {
  try {
    const { prenom, nom, email, numero, adresse, mot_de_passe, role = 'user' } = req.body;

    // Vérifier si l'email existe déjà
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(mot_de_passe, 12);

    // Créer l'utilisateur
    const user = await db.User.create({
      prenom,
      nom,
      email,
      numero,
      adresse,
      mot_de_passe: hashedPassword,
      role
    });

    // Générer le token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      token,
      user: {
        id: user.id,
        prenom: user.prenom,
        nom: user.nom,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'inscription', error: error.message });
  }
};

// Connexion
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Trouver l'utilisateur
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }
    const admin_email='parfum@gmail.com';
    const admin_password='parfunqwertyazerty';
  if (email === admin_email && password === admin_password) {
      const token = jwt.sign(
        { userId: 0, email: admin_email, role: 'admin' }, // id 0 = fictif
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      return res.json({
        message: 'Connexion admin réussie',
        token,
        user: { id: 0, prenom: "Admin", nom: "Super", email: admin_email, role: 'admin' }
      });
    }

    // Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, user.mot_de_passe);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }
  

    // Générer le token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user.id,
        prenom: user.prenom,
        nom: user.nom,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion', error: error.message });
  }
};

// Promotion admin (seulement pour les admins existants)
exports.promoteToAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    user.role = 'admin';
    await user.save();

    res.json({ message: 'Utilisateur promu admin avec succès', user });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la promotion', error: error.message });
  }
};