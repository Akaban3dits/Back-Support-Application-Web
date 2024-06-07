import {Router} from 'express';
import { createUser, deleteUser, deletelogicUser, getUser, getUserId, login, updateUser } from '../controllers/usuario.controllers.js';


const router = Router();

// Busqueda general
router.get('/usuarios', getUser );

router.get("/usuarios/:id", getUserId);

router.post("/usuarios", createUser);

router.put("/usuarios/:id", updateUser);

router.delete("/usuarios/:id", deleteUser);

router.delete("/usuarios/:id", deletelogicUser)

router.post("/login", login)

export default router;


