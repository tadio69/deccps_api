const { Activite } = require('../db/sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.get('/api/activites/:id', auth, (req, res) => {
    Activite.findByPk(req.params.id)
      .then(activite => {
        if(activite === null){
          const message = `L'activité demandée n'existe pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }
        const message = `L'activité ${activite.titre} a bien éte trouvée.`
        res.json({ message, data: activite })
      })
      .catch(error => {
        const message = `L'activité demandée n'a pas pu être récupérée. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}