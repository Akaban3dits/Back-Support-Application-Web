import Categoria from '../models/categoriaModel.js';
import CategoriaDTO from '../dtos/categoriaDTO.js';

export const getCate = async (req, res, next) => {
    try {
        const categorias = await Categoria.findAll();
        if (categorias.length === 0) {
            return res.status(404).json({ message: "No se encontró ninguna categoría" });
        }
        const categoriasDTO = categorias.map(categoria => new CategoriaDTO(categoria));
        res.json(categoriasDTO);
    } catch (error) {
        console.error("Error al obtener categorías:", error);
        next(error);
    }
};

export const getCateId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findById(id);
        if (!categoria) {
            return res.status(404).json({ message: "No se encontró la categoría con el ID proporcionado." });
        }
        const categoriaDTO = new CategoriaDTO(categoria);
        res.json(categoriaDTO);
    } catch (error) {
        console.error("Error al obtener la categoría por ID:", error);
        next(error);
    }
};

export const createCate = async (req, res, next) => {
    try {
        const { name_cate } = req.body;
        const existingCategory = await Categoria.findByName(name_cate);
        if (existingCategory) {
            return res.status(400).json({ error: "Ya existe una categoría con ese nombre." });
        }
        const categoria = await Categoria.create(name_cate);
        const categoriaDTO = new CategoriaDTO(categoria);
        res.status(201).json(categoriaDTO);
    } catch (error) {
        console.error("Error al insertar la categoría:", error);
        next(error);
    }
};

export const updateCate = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name_cate } = req.body;
        const updated = await Categoria.update(id, name_cate);
        if (!updated) {
            return res.status(404).json({ error: "No se encontró ninguna categoría con el ID proporcionado" });
        }
        res.status(200).json({ message: "Categoría actualizada exitosamente" });
    } catch (error) {
        console.error("Error al actualizar la categoría:", error);
        next(error);
    }
};

export const deleteCate = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Categoria.delete(id);
        if (!deleted) {
            return res.status(404).json({ message: "No se encontró el registro con ID: " + id });
        }
        res.json({ message: "Se ha eliminado exitosamente" });
    } catch (error) {
        console.error("Error al intentar eliminar la categoría:", error);
        next(error);
    }
};
