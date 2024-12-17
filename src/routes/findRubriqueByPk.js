const { Rubrique } = require('../db/sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.get('/api/rubriques/:id', auth, (req, res) => {
    Rubrique.findByPk(req.params.id)
      .then(rubrique => {
        if(rubrique === null){
          const message = 'La rubrique demandée n\'existe pas. Réessayez avec un autre identifiant.'
          return res.status(404).json({ message })
        }
        const message = `La rubrique ${rubrique.titre} a bien éte trouvée.`
        res.json({ message, data: rubrique })
      })
      .catch(error => {
        const message = `La rubrique demandée n'a pas pu être récupérée. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}