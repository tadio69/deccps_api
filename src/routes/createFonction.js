const { Fonction } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.post('/api/fonctions', auth, (req, res) => {
    Fonction.create(req.body)
      .then(fonction => {
        const message = `La fonction ${req.body.nom} a bien été créée.`
        res.json({ message, data: fonction })
      })
      .catch(error => {
        if(error instanceof ValidationError){
          return res.status(400).json({ message: error.message, data: error})
        }
        if(error instanceof UniqueConstraintError){
          return res.status(400).json({ message: error.message, data: error})
        }
        const message = `La fonction ${ req.body.nom } n'a pas pu être ajoutée. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}