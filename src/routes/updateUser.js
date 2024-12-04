const { User } = require('../db/sequelize');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const auth = require('../auth/auth');
const bcrypt = require('bcrypt'); // Import bcrypt library

module.exports = (app) => {
  app.put('/api/users/:id', auth, async (req, res) => {
    const id = req.params.id;
    const { password, ...otherFields } = req.body; // Destructure password

    // Hash the password before update
    try {
      const saltRounds = 10; // Adjust saltRounds as needed
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Update user with hashed password and other fields
      const updatedUser = await User.update({
        ...otherFields,
        password: hashedPassword
      }, {
        where: { id: id }
      });

      if (updatedUser[0] === 0) {
        const message = `L'utilisateur demandé n\'existe pas. Réessayez avec un autre identifiant.`;
        return res.status(404).json({ message });
      }

      const user = await User.findByPk(id);
      const message = `L'utilisateur ${user.username} a bien été modifié.`;
      res.json({ message, data: user });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      if (error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message = `L'utilisateur ${req.body.nom} n'a pas pu être modifiée. Réessayez dans quelques instants.`;
      res.status(500).json({ message, data: error });
    }
  });
};