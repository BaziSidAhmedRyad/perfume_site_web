require('dotenv').config();
const express = require('express');
const db = require('./models');
const cors =require('cors');

const app = express();


db.sequelize.sync({ force: false}) // Utilisez force: true pour réinitialiser la DB
  // .then(() => {
  //   console.log('Base de données synchronisée avec succès.');
  //   app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
  // });
// Middleware
app.use(express.json());


app.use(cors({
  origin: "http://localhost:3000", // frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


// Test de base
app.get('/', (req, res) => res.json({ status: 'API OK' }));

// Routes
const perfumeRoutes = require('./routes/perfume.routes');
app.use('/api/perfumes', perfumeRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);
// Démarrer le serveur
const PORT = process.env.PORT || 5000;
db.sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur port ${PORT}`);
      console.log('Modèles disponibles:', Object.keys(db).filter(k => typeof db[k] === 'object')); 
    });
  })
  .catch(err => {
    console.error('Échec de synchronisation DB:', err);
  });