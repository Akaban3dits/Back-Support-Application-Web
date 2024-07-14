import { pool } from '../db.js';

class Status {
    static async findAll() {
        const { rows } = await pool.query("SELECT * FROM status_tkt");
        return rows;
    }

    static async findById(id) {
        const { rows } = await pool.query('SELECT * FROM status_tkt WHERE id_sts = $1', [id]);
        return rows[0];
    }

    static async findByName(name) {
        const { rows } = await pool.query('SELECT * FROM status_tkt WHERE name_sts = $1', [name]);
        return rows[0];
    }

    static async create(name) {
        const { rows } = await pool.query('INSERT INTO status_tkt (name_sts) VALUES ($1) RETURNING *', [name]);
        return rows[0];
    }

    static async update(id, name) {
        const { rowCount } = await pool.query('UPDATE status_tkt SET name_sts = $1 WHERE id_sts = $2', [name, id]);
        return rowCount > 0;
    }

    static async delete(id) {
        const { rowCount } = await pool.query('DELETE FROM status_tkt WHERE id_sts = $1', [id]);
        return rowCount > 0;
    }
}

export default Status;
