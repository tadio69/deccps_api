const { User, Personnel, Role } = require('../db/sequelize');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const auth = require('../auth/auth');
const bcrypt = require('bcrypt'); // Import bcrypt library

module.exports = (app) => {
  app.put('/api/users/:id', auth, (req, res) => {
    const id = req.params.id;
    const { username, password, personnelId, roleId } = req.body;

    bcrypt
      .hash(password, 10) // Hash the password with 10 salt rounds
      .then((hashedPassword) => {

        // Validation des clés étrangères
        const personnel = Personnel.findByPk(personnelId);
        if (personnelId && !personnel) {
            return res.status(404).json({ message: "Le personnel spécifié n'existe pas." });
        }

        const role = Role.findByPk(roleId);
        if (!role) {
            return res.status(404).json({ message: "Le rôle spécifié n'existe pas." });
        }

        return User.update(
          {
            username,
            password: hashedPassword, // Use the hashed password
            personnelId,
            roleId
          },
          {
            where: { id: id },
          }
        );
      })
      .then(([updatedRows]) => {
        if (updatedRows === 0) {
          // Aucun utilisateur ayant cet id trouvé 
          const message = `L'utilisateur demandé n'existe pas. Réessayez avec un autre identifiant.`;
          return res.status(404).json({ message });
        }

        return User.findByPk(id).then((user) => {
          if (user === null) {
            const message = `L'utilisateur demandé n'existe pas. Réessayez avec un autre identifiant.`;
            return res.status(404).json({ message });
          }

          const message = `L'utilisateur ${user.username} a bien été modifié.`;
          res.json({ message, data: user });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `L'utilisateur ${req.body.username} n'a pas pu être modifié. Réessayez dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
