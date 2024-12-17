const { Qualite } = require('../db/sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.get('/api/qualites/:id', auth, (req, res) => {
    Qualite.findByPk(req.params.id)
      .then(qualite => {
        if(qualite === null){
          const message = `La qualité demandée n'existe pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }
        const message = `La qualité ${qualite.titre} a bien éte trouvée.`
        res.json({ message, data: qualite })
      })
      .catch(error => {
        const message = `La qualité demandée n'a pas pu être récupérée. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}