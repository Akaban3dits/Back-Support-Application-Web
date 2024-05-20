import { pool } from '../db.js';

// Función para obtener todos los status
export const getSts = async (req, res) => {
    try {
        // Realizar consulta a la base de datos para obtener todos los status
        const { rows } = await pool.query("SELECT * FROM status_tkt");

        // Verificar si se encontraron registros
        if (rows.length === 0) {
            return res.status(404).json({ message: "No se encontraron status" });
        }

        // Enviar los registros encontrados como respuesta
        res.json(rows);
    } catch (error) {
        // Manejar errores en caso de problemas durante la ejecución de la consulta
        console.error("Error al obtener status:", error);
        res.status(500).json({ error: "Hubo un error al obtener los status" });
    }
};

// Función para obtener un status por su ID
export const getStsId = async (req, res) => {
    try {
        // Obtener el ID del status de los parámetros de la solicitud
        const { id } = req.params;

        // Consultar la base de datos para encontrar el status con el ID proporcionado
        const { rows } = await pool.query('SELECT * FROM status_tkt WHERE id_sts = $1', [id]);

        // Verificar si se encontró el status
        if (rows.length === 0) {
            return res.status(404).json({ message: "No se encontró ningún status con el ID proporcionado" });
        }

        // Enviar la información del status encontrado como respuesta
        res.json(rows);
    } catch (error) {
        // Manejar errores en caso de problemas durante la ejecución de la consulta
        console.error("Error al obtener el status por ID:", error);
        res.status(500).json({ error: "Hubo un error al obtener el status por ID" });
    }
};

// Función para crear un nuevo status
export const createSts = async (req, res) => {
    try {
        // Obtener el nombre del status del cuerpo de la solicitud
        const { name_sts } = req.body;
        
        // Verificar si ya existe un status con el mismo nombre en la base de datos
        const existingstatus = await pool.query('SELECT * FROM status_tkt WHERE name_sts = $1', [name_sts]);

        // Si ya existe un status con el mismo nombre, responder con un error
        if (existingstatus.rows.length > 0) {
            return res.status(400).json({ error: "Ya existe un status con ese nombre" });
        }

        // Insertar el nuevo status en la base de datos
        const result = await pool.query('INSERT INTO status_tkt (name_sts) VALUES ($1) RETURNING *', [name_sts]);

        // Responder con el status creado en la respuesta
        res.status(201).json(result.rows[0]);

    } catch (error) {
        // Manejar errores en caso de problemas durante la ejecución de la consulta
        console.error("Error al insertar el status:", error);
        res.status(500).json({ error: "Hubo un error al insertar el status" });
    }
};

// Función para actualizar un status por su ID
export const updateSts= async (req, res) => {
    try {
        // Obtener el ID del status de los parámetros de la solicitud
        const stsId = req.params.id;
        
        // Obtener el nuevo nombre del status del cuerpo de la solicitud
        const { name_sts } = req.body;

        // Actualizar el nombre del status en la base de datos
        const result = await pool.query('UPDATE status_tkt SET name_sts = $1 WHERE id_sts = $2', [name_sts, depaId]);

        // Verificar si la actualización fue exitosa
        if (result.rowCount > 0) {
            res.status(200).json({ message: "Status actualizado exitosamente" });
        } else {
            res.status(404).json({ error: "No se encontró ningún status con el ID proporcionado" });
        }

    } catch (error) {
        // Manejar errores en caso de problemas durante la ejecución de la consulta
        console.error("Error al actualizar el status:", error);
        res.status(500).json({ error: "Hubo un error al actualizar el status." });
    }
};

// Función para eliminar un status por su ID
export const deleteSts = async (req, res) => {
    try {
        // Obtener el ID del status de los parámetros de la solicitud
        const { id } = req.params;
        
        // Ejecutar la consulta SQL para eliminar el status por su ID
        const result = await pool.query("DELETE FROM status_tkt WHERE id_sts = $1", [id]);

        // Verificar si la eliminación fue exitosa (si se eliminó algún registro)
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "No se encontró el registro con ID: " + id });
        }

        // Responder con un mensaje de éxito si se eliminó el status
        res.json({ message: "Se ha eliminado exitosamente" });

    } catch (error) {
        // Manejar errores en caso de problemas durante la ejecución de la consulta
        console.error("Error al intentar eliminar el contenido:", error);
        res.status(500).json({ error: "Hubo un error al intentar eliminar el contenido" });
    }
};

