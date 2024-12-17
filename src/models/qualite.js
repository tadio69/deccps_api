module.exports = (sequelize, DataTypes) => {
  const Qualite = sequelize.define('Qualite', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "Ce titre existe déjà." },
      validate: {
        notEmpty: { msg: "Le titre ne saurait être une chaîne vide."},
        notNull: { msg: "Le titre est réquis." }
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
  },
  {
    timestamps: true,
    createdAt: "created",
    updatedAt: false,
  }
);

  return Qualite;
};