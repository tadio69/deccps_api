const { Etablissement } = require('../db/sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.delete('/api/etablissements/:id', auth, (req, res) => {
    Etablissement.findByPk(req.params.id).then(etablissement => {
      if(etablissement === null){
        const message = `L'établissement demandé n'existe pas. Réessayez avec un autre identifiant.`
        return res.status(404).json({ message })
      }

      const etablissementDeleted = etablissement
      return Etablissement.destroy({
        where: { id: etablissement.id }
      })
      .then(_ => {
        const message = `L'établissement avec l'identifiant n°${etablissementDeleted.id} a bien été supprimé.`
        res.json({ message, data: etablissementDeleted })
      })
    })
    .catch(error => {
      const message = `L'établissement ${ req.body.nom } n'a pas pu être supprimé. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}