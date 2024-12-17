const { Sequelize, DataTypes } = require ('sequelize')
const RegionModel = require('../models/region')
const DepartementModel = require('../models/departement')
const EtablissementModel = require('../models/etablissement')
const FonctionModel = require('../models/fonction')
const PersonnelModel = require('../models/personnel')
const RoleModel = require('../models/role')
const UserModel = require('../models/user')
const ExamenModel = require('../models/examen')
const regions = require('./regions')
const bcrypt = require('bcrypt')
const SessionModel = require('../models/session')
const OptionModel = require('../models/option')
const RubriqueModel = require('../models/rubrique')
const QualiteModel = require('../models/qualite')
const ActiviteModel = require('../models/activite')
const ParametreModel = require('../models/parametre')

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
const Departement = DepartementModel(sequelize, DataTypes)
const Etablissement = EtablissementModel(sequelize, DataTypes)
const Fonction = FonctionModel(sequelize, DataTypes)
const Personnel = PersonnelModel(sequelize, DataTypes)
const Role = RoleModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
const Examen = ExamenModel(sequelize, DataTypes)
const Session = SessionModel(sequelize, DataTypes)
const Option = OptionModel(sequelize, DataTypes)
const Rubrique = RubriqueModel(sequelize, DataTypes)
const Qualite = QualiteModel(sequelize, DataTypes)
const Activite = ActiviteModel(sequelize, DataTypes)
const Parametre = ParametreModel(sequelize, DataTypes)

// Associer les modèles
Region.associate({ Departement });
Departement.associate({ Region, Etablissement });
Etablissement.associate({ Departement });
Personnel.associate({ Fonction, User });
Fonction.associate({ Personnel });
Role.associate({ User });
User.associate({ Role, Personnel })

/*
const initDb = async() => {
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
        roleId: role.id
      }).then (user => console.log(user.toJSON()))
    })
    

    console.log(`La base de données "deccpsdb" a bien été initialisée.`)  
  })
}
*/

const initDb = async () => {
  return sequelize.sync({ force: true }).then(() => {
    Promise.all(regions.map(region => {
      return Region.create({ nom: region.nom })
        .then(reg => console.log(reg.toJSON()))
        .catch(err => console.error("Erreur lors de la création d'une région :", err));
    }))
    .then(() => {
      return sequelize.transaction(async (t) => {
        // Créer le rôle dans la transaction
        const role = await Role.create({ titre: "admin" }, { transaction: t });
        console.log(role.toJSON());
        console.log("admin créé");

        // Hasher le mot de passe
        const hash = await bcrypt.hash('tapite69', 10);

        // Désactiver les hooks de validation pour éviter le problème
        return User.create({
          username: 'tapite',
          password: hash,
          roleId: role.id
        }, { 
          transaction: t, 
          validate: false // Désactive temporairement la validation
        });
      });
    })
    .then(user => {
      console.log(user.toJSON());
      console.log(`La base de données "deccpsdb" a bien été initialisée.`);
    })
    .catch(err => {
      console.error("Erreur lors de l'initialisation de la base de données :", err);
    });
  });
};

module.exports = {
  initDb, 
  Region, 
  Fonction, 
  Personnel, 
  Role, 
  User, 
  Departement, 
  Etablissement, 
  Examen, 
  Session, 
  Option, 
  Rubrique, 
  Qualite, 
  Activite, 
  Parametre
}