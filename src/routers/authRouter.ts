import {Router} from 'express';

import {signUp, signIn, getUserById, updateUser, deleteUser} from '../controllers/authController.js';
import {validateSchemaMiddleware} from '../middlewares/validateSchemaMiddleware.js';
import {UserSchema} from '../schemas/userSchema.js';

const authRouter = Router();

authRouter.post('/sign-up', validateSchemaMiddleware(UserSchema), signUp);
authRouter.post('/sign-in', signIn);
authRouter.get('/user/:id', getUserById);
authRouter.put('/user/update/:id', updateUser);
authRouter.delete('/user/delete/:id', deleteUser);

export default authRouter;