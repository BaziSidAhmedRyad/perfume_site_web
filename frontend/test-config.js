// test-config.js
// test-config.js
console.log("Début du test de configuration...");

try {
  const config = require('./config/db.config.js');
  
  console.log('\nConfiguration développement:');
  console.log({
    DB: config.development.DB,
    USER: config.development.USER,
    HOST: config.development.HOST,
    dialect: config.development.dialect
  });

  console.log('\nVariables d\'environnement:');
  console.log({
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_HOST: process.env.DB_HOST
  });

  console.log('\nTest réussi ✅');
} catch (err) {
  console.error('ÉCHEC DU TEST ❌:', err.message);
  console.error('Stack:', err.stack);
}