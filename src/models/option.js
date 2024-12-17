const Examen = require('./examen');

module.exports = (sequelize, DataTypes) => {
  const Option = sequelize.define("Option", 
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
          notEmpty: { msg: "Le sigle ne saurait être une chaîne vide."},
          notNull: { msg: "Le sigle est réquis." }
        }
      },
      nbMatProf: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Le nombre doit être un entier." },
          notNull: { msg: "Le nombre de matières professionnelles est réquis." },
          isPositive(value) {
            if (value < 0) {
              throw new Error("Le nombre de matières professionnelles doit être un entier positif.");
            }
          }
        }
      },
      examenId: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
          model: "Examens",
          key: 'id'
        },
        validate: {
          isInt: { msg: "examenId doit être un entier valide." },
          notNull: { msg: "examenId est requis." },
          isExistingExamen: async function(value) {
            if (!value) return; // Ignore si examenId est vide
            const examen = await Examen.findOne({ where: { id: value } });
            if (!examen) {
              throw new Error(`L'examen avec l'ID ${value} n'existe pas.`);
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
  Option.associate = (models) => {
    Option.belongsTo(Examen, { 
      foreignKey: 'examenId', 
      as: 'examen' });
  }
  

  return Option;
};