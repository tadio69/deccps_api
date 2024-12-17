const { Qualite } =require('../db/sequelize')
const { Op } = require('sequelize') 
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.get('/api/qualites', auth, (req, res) => {
    if(req.query.titre){
      const titre = req.query.titre

      if(titre.length < 2){
        const message = `Le terme de recherche doit contenir au moins 2 caractères.`
        return res.status(400).json({ message })
      }
      return Qualite.findAndCountAll({ 
        where: { 
          titre: {// titre est la propriété du modèle Qualite
            [Op.like]: `%${titre}%` //titre est le critère de recherche
          } 
        }, 
        order: ['titre']
      })
      .then(({count, rows}) => {
        const message = `Il y a ${count} Qualité(s) qui correspond(ent) au terme de recherche ${titre}.`
        res.json({ message, data: rows})
      })
    }else{
      Qualite.findAndCountAll({
        order: ['titre'],
      })
      .then(({count, rows}) => {
        const message = `La liste des ${count} Qualités a bien été récupérée.`
        res.json({ message, data: rows})
      })
      .catch(error => {
        const message = `La liste des Qualités n'a pas pu être récupérée. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
    }  
  })
}