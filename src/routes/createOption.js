const { Option } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.post('/api/options', auth, (req, res) => {
    Option.create(req.body)
      .then(option => {
        const message = `L'option ${req.body.nom} a bien été créée.`
        res.json({ message, data: option })
      })
      .catch(error => {
        if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `L'option ${ req.body.nom } n'a pas pu être ajoutée. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}