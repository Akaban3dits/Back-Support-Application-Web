import express from 'express';
import {PORT} from './config.js';
import categoriaRoutes from "./routes/categoria.routes.js";
import departamentoRoutes from "./routes/departamento.routes.js";
import statusRoutes from './routes/status.routes.js';
import UserRoutes from './routes/usuarios.routes.js';

const app = express();
app.use(express.json());
app.use(categoriaRoutes);
app.use(departamentoRoutes);
app.use(statusRoutes);
app.use(UserRoutes);
app.listen(PORT);
console.log("Server on port ", PORT);