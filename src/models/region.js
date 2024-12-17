module.exports = (sequelize, DataTypes) => {
  const Region = sequelize.define("Region", 
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Cette région existe déjà." },
        validate: {
          notEmpty: { msg: "Le nom d'une région ne saurait être une chaîne vide."},
          notNull: { msg: "Le nom de la région est réquise."          }
        }
      }
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );

  Region.associate = (models) => {
    Region.hasMany(models.Departement, {
      foreignKey: "regionId",
      as: "departements",
    });
  };

  return Region;
};