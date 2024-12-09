const { Role } = require('../db/sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.get('/api/roles/:id', auth, (req, res) => {
    Role.findByPk(req.params.id)
      .then(role => {
        if(role === null){
          const message = 'Le rôle demandé n\'existe pas. Réessayez avec un autre identifiant.'
          return res.status(404).json({ message })
        }
        const message = `Le rôle de titre ${role.titre} a bien éte trouvé.`
        res.json({ message, data: role })
      })
      .catch(error => {
        const message = `Le rôle demandé n'a pas pu être récupéré. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}