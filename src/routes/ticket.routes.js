import { Router } from 'express';
import { getTickets, getTicketsByStatus, getTicketHistory } from '../controllers/ticketController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: Endpoints para gestionar los Tickets
 */

/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: Obtener todos los tickets
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: Lista de todos los tickets
 *       404:
 *         description: No se encontraron tickets
 *       500:
 *         description: Error al obtener tickets
 */
router.get('/tickets', getTickets);

/**
 * @swagger
 * /api/tickets/status:
 *   get:
 *     summary: Obtener tickets por status
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: Lista de tickets por status
 *       404:
 *         description: No se encontraron tickets por el status proporcionado
 *       500:
 *         description: Error al obtener tickets por status
 */
router.get('/tickets/status', getTicketsByStatus);

/**
 * @swagger
 * /api/tickets/history:
 *   get:
 *     summary: Obtener historial de tickets
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: Historial de tickets
 *       404:
 *         description: No se encontraron tickets en el historial
 *       500:
 *         description: Error al obtener el historial de tickets
 */
router.get('/tickets/history', getTicketHistory);

export default router;
