const { Role } = require('../db/sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.delete('/api/roles/:id', auth, (req, res) => {
    Role.findByPk(req.params.id).then(role => {
      if(role === null){
        const message = 'Le rôle demandé n\'existe pas. Réessayez avec un autre identifiant.'
        return res.status(404).json({ message })
      }

      const roleDeleted = role
      return Role.destroy({
        where: { id: role.id }
      })
      .then(_ => {
        const message = `Le rôle avec l'identifiant n°${roleDeleted.id} a bien été supprimé.`
        res.json({ message, data: roleDeleted })
      })
    })
    .catch(error => {
      const message = `Le rôle ${ req.body.titre } n'a pas pu être supprimé. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}