import { pool } from '../db.js';

class Mantenimiento {
    static async findAll(page, limit) {
        const offset = (page - 1) * limit;
        const { rows } = await pool.query(
            `SELECT u.id_mantto, u.date_prog, u.dtl_mantto, CONCAT(d.name_user, ' ', d.lname_user) AS full_name 
                FROM mantenimiento u 
                JOIN usuarios d ON u.fk_usuario = d.id_user
                LIMIT $1 OFFSET $2;`,
            [parseInt(limit), parseInt(offset)]
        );

        const { rows: totalRows } = await pool.query('SELECT COUNT(*) FROM mantenimiento');
        const totalRecords = parseInt(totalRows[0].count);

        return { rows, totalRecords };
    }

    static async findFiltered(search, page, limit) {
        const offset = (page - 1) * limit;
        const searchQuery = `%${search.toLowerCase()}%`;

        const { rows } = await pool.query(
            `SELECT u.id_mantto, u.date_prog, u.dtl_mantto, CONCAT(d.name_user, ' ', d.lname_user) AS full_name 
                FROM mantenimiento u 
                JOIN usuarios d ON u.fk_usuario = d.id_user
                WHERE LOWER(u.date_prog::text) LIKE $1 
                OR LOWER(u.dtl_mantto) LIKE $1 
                OR LOWER(CONCAT(d.name_user, ' ', d.lname_user)) LIKE $1
                LIMIT $2 OFFSET $3;`,
            [searchQuery, parseInt(limit), parseInt(offset)]
        );

        const { rows: totalRows } = await pool.query(
            `SELECT COUNT(*) FROM mantenimiento u 
                JOIN usuarios d ON u.fk_usuario = d.id_user
                WHERE LOWER(u.date_prog::text) LIKE $1 
                OR LOWER(u.dtl_mantto) LIKE $1 
                OR LOWER(CONCAT(d.name_user, ' ', d.lname_user)) LIKE $1;`,
            [searchQuery]
        );

        const totalRecords = parseInt(totalRows[0].count);

        return { rows, totalRecords };
    }
}

export default Mantenimiento;
