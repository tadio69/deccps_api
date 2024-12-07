
const Fonction = require('./fonction');

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
          notNull: { msg: "Le nom est réquis." }
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
          notNull: { msg: "Le matricule est réquis." }
        }
      },
      langue: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "La langue ne saurait être une chaîne vide." },
          notNull: { msg: "La langue est réquise." }
        }
      },
      structure: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "La structure ne saurait être une chaîne vide." },
          notNull: { msg: "La structure est réquise." }
        }
      },
      grade: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le grade ne saurait être une chaîne vide." },
          notNull: { msg: "Le grade est réquis." }
        }
      },
      numtel: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le numéro de téléphone ne saurait être une chaîne vide." },
          notNull: { msg: "Le numéro de téléphone est réquis." }
        }
      },
      fonctionId: {
        type: DataTypes.INTEGER,
        references: {
          model: Fonction,
          key: 'id'
        },
        allowNull: false
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
      hooks: {
        async beforeCreate(personnel, options) {
          const existingPersonnel = await Personnel.findOne({
            where: {
              nom: personnel.nom,
              prenom: personnel.prenom
            }
          });
          
          if (existingPersonnel) {
            throw new Error("Cette combinaison de nom et prénom existe déjà.");
          }
        },
        async beforeUpdate(personnel, options) {
          const existingPersonnel = await Personnel.findOne({
            where: {
              nom: personnel.nom,
              prenom: personnel.prenom,
              id: { [DataTypes.Op.ne]: personnel.id } // Exclude the current record by id
            }
          });

          if (existingPersonnel) {
            throw new Error("Cette combinaison de nom et prénom existe déjà.");
          }
        }
      }
    }
  );
  
  Personnel.belongsTo(Fonction, { foreignKey: 'fonctionId', as: 'fonction' });
  return Personnel;
};
