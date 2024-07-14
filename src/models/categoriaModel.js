import { pool } from '../db.js';

class Categoria {
    static async findAll() {
        const { rows } = await pool.query("SELECT * FROM categoria");
        return rows;
    }

    static async findById(id) {
        const { rows } = await pool.query('SELECT * FROM categoria WHERE id_cate = $1', [id]);
        return rows[0];
    }

    static async findByName(name) {
        const { rows } = await pool.query('SELECT * FROM categoria WHERE name_cate = $1', [name]);
        return rows[0];
    }

    static async create(name) {
        const { rows } = await pool.query('INSERT INTO categoria (name_cate) VALUES ($1) RETURNING *', [name]);
        return rows[0];
    }

    static async update(id, name) {
        const { rowCount } = await pool.query('UPDATE categoria SET name_cate = $1 WHERE id_cate = $2', [name, id]);
        return rowCount > 0;
    }

    static async delete(id) {
        const { rowCount } = await pool.query('DELETE FROM categoria WHERE id_cate = $1', [id]);
        return rowCount > 0;
    }
}

export default Categoria;
