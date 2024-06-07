import { pool } from '../db.js';

// Función para obtener todos los departamentos
export const getDepa = async (req, res) => {
    try {
        // Realizar consulta a la base de datos para obtener todos los departamentos
        const { rows } = await pool.query("SELECT * FROM departamento");

        // Verificar si se encontraron registros
        if (rows.length === 0) {
            return res.status(404).json({ message: "No se encontraron departamentos" });
        }

        // Enviar los registros encontrados como respuesta
        res.json(rows);
    } catch (error) {
        // Manejar errores en caso de problemas durante la ejecución de la consulta
        console.error("Error al obtener departamentos:", error);
        res.status(500).json({ error: "Hubo un error al obtener los departamentos" });
    }
};

// Función para obtener un departamento por su ID
export const getDepaId = async (req, res) => {
    try {
        // Obtener el ID del departamento de los parámetros de la solicitud
        const { id } = req.params;

        // Consultar la base de datos para encontrar el departamento con el ID proporcionado
        const { rows } = await pool.query('SELECT * FROM departamento WHERE id_dep = $1', [id]);

        // Verificar si se encontró el departamento
        if (rows.length === 0) {
            return res.status(404).json({ message: "No se encontró ningún departamento con el ID proporcionado" });
        }

        // Enviar la información del departamento encontrado como respuesta
        res.json(rows);
    } catch (error) {
        // Manejar errores en caso de problemas durante la ejecución de la consulta
        console.error("Error al obtener el departamento por ID:", error);
        res.status(500).json({ error: "Hubo un error al obtener el departamento por ID" });
    }
};

// Función para crear un nuevo departamento
export const createDepa = async (req, res) => {
    try {
        // Obtener el nombre del departamento del cuerpo de la solicitud
        const { name_dep } = req.body;
        
        // Verificar si ya existe un departamento con el mismo nombre en la base de datos
        const existingDepartment = await pool.query('SELECT * FROM departamento WHERE name_dep = $1', [name_dep]);

        // Si ya existe un departamento con el mismo nombre, responder con un error
        if (existingDepartment.rows.length > 0) {
            return res.status(400).json({ error: "Ya existe un departamento con ese nombre" });
        }

        // Insertar el nuevo departamento en la base de datos
        const result = await pool.query('INSERT INTO departamento (name_dep) VALUES ($1) RETURNING *', [name_dep]);

        // Responder con el departamento creado en la respuesta
        res.status(201).send();

    } catch (error) {
        // Manejar errores en caso de problemas durante la ejecución de la consulta
        console.error("Error al insertar el departamento:", error);
        res.status(500).json({ error: "Hubo un error al insertar el departamento" });
    }
};

// Función para actualizar un departamento por su ID
export const updateDepa = async (req, res) => {
    try {
        // Obtener el ID del departamento de los parámetros de la solicitud
        const depaId = req.params.id;
        
        // Obtener el nuevo nombre del departamento del cuerpo de la solicitud
        const { name_dep } = req.body;

        // Actualizar el nombre del departamento en la base de datos
        const result = await pool.query('UPDATE departamento SET name_dep = $1 WHERE id_dep = $2', [name_dep, depaId]);

        // Verificar si la actualización fue exitosa
        if (result.rowCount > 0) {
            res.status(200).json({ message: "Departamento actualizado exitosamente" });
        } else {
            res.status(404).json({ error: "No se encontró ningún departamento con el ID proporcionado" });
        }

    } catch (error) {
        // Manejar errores en caso de problemas durante la ejecución de la consulta
        console.error("Error al actualizar el departamento:", error);
        res.status(500).json({ error: "Hubo un error al actualizar el departamento." });
    }
};

// Función para eliminar un departamento por su ID
export const deleteDepa = async (req, res) => {
    try {
        // Obtener el ID del departamento de los parámetros de la solicitud
        const { id } = req.params;
        
        // Ejecutar la consulta SQL para eliminar el departamento por su ID
        const result = await pool.query("DELETE FROM departamento WHERE id_dep = $1", [id]);

        // Verificar si la eliminación fue exitosa (si se eliminó algún registro)
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "No se encontró el registro con ID: " + id });
        }

        // Responder con un mensaje de éxito si se eliminó el departamento
        res.json({ message: "Se ha eliminado exitosamente" });

    } catch (error) {
        // Manejar errores en caso de problemas durante la ejecución de la consulta
        console.error("Error al intentar eliminar el contenido:", error);
        res.status(500).json({ error: "Hubo un error al intentar eliminar el contenido" });
    }
};

