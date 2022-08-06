import Joi from 'joi';
import {CreateUser} from '../services/authService.js';

export const UserSchema = Joi.object<CreateUser>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required()
});