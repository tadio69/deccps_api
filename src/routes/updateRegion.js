const { Region } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.put('/api/regions/:id', auth, (req, res) => {
    const id = req.params.id
    Region.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Region.findByPk(id).then(region => {
        if(region === null){
          const message = 'La région demandée n\'existe pas. Réessayez avec un autre identifiant.'
          return res.status(404).json({ message })
        }
        const message = `La région ${region.nom} a bien été modifiée.` 
        res.json({ message, data: region})
      })
    })
    .catch(error => {
      if(error instanceof ValidationError){
        return res.status(400).json({ message: error.message, data: error})
      }
      if(error instanceof UniqueConstraintError){
        return res.status(400).json({ message: error.message, data: error})
      }
      const message = `La région ${ req.body.nom } n'a pas pu être modifiée. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}