const { Activite } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.post('/api/activites', auth, (req, res) => {
    Activite.create(req.body)
      .then(activite => {
        const message = `L'activité ${req.body.titre} a bien été créée.`
        res.json({ message, data: activite })
      })
      .catch(error => {
        if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `L'activité ${ req.body.titre } n'a pas pu être ajoutée. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}