import { Router } from "express";
import { createDepa, deleteDepa, getDepa, getDepaId, updateDepa } from "../controllers/departamentoController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Departamentos
 *   description: Endpoints para la gestión de departamentos
 */

/**
 * @swagger
 * /api/departamentos:
 *   get:
 *     summary: Obtener todos los departamentos
 *     tags: [Departamentos]
 *     responses:
 *       200:
 *         description: Lista de todos los departamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Departamento'
 *       404:
 *         description: No se encontraron departamentos
 *       500:
 *         description: Error al obtener departamentos
 */
router.get('/departamentos', getDepa);

/**
 * @swagger
 * /api/departamentos/{id}:
 *   get:
 *     summary: Obtener un departamento por ID
 *     tags: [Departamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del departamento
 *     responses:
 *       200:
 *         description: Departamento obtenido por ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Departamento'
 *       404:
 *         description: No se encontró el departamento con el ID proporcionado
 *       500:
 *         description: Error al obtener el departamento
 */
router.get('/departamentos/:id', getDepaId);

/**
 * @swagger
 * /api/departamentos:
 *   post:
 *     summary: Crear un nuevo departamento
 *     tags: [Departamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Departamento'
 *     responses:
 *       201:
 *         description: Departamento creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Departamento'
 *       400:
 *         description: Ya existe un departamento con ese nombre
 *       500:
 *         description: Error al insertar el departamento
 */
router.post('/departamentos', createDepa);

/**
 * @swagger
 * /api/departamentos/{id}:
 *   put:
 *     summary: Actualizar un departamento por ID
 *     tags: [Departamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del departamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Departamento'
 *     responses:
 *       200:
 *         description: Departamento actualizado exitosamente
 *       404:
 *         description: No se encontró ningún departamento con el ID proporcionado
 *       500:
 *         description: Error al actualizar el departamento
 */
router.put('/departamentos/:id', updateDepa);

/**
 * @swagger
 * /api/departamentos/{id}:
 *   delete:
 *     summary: Eliminar un departamento por ID
 *     tags: [Departamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del departamento
 *     responses:
 *       200:
 *         description: Departamento eliminado exitosamente
 *       404:
 *         description: No se encontró el registro con ID proporcionado
 *       500:
 *         description: Error al intentar eliminar el departamento
 */
router.delete('/departamentos/:id', deleteDepa);

export default router;
