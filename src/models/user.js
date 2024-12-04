module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: { msg: "Ce login existe déjà." },
            validate: {
                notEmpty: { msg: "Le login ne saurait être une chaîne vide."},
                notNull: { msg: "Le login est réquis."          }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le mot de passe ne saurait être une chaîne vide."},
                notNull: { msg: "Le mot de passe est réquis."          }
            }
        }
    })
}