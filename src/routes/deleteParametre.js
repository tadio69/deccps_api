const { Parametre } = require('../db/sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.delete('/api/parametres/:id', auth, (req, res) => {
    Parametre.findByPk(req.params.id).then(parametre => {
      if(parametre === null){
        const message = `Le paramètre demandé n'existe pas. Réessayez avec un autre identifiant.`
        return res.status(404).json({ message })
      }

      const parametreDeleted = parametre
      return Parametre.destroy({
        where: { id: parametre.id }
      })
      .then(_ => {
        const message = `Le paramètre avec l'identifiant n°${parametreDeleted.id} a bien été supprimé.`
        res.json({ message, data: parametreDeleted })
      })
    })
    .catch(error => {
      const message = `Le paramètre ${ req.body.titre } n'a pas pu être supprimé. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}