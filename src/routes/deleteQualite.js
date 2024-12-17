const { Qualite } = require('../db/sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.delete('/api/qualites/:id', auth, (req, res) => {
    Qualite.findByPk(req.params.id).then(qualite => {
      if(qualite === null){
        const message = 'La qualité demandée n\'existe pas. Réessayez avec un autre identifiant.'
        return res.status(404).json({ message })
      }

      const qualiteDeleted = qualite
      return Qualite.destroy({
        where: { id: qualite.id }
      })
      .then(_ => {
        const message = `La qualité avec l'identifiant n°${qualiteDeleted.id} a bien été supprimée.`
        res.json({ message, data: qualiteDeleted })
      })
    })
    .catch(error => {
      const message = `La qualité ${ req.body.titre } n'a pas pu être supprimée. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}