const Role = require('./role');
const Personnel = require('./personnel');

module.exports = (sequelize, DataTypes) => {
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
                model: "Personnels", // Nom de la table associée
                key: 'id'
            },
            allowNull: true, // La clé étrangère est facultative
            validate: {
                notEmpty: { msg: "Le personnel ne saurait être vide." },
                isExistingPersonnel: async function(value) {
                    if (value === null || value === undefined) {
                        return; // Pas besoin de valider si la valeur est null ou undefined
                    }
                    const personnel = await Personnel.findOne({ where: { id: value } });
                    if (!personnel) {
                      throw new Error(`Le personnel avec l'ID ${value} n'existe pas.`);
                    }
                  }
            }
        },
        roleId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Roles", // Nom de la table associée
                key: 'id'
            },
            allowNull: false, // Un User doit avoir un rôle
            validate: {
                notEmpty: { msg: "Le rôle ne saurait être vide." },
                notNull: { msg: "Le rôle est requis." },
                // isExistingRole: async function(value) {
                //     const role = await Role.findOne({ where: { id: value } });
                //     if (!role) {
                //       throw new Error(`Le rôle avec l'ID ${value} n'existe pas.`);
                //     }
                // }
                isExistingRole: async function(value) {
                const user = this; // Access the current User instance
                if (value === null || value === undefined) {
                  return; // No need to validate if null or undefined
                }
                const role = await user.role; // Access associated role through 'role'
                if (!role) {
                  throw new Error(`Le rôle avec l'ID ${value} n'existe pas.`);
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

    // Définir les relations après la déclaration des modèles
    User.associate = (models) => {
        // Un User peut être lié à un Personnel
        User.belongsTo(models.Personnel, {
            foreignKey: 'personnelId',
            as: 'personnel'
        });

        // Un User a un rôle
        User.belongsTo(models.Role, {
            foreignKey: 'roleId',
            as: 'role'
        });
    };

    return User;
};