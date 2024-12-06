const Fonction = require('./fonction')
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Personnel", 
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
          notEmpty: { msg: "Le nom ne saurait être une chaîne vide."},
          notNull: { msg: "Le nom est réquis." }
        }
      },
      prenom: {
          type: DataTypes.STRING,
          allowNull: true,
          validate: {
            notEmpty: { msg: "Le prénom ne saurait être une chaîne vide."}
          }
      },
      matricule: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Ce matricule existe déjà." },
        validate: {
          notEmpty: { msg: "Le matricule ne saurait être une chaîne vide."},
          notNull: { msg: "Le matricule est réquis." }
        }
      },
      langue: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "La langue ne saurait être une chaîne vide."},
          notNull: { msg: "La langue est réquise." }
        }
      },
      structure: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "La structure ne saurait être une chaîne vide."},
          notNull: { msg: "La structure est réquise." }
        }
      },
      grade: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le grade ne saurait être une chaîne vide."},
          notNull: { msg: "La grade est réquis." }
        }
      },
      numtel: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le numéro de téléphone ne saurait être une chaîne vide."},
          notNull: { msg: "La numéro de téléphone est réquis." }
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
          validate: {
            customValidator(value) {
              if (value.some(val => val === null)) {
                throw new Error('Les champs nom et prénom ne peuvent pas être tous nuls.');
              } else {
                throw new Error('Une telle combinaison nom/prénom existe déjà.');
              }
            }
          }
        }
      ]
    }
  )
}