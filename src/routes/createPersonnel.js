const { Personnel, Fonction } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.post('/api/personnels', auth, (req, res) => {
    const { fonctionId, ...otherFields } = req.body; // Destructure fonctionId
    // Validation de la clé étrangère
    const fonction = Fonction.findByPk(fonctionId);
    if (!fonction) {
      return res.status(404).json({ message: "La fonction spécifiée n'existe pas." });
    }

    Personnel.create(req.body)
      .then(personnel => {
        const message = `Le personnel ${req.body.nom} ${req.body.prenom} a bien été créé.`
        res.json({ message, data: personnel })
      })
      .catch(error => {
        if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `Le personnel ${req.body.nom} ${req.body.prenom} n'a pas pu être ajouté. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}