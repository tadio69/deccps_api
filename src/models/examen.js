module.exports = (sequelize, DataTypes) => {
  const Examen = sequelize.define('Examen', {
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
    systeme: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le système d'enseignement ne saurait être une chaîne vide." },
        notNull: { msg: "Le système d'enseignement est requis." }
      }
    },
    niveau: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le niveau d'enseignement ne saurait être une chaîne vide." },
        notNull: { msg: "Le niveau d'enseignement est requis." }
      }
    }
  },
  {
    timestamps: true,
    createdAt: "created",
    updatedAt: false,
  }
);

  return Examen;
};