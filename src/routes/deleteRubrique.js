const { Rubrique } = require('../db/sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.delete('/api/rubriques/:id', auth, (req, res) => {
    Rubrique.findByPk(req.params.id).then(rubrique => {
      if(rubrique === null){
        const message = 'La rubrique demandée n\'existe pas. Réessayez avec un autre identifiant.'
        return res.status(404).json({ message })
      }

      const rubriqueDeleted = rubrique
      return Rubrique.destroy({
        where: { id: rubrique.id }
      })
      .then(_ => {
        const message = `La rubrique avec l'identifiant n°${rubriqueDeleted.id} a bien été supprimée.`
        res.json({ message, data: rubriqueDeleted })
      })
    })
    .catch(error => {
      const message = `La rubrique ${ req.body.titre } n'a pas pu être supprimée. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}