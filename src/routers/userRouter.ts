import {Router} from 'express';

import {getUserById, updateUser, deleteUser} from '../controllers/userController.js';

const userRouter = Router();

userRouter.get('/user/:id', getUserById);
userRouter.put('/user/update/:id', updateUser);
userRouter.post('/user/delete/:id', deleteUser);

export default userRouter;