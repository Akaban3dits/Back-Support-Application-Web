import { Router } from 'express';
import { createCate, deleteCate, getCate, getCateId, updateCate } from '../controllers/categoriaController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';  // Importa el middleware de verificación de token

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Categorias
 *  description: Endpoints para la gestión de categorias
 */

/**
 * @swagger
 * /api/categorias:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de todas las categorías
 *       404:
 *         description: No se encontró ninguna categoría
 *       500:
 *         description: Error al obtener las categorías
 */
router.get('/categorias', verifyToken, getCate);  // Aplica verifyToken

/**
 * @swagger
 * /api/categorias/{id}:
 *   get:
 *     summary: Obtener una categoría por ID
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría obtenida por ID
 *       404:
 *         description: No se encontró la categoría con el ID proporcionado
 *       500:
 *         description: Error al obtener la categoría por ID
 */
router.get('/categorias/:id', verifyToken, getCateId);  // Aplica verifyToken

/**
 * @swagger
 * /api/categorias:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name_cate:
 *                 type: string
 *             required:
 *               - name_cate
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *       400:
 *         description: Ya existe una categoría con ese nombre
 *       500:
 *         description: Error al insertar la categoría
 */
router.post('/categorias', verifyToken, createCate);  // Aplica verifyToken

/**
 * @swagger
 * /api/categorias/{id}:
 *   put:
 *     summary: Actualizar una categoría por ID
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name_cate:
 *                 type: string
 *             required:
 *               - name_cate
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
 *       404:
 *         description: No se encontró ninguna categoría con el ID proporcionado
 *       500:
 *         description: Error al actualizar la categoría
 */
router.put('/categorias/:id', verifyToken, updateCate);  // Aplica verifyToken

/**
 * @swagger
 * /api/categorias/{id}:
 *   delete:
 *     summary: Eliminar una categoría por ID
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
 *       404:
 *         description: No se encontró el registro con ID proporcionado
 *       500:
 *         description: Error al intentar eliminar la categoría
 */
router.delete('/categorias/:id', verifyToken, deleteCate);  // Aplica verifyToken

export default router;
