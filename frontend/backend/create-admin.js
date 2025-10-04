require('dotenv').config();
const db = require('./models');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash('adminpassword', 12);
    
    const admin = await db.User.create({
      prenom: 'Admin',
      nom: 'System',
      email: 'admin@parfumerie.com',
      mot_de_passe: hashedPassword,
      role: 'admin',
      numero: '+33600000000',
      adresse: 'Siège social'
    });

    console.log('✅ Admin créé :', admin.email);
    console.log('📧 Email: admin@parfumerie.com');
    console.log('🔑 Mot de passe: adminpassword');
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

createAdmin();