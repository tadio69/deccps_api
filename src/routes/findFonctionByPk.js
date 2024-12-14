const { Fonction } = require('../db/sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.get('/api/fonctions/:id', auth, (req, res) => {
    Fonction.findByPk(req.params.id)
      .then(fonction => {
        if(fonction === null){
          const message = `La fonction demandée n'existe pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }
        const message = `La fonction ${fonction.nom} a bien éte trouvée.`
        res.json({ message, data: fonction })
      })
      .catch(error => {
        const message = `La fonction demandée n'a pas pu être récupérée. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}