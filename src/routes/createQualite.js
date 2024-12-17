const { Qualite } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.post('/api/qualites', auth, (req, res) => {
    Qualite.create(req.body)
      .then(qualite => {
        const message = `La qualité ${req.body.titre} a bien été créée.`
        res.json({ message, data: qualite })
      })
      .catch(error => {
        if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `La qualité ${ req.body.titre } n'a pas pu être ajoutée. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}