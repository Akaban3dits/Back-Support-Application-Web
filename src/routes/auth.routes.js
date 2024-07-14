import { Router } from 'express';
import { login } from '../controllers/authControllers.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *      name: Auth
 *      description: Autenticación de todos los usuarios
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciales incorrectas
 */
router.post("/login", login);

/**
 * @swagger
 * /api/verify-token:
 *   get:
 *     summary: Verificar validez del token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token válido
 *       401:
 *         description: Token inválido o no proporcionado
 */
router.get('/verify-token', verifyToken, (req, res) => {
    res.json({ valid: true });
});

export default router;
