const { Region } = require('../db/sequelize')

module.exports = (app) => {
  app.delete('/api/regions/:id', (req, res) => {
    Region.findByPk(req.params.id).then(region => {
      if(region === null){
        const message = 'La région demandée n\'existe pas. Réessayez avec un autre identifiant.'
        return res.status(404).json({ message })
      }

      const regionDeleted = region
      return Region.destroy({
        where: { id: region.id }
      })
      .then(_ => {
        const message = `La région avec l'identifiant n°${regionDeleted.id} a bien été supprimée.`
        res.json({ message, data: regionDeleted })
      })
    })
    .catch(error => {
      const message = `La région ${ req.body.nom } n'a pas pu être supprimée. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}