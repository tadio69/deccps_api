const { Op } = require('sequelize');
const Fonction = require('./fonction');

const NOM_PRENOM_UNIQUE_ERROR = 'Un personnel avec ce nom et prénom existe déjà.';
const FONCTION_INEXISTANTE_ERROR = 'La fonction spécifiée n\'existe pas.';

module.exports = (sequelize, DataTypes, Fonction) => {
  const Personnel = sequelize.define("Personnel", 
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le nom ne saurait être une chaîne vide." },
          notNull: { msg: "Le nom est requis." }
        }
      },
      prenom: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: { msg: "Le prénom ne saurait être une chaîne vide." }
        }
      },
      matricule: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Ce matricule existe déjà." },
        validate: {
          notEmpty: { msg: "Le matricule ne saurait être une chaîne vide." },
          notNull: { msg: "Le matricule est requis." }
        }
      },
      langue: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "La langue ne saurait être une chaîne vide." },
          notNull: { msg: "La langue est requise." }
        }
      },
      structure: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "La structure ne saurait être une chaîne vide." },
          notNull: { msg: "La structure est requise." }
        }
      },
      grade: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le grade ne saurait être une chaîne vide." },
          notNull: { msg: "Le grade est requis." }
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
      fonctionId: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
          model: Fonction,
          key: 'id'
        },
        validate: {
          isInt: { msg: "fonctionId doit être un entier valide." },
          notNull: { msg: "fonctionId est requis." },
          isExistingFonction: async function(value) {
            if (!value) return; // Ignore si fonctionId est vide
            const fonction = await Fonction.findOne({ where: { id: value } });
            if (!fonction) {
              throw new Error(`La fonction avec l'ID ${value} n'existe pas.`);
            }
          }
        }
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['nom', 'prenom'],
          name: 'unique_nom_prenom'
        }
      ],
      validate: {
        nomPrenomUnique: async function() {
          const personnel = this;
          const count = await Personnel.count({
            where: {
              nom: personnel.nom,
              prenom: personnel.prenom,
              id: { [Op.ne]: personnel.id }
            }
          });
          if (count > 0) {
            throw new Error(`Le couple nom/prénom "${personnel.nom} ${personnel.prenom}" existe déjà.`);
          }
        }
      }
    }
  );

  // Associations
  Personnel.belongsTo(Fonction, { foreignKey: 'fonctionId', as: 'fonction' });
  Fonction.hasMany(Personnel, { foreignKey: 'fonctionId', as: 'personnels' });

  return Personnel;
};
