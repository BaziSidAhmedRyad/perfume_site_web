module.exports = (sequelize, DataTypes) => {
  const Concentration = sequelize.define('Concentration', {
    level: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  Concentration.associate = (models) => {
    Concentration.hasMany(models.Perfume, {
      foreignKey: 'concentration_id'
    });
  };

  return Concentration;
};