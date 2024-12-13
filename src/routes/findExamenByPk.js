const { Examen } = require('../db/sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.get('/api/examens/:id', auth, (req, res) => {
    Examen.findByPk(req.params.id)
      .then(examen => {
        if(examen === null){
          const message = `L'examen demandé n'existe pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }
        const message = `L'examen ${examen.nom} a bien éte trouvé.`
        res.json({ message, data: examen })
      })
      .catch(error => {
        const message = `L'examen demandé n'a pas pu être récupéré. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}