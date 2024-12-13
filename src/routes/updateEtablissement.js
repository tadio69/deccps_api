const { Etablissement } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.put('/api/etablissements/:id', auth, (req, res) => {
    const id = req.params.id
    Etablissement.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Etablissement.findByPk(id).then(etablissement => {
        if(etablissement === null){
          const message = `L'établissement demandé n'existe pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }
        const message = `L'établissement ${etablissement.nom} a bien été modifié.` 
        res.json({ message, data: etablissement})
      })
    })
    .catch(error => {
      if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message = `L'établissement ${ req.body.nom } n'a pas pu être modifié. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}