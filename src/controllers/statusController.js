import Status from '../models/statusModel.js';
import StatusDTO from '../dtos/statusDTO.js';

export const getSts = async (req, res) => {
    try {
        const statuses = await Status.findAll();
        if (statuses.length === 0) {
            return res.status(404).json({ message: "No se encontraron status" });
        }
        const statusesDTO = statuses.map(status => new StatusDTO(status));
        res.json(statusesDTO);
    } catch (error) {
        next(error);
    }
};

export const getStsId = async (req, res) => {
    try {
        const { id } = req.params;
        const status = await Status.findById(id);
        if (!status) {
            return res.status(404).json({ message: "No se encontró ningún status con el ID proporcionado" });
        }
        const statusDTO = new StatusDTO(status);
        res.json(statusDTO);
    } catch (error) {
        next(error);
    }
};

export const createSts = async (req, res) => {
    try {
        const { name_sts } = req.body;
        const existingStatus = await Status.findByName(name_sts);
        if (existingStatus) {
            return res.status(400).json({ error: "Ya existe un status con ese nombre" });
        }
        const status = await Status.create(name_sts);
        const statusDTO = new StatusDTO(status);
        res.status(201).json(statusDTO);
    } catch (error) {
        next(error);
    }
};

export const updateSts = async (req, res) => {
    try {
        const { id } = req.params;
        const { name_sts } = req.body;
        const updated = await Status.update(id, name_sts);
        if (updated) {
            res.status(200).json({ message: "Status actualizado exitosamente" });
        } else {
            res.status(404).json({ error: "No se encontró ningún status con el ID proporcionado" });
        }
    } catch (error) {
        next(error);
    }
};

export const deleteSts = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Status.delete(id);
        if (deleted) {
            res.json({ message: "Se ha eliminado exitosamente" });
        } else {
            res.status(404).json({ message: "No se encontró el registro con ID: " + id });
        }
    } catch (error) {
        next(error);
    }
};
