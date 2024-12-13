const { Examen } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.post('/api/examens', auth, (req, res) => {
    Examen.create(req.body)
      .then(examen => {
        const message = `L'examen ${req.body.nom} a bien été créé.`
        res.json({ message, data: examen })
      })
      .catch(error => {
        if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `L'examen ${req.body.nom} n'a pas pu être ajouté. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}