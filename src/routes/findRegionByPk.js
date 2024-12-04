const { Region } = require('../db/sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.get('/api/regions/:id', auth, (req, res) => {
    Region.findByPk(req.params.id)
      .then(region => {
        if(region === null){
          const message = 'La région demandée n\'existe pas. Réessayez avec un autre identifiant.'
          return res.status(404).json({ message })
        }
        const message = `La région de nom ${region.nom} a bien éte trouvée.`
        res.json({ message, data: region })
      })
      .catch(error => {
        const message = `La région demandée n'a pas pu être récupérée. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}