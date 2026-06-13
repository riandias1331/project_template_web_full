import { Router } from 'express';
const route: Router = Router();

import { getUserAll, getUser, createUser, updateUser, deleteUser, deleteUserAll } from '../controllers/userController'
import * as auth from '../middlewares/authMiddleware'; // Middleware que verifica JWT

route.get('/users', auth.authMiddleware, getUserAll); 
route.get('/users/:id', auth.authMiddleware, getUser); 
route.post('/users', createUser);  
route.put('/users/:id', auth.authMiddleware, updateUser); 
route.delete('/users/:id', auth.authMiddleware, deleteUser); 
route.delete('/users', auth.authMiddleware, deleteUserAll); 


export default route;