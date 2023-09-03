const User = require('../Models/user');
const bcrypt = require('bcrypt');

const UserController = {
  
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({}, '-__v');
      console.log('Usuarios obtenidos de la base de datos:', users);
      res.json(users);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      res.status(500).send('Error al obtener los usuarios');
    }
  },

  getUserById: async (req, res) => {
    const userId = req.params.userId;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      res.status(500).send('Error al obtener el usuario');
    }
  },

  updateUser: async (req, res) => {
    const userId = req.params.userId;
    const newData = req.body;

    try {
      const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json(updatedUser);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      res.status(500).send('Error al actualizar el usuario');
    }
  },

  deleteUser: async (req, res) => {
    const userId = req.params.userId;

    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      res.status(500).send('Error al eliminar el usuario');
    }
  },

  changePassword: async (req, res) => {
    const userId = req.params.userId;
    const { oldPassword, newPassword } = req.body;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const isPasswordValid = await bcrypt.compare(oldPassword, user.contrasena);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      const saltRounds = 10;
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
      user.contrasena = hashedNewPassword;
      await user.save();

      res.json({ message: 'Contraseña cambiada exitosamente' });
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      res.status(500).send('Error al cambiar la contraseña');
    }
  }
};

module.exports = UserController;