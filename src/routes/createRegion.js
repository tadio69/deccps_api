const { Region } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.post('/api/regions', auth, (req, res) => {
    Region.create(req.body)
      .then(region => {
        const message = `La région ${req.body.nom} a bien été créée.`
        res.json({ message, data: region })
      })
      .catch(error => {
        if(error instanceof ValidationError){
          return res.status(400).json({ message: error.message, data: error})
        }
        if(error instanceof UniqueConstraintError){
          return res.status(400).json({ message: error.message, data: error})
        }
        const message = `La région ${ req.body.nom } n'a pas pu être ajoutée. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}