const { Activite } = require('../db/sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.delete('/api/activites/:id', auth, (req, res) => {
    Activite.findByPk(req.params.id).then(activite => {
      if(activite === null){
        const message = `L'activite demandée n'existe pas. Réessayez avec un autre identifiant.`
        return res.status(404).json({ message })
      }

      const activiteDeleted = activite
      return Activite.destroy({
        where: { id: activite.id }
      })
      .then(_ => {
        const message = `L'activite avec l'identifiant n°${activiteDeleted.id} a bien été supprimée.`
        res.json({ message, data: activiteDeleted })
      })
    })
    .catch(error => {
      const message = `L'activite ${ req.body.titre } n'a pas pu être supprimée. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}