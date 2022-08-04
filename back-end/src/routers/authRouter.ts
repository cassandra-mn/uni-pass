import {Router} from 'express';

import {signUp, signIn, updateUser, deleteUser} from '../controllers/authController.js';
import {validateSchemaMiddleware} from '../middlewares/validateSchemaMiddleware.js';
import {UserSchema} from '../schemas/userSchema.js';

const authRouter = Router();

authRouter.post('/sign-up', validateSchemaMiddleware(UserSchema), signUp);
authRouter.post('/sign-in', signIn);
authRouter.put('/user/update/:id', validateSchemaMiddleware(UserSchema), updateUser);
authRouter.delete('/user/delete/:id', deleteUser);

export default authRouter;