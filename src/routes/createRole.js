const { Role } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.post('/api/roles', auth, (req, res) => {
    Role.create(req.body)
      .then(role => {
        const message = `Le rôle ${req.body.titre} a bien été créé.`
        res.json({ message, data: role })
      })
      .catch(error => {
        if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `Le rôle ${ req.body.titre } n'a pas pu être ajouté. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}