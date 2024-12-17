module.exports = (sequelize, DataTypes) => {
  const Parametre = sequelize.define("Parametre", 
    {
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
          notEmpty: { msg: "Le titre ne saurait être une chaîne vide." },
          notNull: { msg: "Le titre est requis." }
        }
      },
      abreviation: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Cette abréviation existe déjà." },
        validate: {
          notEmpty: { msg: "L'abréviation ne saurait être une chaîne vide." },
          notNull: { msg: "L'abréviation est requise." }
        }
      },
      varieAvec: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le sens de variation ne saurait être une chaîne vide." },
          notNull: { msg: "Le sens de variation est requis." }
        }
      }
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );

  return Parametre;
};
