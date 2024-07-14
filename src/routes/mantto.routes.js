import { Router } from 'express';
import { getAllMantto, getFilteredMantto } from '../controllers/manttoController.js';

const router = Router();

/**
 * @swagger
 * tags: 
 *   name: Mantenimientos
 *   description: Endpoints para la gestión de los Mantenimientos
 */

/**
 * @swagger
 * /api/mantenimientos:
 *   get:
 *     summary: Obtener todos los mantenimientos
 *     tags: [Mantenimientos]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Número de la página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Número de resultados por página
 *     responses:
 *       200:
 *         description: Lista de todos los mantenimientos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mantenimiento'
 *       404:
 *         description: No se encontraron mantenimientos
 *       500:
 *         description: Error al obtener mantenimientos
 */
router.get('/mantenimientos', getAllMantto);

/**
 * @swagger
 * /api/mantenimientos/search:
 *   get:
 *     summary: Buscar mantenimientos con filtros
 *     tags: [Mantenimientos]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Texto de búsqueda
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Número de la página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Número de resultados por página
 *     responses:
 *       200:
 *         description: Lista de mantenimientos filtrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mantenimiento'
 *       404:
 *         description: No se encontraron mantenimientos
 *       500:
 *         description: Error al obtener mantenimientos
 */
router.get('/mantenimientos/search', getFilteredMantto);

export default router;
