import {Router} from 'express';
import { createSts, deleteSts, getSts, getStsId, updateSts } from '../controllers/status.controller.js';

const router = Router();

// Busqueda general
router.get('/status', getSts);

router.get("/status/:id",getStsId);

router.post("/status", createSts);

router.put("/status/:id", updateSts);

router.delete("/status/:id", deleteSts);

export default router;

