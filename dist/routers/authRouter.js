import { Router } from 'express';
import { signUp, signIn } from '../controllers/authController.js';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js';
import { UserSchema } from '../schemas/userSchema.js';
var authRouter = Router();
authRouter.post('/sign-up', validateSchemaMiddleware(UserSchema), signUp);
authRouter.post('/sign-in', signIn);
export default authRouter;
