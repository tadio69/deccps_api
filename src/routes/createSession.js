const { Session } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.post('/api/sessions', auth, (req, res) => {
    Session.create(req.body)
      .then(session => {
        const message = `La session ${req.body.annee} a bien été créée.`
        res.json({ message, data: session })
      })
      .catch(error => {
        if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `La session ${ req.body.annee } n'a pas pu être ajoutée. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}