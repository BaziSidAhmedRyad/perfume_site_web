require('dotenv').config();
const db = require('./models');

async function seedData() {
  try {
    // Créez les données de référence
    const types = await db.Type.bulkCreate([
      { name: 'Eau de Parfum' },
      { name: 'Eau de Toilette' },
      { name: 'Eau de Cologne' }
    ]);

    const seasons = await db.Season.bulkCreate([
      { name: 'Printemps' },
      { name: 'Été' },
      { name: 'Automne' },
      { name: 'Hiver' }
    ]);

    const genders = await db.Gender.bulkCreate([
      { name: 'Femme' },
      { name: 'Homme' },
      { name: 'Unisexe' }
    ]);

    const concentrations = await db.Concentration.bulkCreate([
      { level: '*2' },
      { level: '*3' },
      { level: '*5' }
    ]);

    const categories = await db.Category.bulkCreate([
      { name: 'Floral' },
      { name: 'Boisé' },
      { name: 'Fruité' },
      { name: 'Oriental' },
      { name: 'Aquatique' }
    ]);

    console.log('✅ Données de référence créées avec succès!');
    console.log('Types:', types.map(t => `${t.id}: ${t.name}`));
    console.log('Catégories:', categories.map(c => `${c.id}: ${c.name}`));
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

seedData();