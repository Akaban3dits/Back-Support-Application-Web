import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { jwtSecret } from '../config/config.js';
import { LoginRequestDTO, LoginResponseDTO } from '../dtos/authDTO.js';

/**
 * Iniciar sesión
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const login = async (req, res, next) => {
    try {
        const loginRequest = new LoginRequestDTO(req.body);

        const user = await User.findByEmail(loginRequest.email);

        if (!user) {
            return res.status(401).json({ error: 'El correo y la contraseña son incorrectos' });
        }

        if (user.sts_user === false) {
            return res.status(401).json({ error: 'La cuenta está inactiva' });
        }

        const isMatch = await bcrypt.compare(loginRequest.password, user.pass_user);

        if (!isMatch) {
            return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
        }

        const token = jwt.sign(
            { id_user: user.id_user, role: user.rol_user },
            jwtSecret,
            { expiresIn: '1h' }
        );

        const loginResponse = new LoginResponseDTO({ token });

        res.json(loginResponse);

    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        next(error);
    }
};
