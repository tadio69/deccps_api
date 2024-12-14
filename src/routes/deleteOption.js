const { Option } = require('../db/sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.delete('/api/options/:id', auth, (req, res) => {
    Option.findByPk(req.params.id).then(option => {
      if(option === null){
        const message = `L'option demandée n'existe pas. Réessayez avec un autre identifiant.`
        return res.status(404).json({ message })
      }

      const optionDeleted = option
      return Option.destroy({
        where: { id: option.id }
      })
      .then(_ => {
        const message = `L'option avec l'identifiant n°${optionDeleted.id} a bien été supprimée.`
        res.json({ message, data: optionDeleted })
      })
    })
    .catch(error => {
      const message = `L'option ${ req.body.nom } n'a pas pu être supprimée. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}