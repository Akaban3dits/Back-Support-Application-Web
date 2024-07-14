import Departamento from '../models/departamentoModel.js';
import DepartamentoDTO from '../dtos/departamentoDTO.js';

export const getDepa = async (req, res, next) => {
    try {
        const departamentos = await Departamento.findAll();
        if (departamentos.length === 0) {
            return res.status(404).json({ message: "No se encontraron departamentos" });
        }
        const departamentosDTO = departamentos.map(depa => new DepartamentoDTO(depa));
        res.json(departamentosDTO);
    } catch (error) {
        next(error); // Pasar el error al middleware de gestión de errores
    }
};

export const getDepaId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const departamento = await Departamento.findById(id);
        if (!departamento) {
            return res.status(404).json({ message: "No se encontró ningún departamento con el ID proporcionado" });
        }
        const departamentoDTO = new DepartamentoDTO(departamento);
        res.json(departamentoDTO);
    } catch (error) {
        next(error); // Pasar el error al middleware de gestión de errores
    }
};

export const createDepa = async (req, res, next) => {
    try {
        const { name_dep } = req.body;
        const existingDepartment = await Departamento.findByName(name_dep);
        if (existingDepartment) {
            return res.status(400).json({ error: "Ya existe un departamento con ese nombre" });
        }
        const departamento = await Departamento.create(name_dep);
        const departamentoDTO = new DepartamentoDTO(departamento);
        res.status(201).json(departamentoDTO);
    } catch (error) {
        next(error); // Pasar el error al middleware de gestión de errores
    }
};

export const updateDepa = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name_dep } = req.body;
        const updated = await Departamento.update(id, name_dep);
        if (updated) {
            res.status(200).json({ message: "Departamento actualizado exitosamente" });
        } else {
            res.status(404).json({ error: "No se encontró ningún departamento con el ID proporcionado" });
        }
    } catch (error) {
        next(error); // Pasar el error al middleware de gestión de errores
    }
};

export const deleteDepa = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Departamento.delete(id);
        if (deleted) {
            res.json({ message: "Se ha eliminado exitosamente" });
        } else {
            res.status(404).json({ message: "No se encontró el registro con ID: " + id });
        }
    } catch (error) {
        next(error); // Pasar el error al middleware de gestión de errores
    }
};
