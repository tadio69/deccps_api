const { Fonction } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.put('/api/fonctions/:id', auth, (req, res) => {
    const id = req.params.id
    Fonction.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Fonction.findByPk(id).then(fonction => {
        if(fonction === null){
          const message = `La fonction demandée n'existe pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }
        const message = `La fonction ${fonction.nom} a bien été modifiée.` 
        res.json({ message, data: fonction})
      })
    })
    .catch(error => {
      if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message = `La fonction ${ req.body.nom } n'a pas pu être modifiée. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}