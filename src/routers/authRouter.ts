import {Router} from 'express';

import {signUp, signIn} from '../controllers/userController.js';
import {validateSchemaMiddleware} from '../middlewares/validateSchemaMiddleware.js';
import {UserSchema} from '../schemas/userSchema.js';

const authRouter = Router();

authRouter.post('/sign-up', validateSchemaMiddleware(UserSchema), signUp);
authRouter.post('/sign-in', signIn);

export default authRouter;