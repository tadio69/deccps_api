const { Session } = require('../db/sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.get('/api/sessions/:id', auth, (req, res) => {
    Session.findByPk(req.params.id)
      .then(session => {
        if(session === null){
          const message = `La session demandée n'existe pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }
        const message = `La session ${session.annee} a bien éte trouvée.`
        res.json({ message, data: session })
      })
      .catch(error => {
        const message = `La session demandée n'a pas pu être récupérée. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}