// config/db.config.js
require('dotenv').config();

module.exports = {
  development: {
    DB: process.env.DB_NAME || 'db_parfums',
    USER: process.env.DB_USER || 'root',
    PASSWORD: process.env.DB_PASSWORD || '',
    HOST: process.env.DB_HOST || 'localhost',
    PORT:process.env.DB_PORT || 3307,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  test: {
    // configuration pour l'environnement de test
  },
  production: {
    // configuration pour la production
  }
};
