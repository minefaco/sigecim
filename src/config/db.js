const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        // Usamos la URI que definimos en el archivo .env, si la cambio del archivo env esto sigue funcionando.
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conexión a MongoDB exitosa');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1); // Detiene la app si la base de datos falla
    }
};

module.exports = conectarDB;