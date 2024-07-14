import { Router } from 'express';
import { createUser, deleteUser, deletelogicUser, getUser, getUserId, updateUser } from '../controllers/userController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para gestionar los usuarios
 */


/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de todos los usuarios
 *       404:
 *         description: No se encontraron usuarios
 *       500:
 *         description: Error al obtener usuarios
 */
router.get('/usuarios', getUser);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario obtenido por ID
 *       404:
 *         description: No se encontró el usuario con el ID proporcionado
 *       500:
 *         description: Error al obtener el usuario
 */
router.get('/usuarios/:id', getUserId);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Ya existe un usuario con ese correo
 *       500:
 *         description: Error al crear el usuario
 */
router.post('/usuarios', createUser);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         description: No se encontró el usuario con el ID proporcionado
 *       500:
 *         description: Error al actualizar el usuario
 */
router.put('/usuarios/:id', updateUser);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: No se encontró el usuario con el ID proporcionado
 *       500:
 *         description: Error al eliminar el usuario
 */
router.delete('/usuarios/:id', deleteUser);

/**
 * @swagger
 * /api/usuarios/{id}/deactivate:
 *   put:
 *     summary: Desactivar (borrado lógico) un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario desactivado exitosamente
 *       404:
 *         description: No se encontró el usuario con el ID proporcionado
 *       500:
 *         description: Error al desactivar el usuario
 */
router.put('/usuarios/:id/deactivate', deletelogicUser);

export default router;
