const { Personnel } = require('../db/sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.get('/api/personnels/:id', auth, (req, res) => {
    Personnel.findByPk(req.params.id)
      .then(personnel => {
        if(personnel === null){
          const message = 'Le personnel demandé n\'existe pas. Réessayez avec un autre identifiant.'
          return res.status(404).json({ message })
        }
        const message = `Le personnel de nom ${personnel.nom} ${personnel.prenom} a bien éte trouvé.`
        res.json({ message, data: personnel })
      })
      .catch(error => {
        const message = `Le personnel demandé n'a pas pu être récupéré. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}