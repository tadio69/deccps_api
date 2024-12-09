const { User, Personnel, Role } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const bcrypt = require('bcrypt')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.post('/api/users', auth, (req, res) => {
    const { username, password, personnelId, roleId } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {

            // Validation des clés étrangères
            const personnel = Personnel.findByPk(personnelId);
            if (personnelId && !personnel) {
                return res.status(404).json({ message: "Le personnel spécifié n'existe pas." });
            }

            const role = Role.findByPk(roleId);
            if (!role) {
                return res.status(404).json({ message: "Le rôle spécifié n'existe pas." });
            }

            User.create({
                username,
                password: hash,
                personnelId,
                roleId
            })
            .then(user => {
                const message = `L'utilisateur' ${req.body.username} a bien été créé.`
                res.json({ message, data: user })
            })
            .catch(error => {
                if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
                   return res.status(400).json({ message: error.message, data: error });
                }
                const message = `L'utilisateur' ${ req.body.username } n'a pas pu être ajouté. Réessayez dans quelques instants.`
                res.status(500).json({ message, data: error })
            })
        })
  })
}