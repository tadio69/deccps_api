const { Parametre } =require('../db/sequelize')
const { Op } = require('sequelize') 
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.get('/api/parametres', auth, (req, res) => {
    if(req.query.titre){
      const titre = req.query.titre

      if(titre.length < 2){
        const message = `Le terme de recherche doit contenir au moins 2 caractères.`
        return res.status(400).json({ message })
      }
      return Parametre.findAndCountAll({ 
        where: { 
          titre: {// titre est la propriété du modèle Parametre
            [Op.like]: `%${titre}%` //nom est le critère de recherche
          } 
        }, 
        order: ['titre']
      })
      .then(({count, rows}) => {
        const message = `Il y a ${count} paramètre(s) qui correspond(ent) au terme de recherche ${titre}.`
        res.json({ message, data: rows})
      })
    }else{
      Parametre.findAndCountAll({
        order: ['titre'],
      })
      .then(({count, rows}) => {
        const message = `La liste des ${count} paramètres a bien été récupérée.`
        res.json({ message, data: rows})
      })
      .catch(error => {
        const message = `La liste des paramètres n'a pas pu être récupérée. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
    }  
  })
}