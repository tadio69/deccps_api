const { Option } = require('../db/sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.get('/api/options/:id', auth, (req, res) => {
    Option.findByPk(req.params.id)
      .then(option => {
        if(option === null){
          const message = `L'option demandée n'existe pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }
        const message = `L'option ${option.nom} a bien éte trouvée.`
        res.json({ message, data: option })
      })
      .catch(error => {
        const message = `L'option demandée n'a pas pu être récupérée. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}