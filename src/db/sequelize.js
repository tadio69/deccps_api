const { Sequelize, DataTypes } = require ('sequelize')
const RegionModel = require('../models/region')
const regions = require('./regions')

const sequelize = new Sequelize(
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

const Region = RegionModel(sequelize, DataTypes)

const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    regions.map(region => {
      Region.create({
        nom: region.nom
      }).then(reg => console.log(reg.toJSON()));
    }) 
    console.log(`La base de données "deccpsdb" a bien été initialisée.`)  
  })
}

module.exports = {
  initDb, Region
}