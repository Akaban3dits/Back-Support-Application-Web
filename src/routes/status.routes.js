import { Router } from 'express';
import { getSts, getStsId, createSts, updateSts, deleteSts } from '../controllers/statusController.js';

const router = Router();

/**
 * @swagger
 * tags: 
 *   name: Status
 *   description: Endpoints para gestionar los Status
 */

/**
 * @swagger
 * /api/status:
 *   get:
 *     summary: Obtener todos los status
 *     tags: [Status]
 *     responses:
 *       200:
 *         description: Lista de todos los status
 *       404:
 *         description: No se encontraron status
 *       500:
 *         description: Error al obtener status
 */
router.get('/status', getSts);

/**
 * @swagger
 * /api/status/{id}:
 *   get:
 *     summary: Obtener un status por ID
 *     tags: [Status]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del status
 *     responses:
 *       200:
 *         description: Status obtenido por ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Status'
 *       404:
 *         description: No se encontró el status con el ID proporcionado
 *       500:
 *         description: Error al obtener el status
 */
router.get('/status/:id', getStsId);

/**
 * @swagger
 * /api/status:
 *   post:
 *     summary: Crear un nuevo status
 *     tags: [Status]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Status'
 *     responses:
 *       201:
 *         description: Status creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Status'
 *       400:
 *         description: Ya existe un status con ese nombre
 *       500:
 *         description: Error al insertar el status
 */
router.post('/status', createSts);

/**
 * @swagger
 * /api/status/{id}:
 *   put:
 *     summary: Actualizar un status por ID
 *     tags: [Status]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Status'
 *     responses:
 *       200:
 *         description: Status actualizado exitosamente
 *       404:
 *         description: No se encontró ningún status con el ID proporcionado
 *       500:
 *         description: Error al actualizar el status
 */
router.put('/status/:id', updateSts);

/**
 * @swagger
 * /api/status/{id}:
 *   delete:
 *     summary: Eliminar un status por ID
 *     tags: [Status]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del status
 *     responses:
 *       200:
 *         description: Status eliminado exitosamente
 *       404:
 *         description: No se encontró el registro con ID proporcionado
 *       500:
 *         description: Error al intentar eliminar el status
 */
router.delete('/status/:id', deleteSts);

export default router;
