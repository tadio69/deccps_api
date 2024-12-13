const { Departement } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.put('/api/departements/:id', auth, (req, res) => {
    const id = req.params.id
    Departement.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Departement.findByPk(id).then(departement => {
        if(departement === null){
          const message = 'Le département demandé n\'existe pas. Réessayez avec un autre identifiant.'
          return res.status(404).json({ message })
        }
        const message = `Le département de nom  ${departement.nom} a bien été modifié.` 
        res.json({ message, data: departement})
      })
    })
    .catch(error => {
      if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message = `Le département ${ req.body.nom } n'a pas pu être modifié. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}