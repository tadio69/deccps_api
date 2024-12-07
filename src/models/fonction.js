module.exports = (sequelize, DataTypes) => {
  const Fonction = sequelize.define('Fonction', {
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
        notEmpty: { msg: "Le nom ne saurait être une chaîne vide."},
        notNull: { msg: "Le nom est réquis." }
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
    }
  });

  return Fonction; // Retourne le modèle Fonction
};