import { pool } from '../db.js';

class Departamento {
    static async findAll() {
        const { rows } = await pool.query("SELECT * FROM departamento");
        return rows;
    }

    static async findById(id) {
        const { rows } = await pool.query('SELECT * FROM departamento WHERE id_dep = $1', [id]);
        return rows[0];
    }

    static async findByName(name) {
        const { rows } = await pool.query('SELECT * FROM departamento WHERE name_dep = $1', [name]);
        return rows[0];
    }

    static async create(name) {
        const { rows } = await pool.query('INSERT INTO departamento (name_dep) VALUES ($1) RETURNING *', [name]);
        return rows[0];
    }

    static async update(id, name) {
        const { rowCount } = await pool.query('UPDATE departamento SET name_dep = $1 WHERE id_dep = $2', [name, id]);
        return rowCount > 0;
    }

    static async delete(id) {
        const { rowCount } = await pool.query('DELETE FROM departamento WHERE id_dep = $1', [id]);
        return rowCount > 0;
    }
}

export default Departamento;
