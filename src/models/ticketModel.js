import { pool } from '../db.js';

class Ticket {
    static async findAll() {
        const { rows } = await pool.query(
            `SELECT 
                id_ticket,
                t.ems_ticket, 
                t.cls_ticket, 
                s.name_sts AS status, 
                d.name_disp AS dispositivo, 
                dep.name_dep AS departamento
            FROM public.ticket t
            JOIN public.status_tkt s ON t.fk_stat = s.id_sts
            JOIN public.dispositivo d ON t.fk_disp = d.id_disp
            JOIN public.departamento dep ON t.fk_depa = dep.id_dep`
        );
        return rows;
    }

    static async findByStatus(statusIds) {
        const { rows } = await pool.query(
            `SELECT 
                id_ticket,
                t.ems_ticket, 
                t.cls_ticket, 
                s.name_sts AS status, 
                d.name_disp AS dispositivo, 
                dep.name_dep AS departamento
            FROM public.ticket t
            JOIN public.status_tkt s ON t.fk_stat = s.id_sts
            JOIN public.dispositivo d ON t.fk_disp = d.id_disp
            JOIN public.departamento dep ON t.fk_depa = dep.id_dep
            WHERE t.fk_stat = ANY($1::int[])`, [statusIds]
        );
        return rows;
    }

    static async findHistory() {
        const { rows } = await pool.query(
            `SELECT 
                id_ticket,
                t.ems_ticket, 
                t.cls_ticket, 
                s.name_sts AS status, 
                d.name_disp AS dispositivo, 
                dep.name_dep AS departamento
            FROM public.ticket t
            JOIN public.status_tkt s ON t.fk_stat = s.id_sts
            JOIN public.dispositivo d ON t.fk_disp = d.id_disp
            JOIN public.departamento dep ON t.fk_depa = dep.id_dep
            WHERE t.fk_stat = 4`
        );
        return rows;
    }
}

export default Ticket;
