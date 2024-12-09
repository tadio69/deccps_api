const { Sequelize, DataTypes } = require ('sequelize')
const RegionModel = require('../models/region')
const FonctionModel = require('../models/fonction')
const PersonnelModel = require('../models/personnel')
const RoleModel = require('../models/role')
const UserModel = require('../models/user')
const regions = require('./regions')
const bcrypt = require('bcrypt')

let sequelize

if(process.env.NODE_ENV === 'production'){
  sequelize = new Sequelize(
    'nom_bd_dans_heroku',
    'root_dans_heroku', 
    'mdp_dans_heroku', 
    {
      host: 'host_dans_heroku',
      dialect: 'mariadb',
      dialectOptions: {
        timezone: 'Etc/GMT-2'
      },
      logging: (msg) => console.log(msg)//true
    }
  )
}else{
  sequelize = new Sequelize(
    'deccpsdb',
    'root', 
    '', 
    {
      host: 'localhost',
      dialect: 'mariadb',
      dialectOptions: {
        timezone: 'Etc/GMT-2'
      },
      logging: true
    }
  )
}

const Region = RegionModel(sequelize, DataTypes)
const Fonction = FonctionModel(sequelize, DataTypes)
const Personnel = PersonnelModel(sequelize, DataTypes, Fonction)
const Role = RoleModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes, Role, Personnel)

const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    regions.map(region => {
      Region.create({
        nom: region.nom
      }).then(reg => console.log(reg.toJSON()));
    })

    Role.create({titre: "admin"}).then(role => console.log(role.toJSON()));
    
    bcrypt.hash('tapite69', 10)
    .then(hash => {
      User.create({
        username: 'tapite',
        password: hash,
        roleId: 1
      }).then (user => console.log(user.toJSON()))
    })
    

    console.log(`La base de données "deccpsdb" a bien été initialisée.`)  
  })
}

module.exports = {
  initDb, Region, Fonction, Personnel, Role, User,
}