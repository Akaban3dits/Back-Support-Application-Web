import { Router } from "express";
import { createDepa, deleteDepa, getDepa, getDepaId, updateDepa } from "../controllers/departamento.controller.js";


const router = Router();

router.get('/departamento', getDepa);
router.get('/departamento/:id', getDepaId);
router.post('/departamento', createDepa);
router.put('/departamento/:id', updateDepa);
router.delete('/departamento/:id', deleteDepa);

export default router;


