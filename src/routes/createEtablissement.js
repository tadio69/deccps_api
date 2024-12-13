const { Etablissement } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.post('/api/etablissements', auth, (req, res) => {
    Etablissement.create(req.body)
      .then(etablissement => {
        const message = `L'établissement ${req.body.nom} a bien été créé.`
        res.json({ message, data: etablissement })
      })
      .catch(error => {
        if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `L'établissement ${req.body.nom} n'a pas pu être ajouté. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}