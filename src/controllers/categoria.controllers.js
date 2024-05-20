import { pool } from '../db.js';


// Función para obtener todas las categorías
export const getCate = async (req, res) => {
    try {
        // Realizar consulta a la base de datos para obtener todas las categorías
        const { rows } = await pool.query("SELECT * FROM categoria");
        
        // Verificar si se encontraron categorías
        if (rows.length === 0) {
            return res.status(404).json({ message: "No se encontró ninguna categoría" });
        }
        
        // Enviar las categorías encontradas como respuesta
        res.json(rows);
    } catch (error) {
        // Manejar errores en caso de problemas durante la ejecución de la consulta
        console.error("Error al obtener categorías:", error);
        res.status(500).json({ error: "Hubo un error al obtener las categorías." });
    }
};

// Función para obtener una categoría por su ID
export const getCateId = async (req, res) => {
    try {
        // Obtener el ID de los parámetros de la solicitud
        const { id } = req.params;
        
        // Realizar consulta a la base de datos para obtener la categoría por su ID
        const { rows } = await pool.query('SELECT * FROM categoria WHERE id_cate = $1', [id]);

        // Verificar si se encontró la categoría
        if (rows.length === 0) {
            return res.status(404).json({ message: "No se encontró la categoría con el ID proporcionado." });
        }

        // Enviar la información de la categoría encontrada como respuesta
        res.json(rows);
    } catch (error) {
        // Manejar errores en caso de problemas durante la ejecución de la consulta
        console.error("Error al obtener la categoría por ID:", error);
        res.status(500).json({ error: "Hubo un error al obtener la categoría por ID" });
    }
};

// Función para crear una nueva categoría
export const createCate = async (req, res) => {
    try {
        // Obtener el nombre de la categoría del cuerpo de la solicitud
        const { name_cate } = req.body;

        // Verificar si ya existe una categoría con el mismo nombre en la base de datos
        const existingCategory = await pool.query('SELECT * FROM categoria WHERE name_cate = $1', [name_cate]);

        // Si ya existe una categoría con el mismo nombre, responder con un error
        if (existingCategory.rows && existingCategory.rows.length > 0) {
            return res.status(400).json({ error: "Ya existe una categoría con ese nombre." });
        }

        // Insertar la nueva categoría en la base de datos
        const result = await pool.query('INSERT INTO categoria (name_cate) VALUES ($1) RETURNING *', [name_cate]);

        // Responder con la categoría creada en la respuesta
        res.status(201).json(result.rows[0]);

    } catch (error) {
        // Manejar errores en caso de problemas durante la ejecución de la consulta
        console.error("Error al insertar la categoría:", error);
        res.status(500).json({ error: "Hubo un error al insertar la categoría." });
    }
};

// Función para actualizar una categoría por su ID
export const updateCate = async (req, res) => {
    try {
        // Obtener el ID de la categoría de los parámetros de la solicitud
        const id = req.params.id;
        
        // Obtener el nuevo nombre de la categoría del cuerpo de la solicitud
        const { name_cate } = req.body;
        
        // Actualizar el nombre de la categoría en la base de datos
        const result = await pool.query('UPDATE categoria SET name_cate = $1 WHERE id_cate = $2', [name_cate, id]);
        
        // Verificar si la actualización fue exitosa
        if (result.rowCount > 0) {
            res.status(200).json({ message: "Categoría actualizada exitosamente" });
        } else {
            res.status(404).json({ error: "No se encontró ninguna categoría con el ID proporcionado" });
        }
    } catch (error) {
        // Manejar errores en caso de problemas durante la ejecución de la consulta
        console.error("Error al actualizar la categoría:", error);
        res.status(500).json({ error: "Hubo un error al actualizar la categoría." });
    }
};

// Función para eliminar una categoría por su ID
export const deleteCate = async (req, res) => {
    try {
        // Obtener el ID de los parámetros de la solicitud
        const { id } = req.params;
        
        // Ejecutar la consulta SQL para eliminar la categoría por su ID
        const result = await pool.query("DELETE FROM categoria WHERE id_cate = $1", [id]);

        // Verificar si la eliminación fue exitosa (si se eliminó algún registro)
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "No se encontró el registro con ID: " + id });
        }

        // Responder con un mensaje de éxito si se eliminó la categoría
        res.json({ message: "Se ha eliminado exitosamente" });

    } catch (error) {
        // Manejar errores en caso de problemas durante la ejecución de la consulta
        console.error("Error al intentar eliminar la categoría:", error);
        res.status(500).json({ error: "Hubo un error al intentar eliminar la categoría" });
    }
};
