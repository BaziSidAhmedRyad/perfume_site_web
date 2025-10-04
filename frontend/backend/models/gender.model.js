module.exports = (sequelize, DataTypes) => {
  const Gender = sequelize.define('Gender', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  Gender.associate = (models) => {
    Gender.hasMany(models.Perfume, {
      foreignKey: 'gender_id'
    });
  };

  return Gender;
};