module.exports = (sequelize, DataTypes) => {
  const Activite = sequelize.define('Activite', {
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
    }
  },
  {
    timestamps: true,
    createdAt: "created",
    updatedAt: false,
  }
);
  
  return Activite; 
};