const { User } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const bcrypt = require('bcrypt')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.post('/api/users', auth, (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.create({
                username: req.body.username,
                password: hash
            })
            .then(user => {
                const message = `L'utilisateur' ${req.body.username} a bien été créé.`
                res.json({ message, data: user })
            })
            .catch(error => {
                if(error instanceof ValidationError){
                return res.status(400).json({ message: error.message, data: error})
                }
                if(error instanceof UniqueConstraintError){
                return res.status(400).json({ message: error.message, data: error})
                }
                const message = `L'utilisateur' ${ req.body.username } n'a pas pu être ajouté. Réessayez dans quelques instants.`
                res.status(500).json({ message, data: error })
            })
        })
  })
}