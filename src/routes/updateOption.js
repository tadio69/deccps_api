const { Option } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.put('/api/options/:id', auth, (req, res) => {
    const id = req.params.id
    Option.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Option.findByPk(id).then(option => {
        if(option === null){
          const message = `L'option demandée n'existe pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }
        const message = `L'option ${option.nom} a bien été modifiée.` 
        res.json({ message, data: option})
      })
    })
    .catch(error => {
      if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message = `L'option ${ req.body.nom } n'a pas pu être modifiée. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}