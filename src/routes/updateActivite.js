const { Activite } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.put('/api/activites/:id', auth, (req, res) => {
    const id = req.params.id
    Activite.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Activite.findByPk(id).then(activite => {
        if(activite === null){
          const message = `L'activité demandée n'existe pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }
        const message = `L'activité ${activite.titre} a bien été modifiée.` 
        res.json({ message, data: activite})
      })
    })
    .catch(error => {
      if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message = `L'activité ${ req.body.titre } n'a pas pu être modifiée. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}