const { Personnel } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.post('/api/personnels', auth, (req, res) => {
    Personnel.create(req.body)
      .then(personnel => {
        const message = `Le personnel ${req.body.nom} ${req.body.prenom} a bien été créé.`
        res.json({ message, data: personnel })
      })
      .catch(error => {
        if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `Le personnel ${req.body.nom} ${req.body.prenom} n'a pas pu être ajouté. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}