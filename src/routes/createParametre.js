const { Parametre } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.post('/api/parametres', auth, (req, res) => {
    Parametre.create(req.body)
      .then(parametre => {
        const message = `Le paramètre ${req.body.titre} a bien été créé.`
        res.json({ message, data: parametre })
      })
      .catch(error => {
        if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `Le paramètre ${req.body.titre} n'a pas pu être ajouté. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}