const { Departement } = require('../db/sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.delete('/api/departements/:id', auth, (req, res) => {
    Departement.findByPk(req.params.id).then(departement => {
      if(departement === null){
        const message = 'Le département demandé n\'existe pas. Réessayez avec un autre identifiant.'
        return res.status(404).json({ message })
      }

      const departementDeleted = departement
      return Departement.destroy({
        where: { id: departement.id }
      })
      .then(_ => {
        const message = `Le département avec l'identifiant n°${departementDeleted.id} a bien été supprimé.`
        res.json({ message, data: departementDeleted })
      })
    })
    .catch(error => {
      const message = `Le département ${ req.body.nom } n'a pas pu être supprimé. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}