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
      ]
    }
  );

  // Associations
  Personnel.belongsTo(Fonction, { foreignKey: 'fonctionId', as: 'fonction' });
  Fonction.hasMany(Personnel, { foreignKey: 'fonctionId', as: 'personnels' });

  // Hooks
  Personnel.addHook('beforeSave', async (personnel) => {
    // Vérifier la combinaison unique de nom et prénom
    const existingPersonnel = await Personnel.findOne({
      where: {
        nom: personnel.nom,
        prenom: personnel.prenom,
        id: { [sequelize.Op.ne]: personnel.id } // Exclure l'élément actuel lors de la mise à jour
      }
    });

    if (existingPersonnel) {
      throw new Error("Cette combinaison de nom et prénom existe déjà.");
    }
  });

  Personnel.addHook('beforeSave', async (personnel) => {
    // Vérifier si la fonction existe
    if (personnel.fonctionId) {
      const fonction = await Fonction.findByPk(personnel.fonctionId);
      if (!fonction) {
        throw new Error("La fonction spécifiée n'existe pas.");
      }
    }
  });

  return Personnel;
};
