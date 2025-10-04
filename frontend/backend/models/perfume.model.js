module.exports = (sequelize, DataTypes) => {
  const Perfume = sequelize.define('Perfume', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0
      }
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: true,
        min: 0
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Perfume.associate = (models) => {
    Perfume.belongsToMany(models.Category, {
      through: 'PerfumeCategories',
      as: 'categories',
      foreignKey: 'perfume_id'
    });
    Perfume.belongsTo(models.Type, { as: 'type', foreignKey: 'type_id' });
    Perfume.belongsTo(models.Season, { as: 'season', foreignKey: 'season_id' });
    Perfume.belongsTo(models.Moment, { as: 'moment', foreignKey: 'moment_id' });
    Perfume.belongsTo(models.Gender, { as: 'gender', foreignKey: 'gender_id' });
    Perfume.belongsTo(models.Concentration, { 
      as: 'concentration', 
      foreignKey: 'concentration_id' 
    });
    Perfume.hasMany(models.Sale, {
      as: 'sales',
      foreignKey: 'perfume_id'
    });
  };

  return Perfume;
};