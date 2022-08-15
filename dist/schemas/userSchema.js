import Joi from 'joi';
export var UserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required()
});
