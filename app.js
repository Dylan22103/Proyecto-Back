const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3001;

// Importar modelos y rutas
const User = require('./Models/user');
const userRoutes = require('./Routes/userRoutes');

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Conexión a la base de datos
mongoose.connect('mongodb+srv://dylan:camilo2213@cluster0.rpzaflx.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Conexión a la base de datos exitosa');
})
.catch(error => {
  console.error('Error al conectar a la base de datos:', error);
});

// Ruta para el endpoint GET de bienvenida
app.get('/', (req, res) => {
  res.send('Bienvenido a la API');
});

// Rutas de usuarios
app.use('/', userRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});