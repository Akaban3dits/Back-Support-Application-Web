import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import categoriaRoutes from './routes/categoria.routes.js';
import departamentoRoutes from './routes/departamento.routes.js';
import statusRoutes from './routes/status.routes.js';
import userRoutes from './routes/user.routes.js';
import manttoRoutes from './routes/mantto.routes.js';
import authRoutes from './routes/auth.routes.js';
import ticketRoutes from './routes/ticket.routes.js';
import { swaggerUi, swaggerSpec } from './config/swaggerConfig.js';
import errorHandler from './middlewares/errorHandler.js'; 

/**
 *  Endpoints: Tickets
 *      *: Rutas para realizar las peticiones 
 *          http://localhost:5000/api/
 *      !: Solo manejan el enrutamiento
 *      ?: Documentación SWAGGER: http://localhost:5000/api-docs/ (Forma Local)
 */

const app = express();
//Estandar de peticiones HTTP de forma segura
app.use(cors());
// Visualizacion y control de formatos JSON
app.use(express.json());
// Registrar las solicitudes
app.use(morgan('dev')); 

// Configurar Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Registrar las rutas
app.use('/api', categoriaRoutes);
app.use('/api', departamentoRoutes);
app.use('/api', statusRoutes);
app.use('/api', userRoutes);
app.use('/api', manttoRoutes);
app.use('/api', authRoutes);
app.use('/api', ticketRoutes);

// Importacion del gestor de errores
app.use(errorHandler);

export default app;
