import pg from 'pg';
import dotenv from 'dotenv';
import errorHandler from './middlewares/errorHandler.js'; // Importar el errorHandler

dotenv.config();

const { Pool } = pg;

// Configuración de la base de datos utilizando variables de entorno
const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432, // Utiliza el puerto definido en la variable de entorno o el puerto 5432 por defecto
};

export const pool = new Pool(dbConfig);

// Evento que se dispara cuando se establece una conexión con la base de datos
pool.on('connect', () => {
    console.log('La base de datos está conectada');

    // Forzar un error para probar el manejo de errores
    // Descomentar la siguiente línea para simular un error de conexión
    // handlePoolError(new Error('Simulated connection error'));
});

// Evento que se dispara cuando ocurre un error en el pool de conexiones
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err); // Registrar el error en la consola
    handlePoolError(err); // Manejar el error utilizando la función handlePoolError
    process.exit(-1); // Terminar el proceso debido a un error crítico
});

// Función para manejar los errores del pool de conexiones
const handlePoolError = (err) => {
    const error = new Error('Error en el pool de conexiones');
    error.status = 500;
    error.stack = err.stack;

    // Llamar al errorHandler directamente
    errorHandler(error, null, null, () => {});
};
