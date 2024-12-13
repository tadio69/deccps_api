const { Departement } = require('../db/sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.get('/api/departements/:id', auth, (req, res) => {
    Departement.findByPk(req.params.id)
      .then(departement => {
        if(departement === null){
          const message = 'Le département demandé n\'existe pas. Réessayez avec un autre identifiant.'
          return res.status(404).json({ message })
        }
        const message = `Le département ${departement.nom} a bien éte trouvé.`
        res.json({ message, data: departement })
      })
      .catch(error => {
        const message = `Le département demandé n'a pas pu être récupéré. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}