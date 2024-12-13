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
require('./src/routes/findAllRegions')(app)
require('./src/routes/findRegionByPk')(app)
require('./src/routes/createRegion')(app)
require('./src/routes/updateRegion')(app)
require('./src/routes/deleteRegion')(app)

require('./src/routes/login')(app)

require('./src/routes/createUser')(app)
require('./src/routes/findAllUsers')(app)
require('./src/routes/deleteUser')(app)
require('./src/routes/findUserByPk')(app)
require('./src/routes/updateUser')(app)

require('./src/routes/createFonction')(app)
require('./src/routes/findAllFonctions')(app)
require('./src/routes/deleteFonction')(app)
require('./src/routes/findFonctionByPk')(app)
require('./src/routes/updateFonction')(app)

require('./src/routes/createRole')(app)
require('./src/routes/findAllRoles')(app)
require('./src/routes/deleteRole')(app)
require('./src/routes/findRoleByPk')(app)
require('./src/routes/updateRole')(app)

require('./src/routes/createPersonnel')(app)
require('./src/routes/findAllPersonnels')(app)
require('./src/routes/deletePersonnel')(app)
require('./src/routes/findPersonnelByPk')(app)
require('./src/routes/updatePersonnel')(app)

require('./src/routes/createDepartement')(app)
require('./src/routes/findAllDepartements')(app)
require('./src/routes/deleteDepartement')(app)
require('./src/routes/findDepartementByPk')(app)
require('./src/routes/updateDepartement')(app)

require('./src/routes/createEtablissement')(app)
require('./src/routes/findAllEtablissements')(app)
require('./src/routes/deleteEtablissement')(app)
require('./src/routes/findEtablissementByPk')(app)
require('./src/routes/updateEtablissement')(app)

require('./src/routes/createExamen')(app)
require('./src/routes/findAllExamens')(app)
require('./src/routes/deleteExamen')(app)
require('./src/routes/findExamenByPk')(app)
require('./src/routes/updateExamen')(app)


//gestion des erreurs 404
app.use(({ res }) => {
  const message = "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL."
  res.status(404).json({ message })
})

app.listen(port, () =>
  console.log(`Notre application Nodejs est démarrée sur http://localhost:${port}`
  )
);
