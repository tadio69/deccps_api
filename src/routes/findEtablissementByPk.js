const { Etablissement } = require('../db/sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.get('/api/etablissements/:id', auth, (req, res) => {
    Etablissement.findByPk(req.params.id)
      .then(etablissement => {
        if(etablissement === null){
          const message = `L'établissement demandé n'existe pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }
        const message = `L'établissement ${etablissement.nom} a bien éte trouvé.`
        res.json({ message, data: etablissement })
      })
      .catch(error => {
        const message = `L'établissement demandé n'a pas pu être récupéré. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}