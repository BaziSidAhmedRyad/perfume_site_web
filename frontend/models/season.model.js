module.exports = (sequelize, DataTypes) => {
  const Season = sequelize.define('Season', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  Season.associate = (models) => {
    Season.hasMany(models.Perfume, {
      foreignKey: 'season_id'
    });
  };

  return Season;
};