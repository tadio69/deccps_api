const { Session } = require('../db/sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.delete('/api/sessions/:id', auth, (req, res) => {
    Session.findByPk(req.params.id).then(session => {
      if(session === null){
        const message = `La session demandée n'existe pas. Réessayez avec un autre identifiant.`
        return res.status(404).json({ message })
      }

      const sessionDeleted = session
      return Session.destroy({
        where: { id: session.id }
      })
      .then(_ => {
        const message = `La session avec l'identifiant n°${sessionDeleted.id} a bien été supprimée.`
        res.json({ message, data: sessionDeleted })
      })
    })
    .catch(error => {
      const message = `La session ${ req.body.annee } n'a pas pu être supprimée. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}