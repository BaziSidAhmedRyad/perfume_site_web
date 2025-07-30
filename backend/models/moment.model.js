module.exports = (sequelize, DataTypes) => {
  const Moment = sequelize.define('Moment', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  Moment.associate = (models) => {
    Moment.hasMany(models.Perfume, {
      foreignKey: 'moment_id'
    });
  };

  return Moment;
};