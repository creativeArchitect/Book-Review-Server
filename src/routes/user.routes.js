import { Router } from "express";

import { register, login, logout } from '../controllers/user.controller.js';

const userRoutes = Router();

userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.post('/logout', logout);

export default userRoutes;
