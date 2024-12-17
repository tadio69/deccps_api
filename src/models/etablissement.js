const Departement = require('./departement');

module.exports = (sequelize, DataTypes) => {
  const Etablissement = sequelize.define("Etablissement", 
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
      sigle: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Ce sigle existe déjà." },
        validate: {
          notEmpty: { msg: "Le sigle ne saurait être une chaîne vide." },
          notNull: { msg: "Le sigle est requis." }
        }
      },
      numtel: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le numéro de téléphone ne saurait être une chaîne vide." },
          notNull: { msg: "Le numéro de téléphone est requis." }
        }
      },
      secteur: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le secteur ne saurait être une chaîne vide." },
          notNull: { msg: "Le secteur est requis." }
        }
      },
      type_ens: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le type d'enseignement ne saurait être une chaîne vide." },
          notNull: { msg: "Le type d'enseignement est requis." }
        }
      },
      ordre_ens: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "L'ordre d'enseignement ne saurait être une chaîne vide." },
          notNull: { msg: "L'ordre d'enseignement est requis." }
        }
      },
      departementId: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
          model: "Departements", // Nom de la table associée,
          key: 'id'
        },
        validate: {
          isInt: { msg: "departementId doit être un entier valide." },
          notNull: { msg: "departementId est requis." },
          isExistingDepartement: async function(value) {
            if (!value) return; // Ignore si departementId est vide
            const departement = await Departement.findOne({ where: { id: value } });
            if (!departement) {
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
  Etablissement.associate = (models) => {
    Etablissement.belongsTo(models.Departement, { 
      foreignKey: 'departementId', 
      as: 'departement' });
  }

  return Etablissement;
};