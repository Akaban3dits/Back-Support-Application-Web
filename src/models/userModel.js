import { pool } from '../db.js';
import bcrypt from 'bcryptjs';

class User {
    static async findAll() {
        const { rows } = await pool.query(
            "SELECT u.id_user, CONCAT(u.name_user, ' ', u.lname_user) AS full_name, u.agn_user, u.sts_user, d.name_dep FROM usuarios u JOIN departamento d ON u.fk_dep = d.id_dep"
        );
        return rows;
    }

    static async findById(id) {
        const { rows } = await pool.query(
            "SELECT u.id_user, u.name_user, u.lname_user, u.agn_user, u.sts_user, d.name_dep FROM usuarios u JOIN departamento d ON u.fk_dep = d.id_dep WHERE u.id_user = $1",
            [id]
        );
        return rows[0];
    }

    static async findByEmail(email) {
        const { rows } = await pool.query('SELECT * FROM usuarios WHERE email_user = $1', [email]);
        return rows[0];
    }

    static async create(user) {
        const { name, lname, email, pass, noti, agen, rol, stats, depa } = user;
        const hashedPassword = await bcrypt.hash(pass, 10);
        const result = await pool.query(
            'INSERT INTO usuarios (name_user, lname_user, email_user, pass_user, pnot_user, agn_user, rol_user, sts_user, fk_dep) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [name, lname, email, hashedPassword, noti, agen, rol, stats, depa]
        );
        return result.rows[0];
    }

    static async update(id, user) {
        const { name, lname, email, pass, noti, agen, rol, stats, depa } = user;
        const hashedPassword = await bcrypt.hash(pass, 10);
        const result = await pool.query(
            'UPDATE usuarios SET name_user = $1, lname_user = $2, email_user = $3, pass_user = $4, pnot_user = $5, agn_user = $6, rol_user = $7, sts_user = $8, fk_dep = $9 WHERE id_user = $10 RETURNING *',
            [name, lname, email, hashedPassword, noti, agen, rol, stats, depa, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM usuarios WHERE id_user = $1 RETURNING *', [id]);
        return result.rows[0];
    }

    static async softDelete(id) {
        const result = await pool.query('UPDATE usuarios SET sts_user = $1 WHERE id_user = $2 RETURNING *', [false, id]);
        return result.rows[0];
    }

    static async findByEmail(email) {
        const { rows } = await pool.query(
            'SELECT *, CONCAT(name_user, \' \', lname_user) AS full_name FROM usuarios WHERE email_user = $1',
            [email]
        );
        return rows[0];
    }
}

export default User;
