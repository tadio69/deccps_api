const { Examen } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.put('/api/examens/:id', auth, (req, res) => {
    const id = req.params.id
    Examen.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Examen.findByPk(id).then(examen => {
        if(examen === null){
          const message = `L'examen demandé n'existe pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }
        const message = `L'examen ${examen.nom} a bien été modifié.` 
        res.json({ message, data: examen})
      })
    })
    .catch(error => {
      if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message = `L'examen ${ req.body.nom } n'a pas pu être modifié. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}