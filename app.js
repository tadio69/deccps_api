const express = require("express");
const morgan = require("morgan")
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express();

const port = 3000;

app
  .use(morgan('dev'))
  .use(bodyParser.json())

sequelize.initDb()

// Points de terminaisons
require('./src/routes/findAllRegions')(app)
require('./src/routes/findRegionByPk')(app)
require('./src/routes/createRegion')(app)
require('./src/routes/updateRegion')(app)
require('./src/routes/deleteRegion')(app)

//gestion des erreurs 404
app.use(({ res }) => {
  const message = "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL."
  res.status(404).json({ message })
})

app.listen(port, () =>
  console.log(`Notre application Nodejs est démarrée sur http://localhost:${port}`
  )
);
