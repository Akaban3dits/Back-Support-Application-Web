import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
// Obtener la ruta del directorio actual
const __dirname = path.dirname(__filename);

// Middleware para gestionar errores
const errorHandler = (err, req, res, next) => {
    const logDir = path.join(__dirname, '..', 'logs');
    const logFilePath = path.join(logDir, 'errors.txt');
    const logMessage = `${new Date().toISOString()} - ${err.status || 500} - ${err.message}\n${err.stack}\n\n`;

    // Verificar y crear la carpeta de logs si no existe
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }

    // Registrar el error en un archivo
    fs.appendFile(logFilePath, logMessage, (writeErr) => {
        if (writeErr) {
            console.error('Error al escribir en el archivo de log', writeErr);
        }
    });

    // Imprimir el error en la consola
    console.error(logMessage);

    // Enviar respuesta al cliente
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        status,
        message,
    });
};

export default errorHandler;
