const { Etablissement } =require('../db/sequelize')
const { Op } = require('sequelize') 
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.get('/api/etablissements', auth, (req, res) => {
    if(req.query.nom){
      const nom = req.query.nom

      if(nom.length < 2){
        const message = `Le terme de recherche doit contenir au moins 2 caractères.`
        return res.status(400).json({ message })
      }
      return Etablissement.findAndCountAll({ 
        where: { 
          nom: {// nom est la propriété du modèle Etablissement
            [Op.like]: `%${nom}%` //nom est le critère de recherche
          } 
        }, 
        order: ['nom']
      })
      .then(({count, rows}) => {
        const message = `Il y a ${count} établissement(s) qui correspond(ent) au terme de recherche ${nom}.`
        res.json({ message, data: rows})
      })
    }else{
      Etablissement.findAndCountAll({
        order: ['nom'],
      })
      .then(({count, rows}) => {
        const message = `La liste des ${count} établissements a bien été récupérée.`
        res.json({ message, data: rows})
      })
      .catch(error => {
        const message = `La liste des établissements n'a pas pu être récupérée. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
    }  
  })
}