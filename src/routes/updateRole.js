const { Role } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.put('/api/roles/:id', auth, (req, res) => {
    const id = req.params.id
    Role.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Role.findByPk(id).then(role => {
        if(role === null){
          const message = 'Le rôle demandé n\'existe pas. Réessayez avec un autre identifiant.'
          return res.status(404).json({ message })
        }
        const message = `Le rôle ${role.titre} a bien été modifié.` 
        res.json({ message, data: role})
      })
    })
    .catch(error => {
      if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message = `Le rôle ${ req.body.titre } n'a pas pu être modifié. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}