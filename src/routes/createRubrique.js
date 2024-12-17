const { Rubrique } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.post('/api/rubriques', auth, (req, res) => {
    Rubrique.create(req.body)
      .then(rubrique => {
        const message = `La rubrique ${req.body.titre} a bien été créée.`
        res.json({ message, data: rubrique })
      })
      .catch(error => {
        if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `La rubrique ${ req.body.titre } n'a pas pu être ajoutée. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}