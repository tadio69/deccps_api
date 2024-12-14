const { Session } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.put('/api/sessions/:id', auth, (req, res) => {
    const id = req.params.id
    Session.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Session.findByPk(id).then(session => {
        if(session === null){
          const message = `La session demandée n'existe pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }
        const message = `La session ${session.annee} a bien été modifiée.` 
        res.json({ message, data: session})
      })
    })
    .catch(error => {
      if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message = `La session ${ req.body.annee } n'a pas pu être modifiée. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}