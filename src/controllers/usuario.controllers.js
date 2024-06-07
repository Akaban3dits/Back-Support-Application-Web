import { token } from 'morgan';
import { pool } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";


export const getUser = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT u.id_user, u.name_user, u.lname_user, u.agn_user, u.sts_user, d.name_dep FROM usuarios u JOIN departamento d ON u.fk_dep = d.id_dep"
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "No se encontró ningún usuario" });
        }

        res.json(rows);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ error: "Hubo un error al obtener los usuarios" });
    }
};

export const getUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query(
            "SELECT u.id_user, u.name_user, u.lname_user, u.agn_user, u.sts_user, d.name_dep FROM usuarios u JOIN departamento d ON u.fk_dep = d.id_dep WHERE u.id_user = $1",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "No se encontró ningún usuario" });
        }

        // Aquí devolvemos solo la información del usuario sin la contraseña
        const user = {
            id_user: rows[0].id_user,
            name_user: rows[0].name_user,
            lname_user: rows[0].lname_user,
            agn_user: rows[0].agn_user,
            sts_user: rows[0].sts_user,
            name_dep: rows[0].name_dep
        };

        res.json(user);

    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        res.status(500).json({ error: "Hubo un error al obtener el usuario" });
    }
};

export const createUser = async (req, res) => {
    try {
        const { name, lname, email, pass, noti, agen, rol, stats, depa } = req.body;

        // Verificar si el correo ya existe
        const existingEmail = await pool.query('SELECT * FROM usuarios WHERE email_user = $1', [email]);
        if (existingEmail.rows.length > 0) {
            return res.status(400).json({ error: 'Ya existe un usuario con ese correo' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(pass, 10);

        // Insertar el nuevo usuario en la base de datos con la contraseña hasheada
        const result = await pool.query('INSERT INTO usuarios (name_user, lname_user, email_user, pass_user, pnot_user, agn_user, rol_user, sts_user, fk_dep) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', 
            [name, lname, email, hashedPassword, noti, agen, rol, stats, depa]);

        res.status(201).send();

    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ error: 'Hubo un error al crear el usuario.' });
    }
};

export const updateUser = async (req, res) => {
    try {
        const id = req.params.id; // Obtener el ID del usuario de los parámetros de la URL
        const { name, lname, email, pass, noti, agen, rol, stats, depa } = req.body; // Obtener los datos actualizados del usuario del cuerpo de la solicitud

        // Verificar si el usuario existe en la base de datos
        const existingUser = await pool.query('SELECT * FROM usuarios WHERE id_user = $1', [id]);
        if (existingUser.rows.length === 0) {
            // Si el usuario no existe, devolver un error 404
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Verificar si ya existe un usuario con el correo electrónico proporcionado
        const existingEmail = await pool.query('SELECT * FROM usuarios WHERE email_user = $1', [email]);
        if (existingEmail.rows.length > 0 && existingEmail.rows[0].id_user !== id) {
            return res.status(400).json({ error: "Ya existe un usuario con ese correo electrónico." });
        }

        // Hashear la contraseña antes de actualizarla en la base de datos
        const hashedPassword = await bcrypt.hash(pass, 10);

        // Actualizar los datos del usuario en la base de datos
        await pool.query('UPDATE usuarios SET name_user = $1, lname_user = $2, email_user = $3, pass_user = $4, pnot_user = $5, agn_user = $6, rol_user = $7, sts_user = $8, fk_dep = $9 WHERE id_user = $10',
            [name, lname, email, hashedPassword, noti, agen, rol, stats, depa, id]);

        // Devolver una respuesta exitosa después de actualizar el usuario
        res.status(200).json({ message: "Usuario actualizado correctamente" });
    } catch (error) {
        // Manejar cualquier error que ocurra durante el proceso de actualización
        console.error("Error al actualizar el usuario:", error);
        res.status(500).json({ error: "Hubo un error al actualizar el usuario" });
    }
};

export const deletelogicUser = async (req, res) => {
    try {
        const id = req.params.id; // Obtener el ID del usuario de los parámetros de la URL

        // Verificar si el usuario existe en la base de datos
        const existingUser = await pool.query('SELECT * FROM usuarios WHERE id_user = $1', [id]);
        if (existingUser.rows.length === 0) {
            // Si el usuario no existe, devolver un error 404
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Actualizar el campo sts para marcar el usuario como inactivo
        await pool.query('UPDATE usuarios SET sts = $1 WHERE id_user = $2', [false, id]);

        // Devolver un mensaje de éxito después de marcar el usuario como inactivo
        res.status(200).json({ message: "Usuario marcado como inactivo correctamente" });
    } catch (error) {
        // Manejar cualquier error que ocurra durante el proceso de actualización
        console.error("Error al marcar el usuario como inactivo:", error);
        res.status(500).json({ error: "Hubo un error al marcar el usuario como inactivo" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id; // Obtener el ID del usuario de los parámetros de la URL

        // Verificar si el usuario existe en la base de datos
        const existingUser = await pool.query('SELECT * FROM usuarios WHERE id_user = $1', [id]);
        if (existingUser.rows.length === 0) {
            // Si el usuario no existe, devolver un error 404
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Eliminar el usuario de la base de datos
        await pool.query('DELETE FROM usuarios WHERE id_user = $1', [id]);

        // Devolver un mensaje de éxito después de eliminar el usuario
        res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        // Manejar cualquier error que ocurra durante el proceso de eliminación
        console.error("Error al eliminar el usuario:", error);
        res.status(500).json({ error: "Hubo un error al eliminar el usuario" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body; // Obtener correo electrónico y contraseña desde el cuerpo de la solicitud

        // Obtener el usuario de la base de datos usando el correo electrónico proporcionado
        const { rows } = await pool.query('SELECT * FROM usuarios WHERE email_user = $1', [email]);
        
        // Verificar si no se encontraron usuarios con el correo electrónico proporcionado
        if (rows.length === 0) {
            return res.status(401).json({ error: 'El correo y la contraseña son incorrectos' }); // Devolver error si la cuenta no se usa
        }

        const user = rows[0]; // Obtener el primer usuario encontrado

        // Verificar si la cuenta está activa
        if (user.sts === false) {
            return res.status(401).json({ error: 'La cuenta está inactiva' }); // Devolver error si la cuenta está inactiva
        }

        // Comparar la contraseña ingresada con el hash almacenado en la base de datos
        const isMatch = await bcrypt.compare(password, user.pass_user);
        
        // Verificar si la contraseña es incorrecta
        if (!isMatch) {
            return res.status(401).json({ error: 'Correo o contraseña incorrectos' }); // Devolver error si la contraseña es incorrecta
        }

        // Generar token JWT si la autenticación es exitosa
        const token = jwt.sign({ id_user: user.id_user }, 'secretkey', { expiresIn: '1h' });

        // Devolver el token JWT en la respuesta
        res.json({ token });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Hubo un error al iniciar sesión' }); // Devolver error si hay un error interno del servidor
    }
};


// {
//     "name": "John",
//     "lname": "Doe",
//     "email": "johndoe1@example.com",
//     "pass": "password123",
//     "noti": true,
//     "agen": true,
//     "rol": true,
//     "stats": true,
//     "depa": 1
//   }
