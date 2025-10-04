module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  Type.associate = (models) => {
    Type.hasMany(models.Perfume, {
      foreignKey: 'type_id'
    });
  };

  return Type;
};