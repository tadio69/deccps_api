const Role = require('./role');
const Personnel = require('./personnel');

module.exports = (sequelize, DataTypes, Role, Personnel) => {
    const User = sequelize.define('User', {
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
                notEmpty: { msg: "Le login ne saurait être une chaîne vide." },
                notNull: { msg: "Le login est requis." }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le mot de passe ne saurait être une chaîne vide." },
                notNull: { msg: "Le mot de passe est requis." }
            }
        },
        personnelId: {
            type: DataTypes.INTEGER,
            references: {
                model: Personnel,
                key: 'id'
            },
            allowNull: true // La clé étrangère est facultative
        },
        roleId: {
            type: DataTypes.INTEGER,
            references: {
                model: Role,
                key: 'id'
            },
            allowNull: false, // Un User doit avoir un rôle
            validate: {
                notEmpty: { msg: "Le rôle ne saurait être vide." },
                notNull: { msg: "Le rôle est requis." }
            }
        }
    });

    // Définir les relations après la déclaration des modèles
    User.associate = (models) => {
        // Un User peut être lié à un Personnel
        User.belongsTo(models.Personnel, {
            foreignKey: 'personnelId',
            as: 'personnel'
        });

        // Un Personnel peut avoir 0 ou 1 User
        models.Personnel.hasOne(User, {
            foreignKey: 'personnelId',
            as: 'user'
        });

        // Un User a un rôle
        User.belongsTo(models.Role, {
            foreignKey: 'roleId',
            as: 'role'
        });

        // Un Role peut avoir plusieurs Users
        models.Role.hasMany(User, {
            foreignKey: 'roleId',
            as: 'users'
        });
    };

    return User;
};