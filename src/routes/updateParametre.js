const { Parametre } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.put('/api/parametres/:id', auth, (req, res) => {
    const id = req.params.id
    Parametre.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Parametre.findByPk(id).then(parametre => {
        if(parametre === null){
          const message = `Le paramètre demandé n'existe pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }
        const message = `Le paramètre ${parametre.titre} a bien été modifié.` 
        res.json({ message, data: parametre})
      })
    })
    .catch(error => {
      if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message = `Le paramètre ${ req.body.titre } n'a pas pu être modifié. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}