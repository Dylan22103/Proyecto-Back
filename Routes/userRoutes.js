const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/userController');

// Rutas para usuarios
router.get('/users', UserController.getAllUsers);
router.get('/users/:userId', UserController.getUserById);
router.put('/users/:userId', UserController.updateUser);
router.delete('/users/:userId', UserController.deleteUser);
router.put('/users/:userId/change-password', UserController.changePassword);

module.exports = router;