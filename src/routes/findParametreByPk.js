const { Parametre } = require('../db/sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.get('/api/parametres/:id', auth, (req, res) => {
    Parametre.findByPk(req.params.id)
      .then(parametre => {
        if(parametre === null){
          const message = `Le paramètre demandé n'existe pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }
        const message = `Le paramètre ${parametre.titre} a bien éte trouvé.`
        res.json({ message, data: parametre })
      })
      .catch(error => {
        const message = `Le paramètre demandé n'a pas pu être récupéré. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}