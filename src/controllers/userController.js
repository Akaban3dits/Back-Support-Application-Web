import User from '../models/userModel.js';
import UserDTO from '../dtos/userDTO.js';

export const getUser = async (req, res) => {
    try {
        const users = await User.findAll();
        if (users.length === 0) {
            return res.status(404).json({ message: "No se encontró ningún usuario" });
        }
        const usersDTO = users.map(user => new UserDTO(user));
        res.json(usersDTO);
    } catch (error) {
        next(error);
    }
};

export const getUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "No se encontró ningún usuario" });
        }
        const userDTO = new UserDTO(user);
        res.json(userDTO);
    } catch (error) {
        next(error);
    }
};

export const createUser = async (req, res) => {
    try {
        const { email } = req.body;
        const existingEmail = await User.findByEmail(email);
        if (existingEmail) {
            return res.status(400).json({ error: 'Ya existe un usuario con ese correo' });
        }
        const user = await User.create(req.body);
        const userDTO = new UserDTO(user);
        res.status(201).json(userDTO);
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        const user = await User.update(id, req.body);
        const userDTO = new UserDTO(user);
        res.status(200).json({ message: "Usuario actualizado correctamente", user: userDTO });
    } catch (error) {
        next(error);
    }
};

export const deletelogicUser = async (req, res) => {
    try {
        const { id } = req.params;
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        await User.softDelete(id);
        res.status(200).json({ message: "Usuario marcado como inactivo correctamente" });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        await User.delete(id);
        res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        next(error);
    }
};
