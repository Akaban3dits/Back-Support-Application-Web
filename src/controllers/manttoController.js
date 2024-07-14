import Mantenimiento from '../models/manttoModel.js';
import MantenimientoDTO from '../dtos/manttoDTO.js';


export const getAllMantto = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const { rows, totalRecords } = await Mantenimiento.findAll(parseInt(page), parseInt(limit));

        if (rows.length === 0) {
            return res.status(404).json({ message: "No se encontró ningún mantenimiento" });
        }

        const manttoDTO = rows.map(row => new MantenimientoDTO(row));

        res.json({
            data: manttoDTO,
            totalRecords,
            totalPages: Math.ceil(totalRecords / limit),
            currentPage: parseInt(page),
        });
    } catch (error) {
        next(error);
    }
};

export const getFilteredMantto = async (req, res) => {
    try {
        const { search = '', page = 1, limit = 10 } = req.query;
        const { rows, totalRecords } = await Mantenimiento.findFiltered(search, parseInt(page), parseInt(limit));

        if (rows.length === 0) {
            return res.status(404).json({ message: "No se encontró ningún mantenimiento" });
        }

        const manttoDTO = rows.map(row => new MantenimientoDTO(row));

        res.json({
            data: manttoDTO,
            totalRecords,
            totalPages: Math.ceil(totalRecords / limit),
            currentPage: parseInt(page),
        });
    } catch (error) {
        next(error);
    }
};
