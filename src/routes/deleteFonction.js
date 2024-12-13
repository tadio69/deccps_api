const { Fonction } = require('../db/sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.delete('/api/fonctions/:id', auth, (req, res) => {
    Fonction.findByPk(req.params.id).then(fonction => {
      if(fonction === null){
        const message = `La fonction demandée n\'existe pas. Réessayez avec un autre identifiant.`
        return res.status(404).json({ message })
      }

      const fonctionDeleted = fonction
      return Fonction.destroy({
        where: { id: fonction.id }
      })
      .then(_ => {
        const message = `La fonction avec l'identifiant n°${fonctionDeleted.id} a bien été supprimée.`
        res.json({ message, data: fonctionDeleted })
      })
    })
    .catch(error => {
      const message = `La fonction ${ req.body.nom } n'a pas pu être supprimée. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}