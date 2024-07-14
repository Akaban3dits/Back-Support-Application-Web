import dotenv from 'dotenv';

// *Recibe la configuracion del archivo de variables globales (.env)
dotenv.config(); 

import app from './app.js';
import { PORT } from './config/config.js';


/**
 * Permite que el Servidor se conecte al puerto proporcionado
 * Listen: En constante espera a respuestas
 */
app.listen(PORT, () => {
  console.log(`El servidor se esta ejecutando en el puerto: ${PORT}`);
});
