const { Examen } = require('../db/sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.delete('/api/examens/:id', auth, (req, res) => {
    Examen.findByPk(req.params.id).then(examen => {
      if(examen === null){
        const message = `L'examen demandé n\'existe pas. Réessayez avec un autre identifiant.`
        return res.status(404).json({ message })
      }

      const examenDeleted = examen
      return Examen.destroy({
        where: { id: examen.id }
      })
      .then(_ => {
        const message = `L'examen avec l'identifiant n°${examenDeleted.id} a bien été supprimé.`
        res.json({ message, data: examenDeleted })
      })
    })
    .catch(error => {
      const message = `L'examen ${ req.body.nom } n'a pas pu être supprimé. Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}