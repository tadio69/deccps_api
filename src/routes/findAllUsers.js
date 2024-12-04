const { User } =require('../db/sequelize')
const { Op } = require('sequelize') 
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.get('/api/users', auth, (req, res) => {
    if(req.query.username){
      const username = req.query.username

      if(username.length < 2){
        const message = `Le terme de recherche doit contenir au moins 2 caractères.`
        return res.status(400).json({ message })
      }
      return User.findAndCountAll({ 
        where: { 
          username: {// username est la propriété du modèle User
            [Op.like]: `%${username}%` //username est le critère de recherche
          } 
        }, 
        order: ['username']
      })
      .then(({count, rows}) => {
        const message = `Il y a ${count} utilisateur(s) qui correspond(ent) au terme de recherche ${username}.`
        res.json({ message, data: rows})
      })
    }else{
      User.findAndCountAll({
        order: ['username'],
      })
      .then(({count, rows}) => {
        const message = `La liste des ${count} utilisateurs a bien été récupérée.`
        res.json({ message, data: rows})
      })
      .catch(error => {
        const message = `La liste des utilisateurs n'a pas pu être récupérée. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
    }  
  })
}