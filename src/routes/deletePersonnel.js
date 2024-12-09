const { Personnel } = require('../db/sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.delete('/api/personnels/:id', auth, (req, res) => {
    Personnel.findByPk(req.params.id).then(personnel => {
      if(personnel === null){
        const message = 'Le personnel demandé n\'existe pas. Réessayez avec un autre identifiant.'
        return res.status(404).json({ message })
      }

      const personnelDeleted = personnel
      return Personnel.destroy({
        where: { id: personnel.id }
      })
      .then(_ => {
        const message = `Le personnel avec l'identifiant n°${personnelDeleted.id} a bien été supprimé.`
        res.json({ message, data: personnelDeleted })
      })
    })
    .catch(error => {
      const message = `Le personnel ${ req.body.nom } ${ req.body.prenom } n'a pas pu être supprimé. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}