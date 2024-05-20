import {Router} from 'express';
import { createCate, deleteCate, getCate, getCateId, updateCate } from '../controllers/categoria.controllers.js';

const router = Router();

// Busqueda general
router.get('/categoria', getCate);

router.get("/categoria/:id",getCateId);

router.post("/categoria", createCate );

router.put("/categoria/:id", updateCate);

router.delete("/categoria/:id", deleteCate);

export default router;

// Insertar en postman
// {
//     "name_cate": ""
// }

