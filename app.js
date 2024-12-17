const express = require("express");
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json())

sequelize.initDb()

app.get('/', (req, res) => {
  res.json('Hey, bienvenue sur deccPaySystem !')
})

// Points de terminaisons
//Region
require('./src/routes/findAllRegions')(app)
require('./src/routes/findRegionByPk')(app)
require('./src/routes/createRegion')(app)
require('./src/routes/updateRegion')(app)
require('./src/routes/deleteRegion')(app)

require('./src/routes/login')(app)

//User
require('./src/routes/createUser')(app)
require('./src/routes/findAllUsers')(app)
require('./src/routes/deleteUser')(app)
require('./src/routes/findUserByPk')(app)
require('./src/routes/updateUser')(app)

//Fonction
require('./src/routes/createFonction')(app)
require('./src/routes/findAllFonctions')(app)
require('./src/routes/deleteFonction')(app)
require('./src/routes/findFonctionByPk')(app)
require('./src/routes/updateFonction')(app)

//Role
require('./src/routes/createRole')(app)
require('./src/routes/findAllRoles')(app)
require('./src/routes/deleteRole')(app)
require('./src/routes/findRoleByPk')(app)
require('./src/routes/updateRole')(app)

//Personnel
require('./src/routes/createPersonnel')(app)
require('./src/routes/findAllPersonnels')(app)
require('./src/routes/deletePersonnel')(app)
require('./src/routes/findPersonnelByPk')(app)
require('./src/routes/updatePersonnel')(app)

//Departement
require('./src/routes/createDepartement')(app)
require('./src/routes/findAllDepartements')(app)
require('./src/routes/deleteDepartement')(app)
require('./src/routes/findDepartementByPk')(app)
require('./src/routes/updateDepartement')(app)

//Etablissement
require('./src/routes/createEtablissement')(app)
require('./src/routes/findAllEtablissements')(app)
require('./src/routes/deleteEtablissement')(app)
require('./src/routes/findEtablissementByPk')(app)
require('./src/routes/updateEtablissement')(app)

//Examen
require('./src/routes/createExamen')(app)
require('./src/routes/findAllExamens')(app)
require('./src/routes/deleteExamen')(app)
require('./src/routes/findExamenByPk')(app)
require('./src/routes/updateExamen')(app)

//Session
require('./src/routes/createSession')(app)
require('./src/routes/deleteSession')(app)
require('./src/routes/findSessionByPk')(app)
require('./src/routes/updateSession')(app)

//Option
require('./src/routes/createOption')(app)
require('./src/routes/findAllOptions')(app)
require('./src/routes/deleteOption')(app)
require('./src/routes/findOptionByPk')(app)
require('./src/routes/updateOption')(app)

//Activite
require('./src/routes/createActivite')(app)
require('./src/routes/findAllActivites')(app)
require('./src/routes/deleteActivite')(app)
require('./src/routes/findActiviteByPk')(app)
require('./src/routes/updateActivite')(app)

//Rubrique
require('./src/routes/createRubrique')(app)
require('./src/routes/findAllRubriques')(app)
require('./src/routes/deleteRubrique')(app)
require('./src/routes/findRubriqueByPk')(app)
require('./src/routes/updateRubrique')(app)

//Qualite
require('./src/routes/createQualite')(app)
require('./src/routes/findAllQualites')(app)
require('./src/routes/deleteQualite')(app)
require('./src/routes/findQualiteByPk')(app)
require('./src/routes/updateQualite')(app)

//Parametre
require('./src/routes/createParametre')(app)
require('./src/routes/findAllParametres')(app)
require('./src/routes/deleteParametre')(app)
require('./src/routes/findParametreByPk')(app)
require('./src/routes/updateParametre')(app)

//gestion des erreurs 404
app.use(({ res }) => {
  const message = "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL."
  res.status(404).json({ message })
})

app.listen(port, () =>
  console.log(`Notre application Nodejs est démarrée sur http://localhost:${port}`
  )
);
