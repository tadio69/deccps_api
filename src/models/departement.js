const Region = require('./region')

module.exports = (sequelize, DataTypes) => {
  const Departement = sequelize.define("Departement", 
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Ce nom existe déjà." },
        validate: {
          notEmpty: { msg: "Le nom ne saurait être une chaîne vide." },
          notNull: { msg: "Le nom est requis." }
        }
      },
      regionId: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
          model: "Regions", // Nom de la table associée
          key: 'id'
        },
        validate: {
          isInt: { msg: "regionId doit être un entier valide." },
          notNull: { msg: "regionId est requis." },
          isExistingRegion: async function(value) {
            if (!value) return; // Ignore si regionId est vide
            const region = await Region.findOne({ where: { id: value } });
            if (!region) {
              throw new Error(`La région avec l'ID ${value} n'existe pas.`);
            }
          }
        }
      }
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );

  // Associations
  Departement.associate = (models) => {
    Departement.belongsTo(models.Region, {
      foreignKey: "regionId",
      as: "region",
    });
    Departement.hasMany(models.Etablissement, {
      foreignKey: "departementId",
      as: "etablissements",
    });
  };

  return Departement;
};