const { Departement } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.post('/api/departements', auth, (req, res) => {
    Departement.create(req.body)
      .then(departement => {
        const message = `Le département ${req.body.nom} a bien été créé.`
        res.json({ message, data: departement })
      })
      .catch(error => {
        if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `Le département ${req.body.nom} n'a pas pu être ajouté. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}