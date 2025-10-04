module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    // Ajoutez ces champs si nécessaire
    sale_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: true, // createdAt et updatedAt sont automatiquement gérés
    updatedAt: false // On désactive updatedAt si inutile
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.Perfume, {
      foreignKey: 'perfume_id',
      as: 'perfume'
    });
  };

  return Sale;
};