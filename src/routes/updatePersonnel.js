const { Personnel, Fonction } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.put('/api/personnels/:id', auth, (req, res) => {
    const id = req.params.id
    const { fonctionId, ...otherFields } = req.body; // Destructure fonctionId
    
    // Validation de la clé étrangère
    const fonction = Fonction.findByPk(fonctionId);
    if (!fonction) {
      return res.status(404).json({ message: "La fonction spécifiée n'existe pas." });
    }

    Personnel.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Personnel.findByPk(id).then(personnel => {
        if(personnel === null){
          const message = 'Le personnel demandé n\'existe pas. Réessayez avec un autre identifiant.'
          return res.status(404).json({ message })
        }
        const message = `Le personnel de nom  ${personnel.nom} ${personnel.prenom} a bien été modifié.` 
        res.json({ message, data: region})
      })
    })
    .catch(error => {
      if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message = `Le personnel de nom ${ req.body.nom } ${ req.body.prenom } n'a pas pu être modifié. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}