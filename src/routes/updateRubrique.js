const { Rubrique } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.put('/api/rubriques/:id', auth, (req, res) => {
    const id = req.params.id
    Rubrique.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Rubrique.findByPk(id).then(rubrique => {
        if(rubrique === null){
          const message = 'La rubrique demandée n\'existe pas. Réessayez avec un autre identifiant.'
          return res.status(404).json({ message })
        }
        const message = `La rubrique ${rubrique.titre} a bien été modifiée.` 
        res.json({ message, data: rubrique})
      })
    })
    .catch(error => {
      if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message = `La rubrique ${ req.body.titre } n'a pas pu être modifiée. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}