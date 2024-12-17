const { Activite } =require('../db/sequelize')
const { Op } = require('sequelize') 
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.get('/api/activites', auth, (req, res) => {
    if(req.query.titre){
      const titre = req.query.titre

      if(titre.length < 2){
        const message = `Le terme de recherche doit contenir au moins 2 caractères.`
        return res.status(400).json({ message })
      }
      return Activite.findAndCountAll({ 
        where: { 
          titre: {// titre est la propriété du modèle Activite
            [Op.like]: `%${titre}%` //titre est le critère de recherche
          } 
        }, 
        order: ['titre']
      })
      .then(({count, rows}) => {
        const message = `Il y a ${count} activité(s) qui correspond(ent) au terme de recherche ${titre}.`
        res.json({ message, data: rows})
      })
    }else{
      Activite.findAndCountAll({
        order: ['titre'],
      })
      .then(({count, rows}) => {
        const message = `La liste des ${count} activités a bien été récupérée.`
        res.json({ message, data: rows})
      })
      .catch(error => {
        const message = `La liste des activités n'a pas pu être récupérée. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
    }  
  })
}