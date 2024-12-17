const { Qualite } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.put('/api/qualites/:id', auth, (req, res) => {
    const id = req.params.id
    Qualite.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Qualite.findByPk(id).then(qualite => {
        if(qualite === null){
          const message = `La qualité demandée n'existe pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }
        const message = `La qualité ${qualite.titre} a bien été modifiée.` 
        res.json({ message, data: qualite})
      })
    })
    .catch(error => {
      if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message = `La qualité ${ req.body.titre } n'a pas pu être modifiée. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}