module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    annee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: { msg: "Cette année existe déjà." },
      validate: {
        isInt: { msg: "L'année doit être un nombre entier." }, 
        isFourDigits(value) {
          if (!/^\d{4}$/.test(value.toString())) {
            throw new Error("L'année doit être un nombre à 4 chiffres.");
          }
        },
        isGreaterThan2024(value) {
          if (value <= 2024) {
            throw new Error("L'année doit être supérieure à 2024.");
          }
        }
      }
    },
    cloturee: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Valeur par défaut si non spécifiée
    }
  },
  {
    timestamps: true,
    createdAt: "created",
    updatedAt: false,
  }
);

  return Session; 
};