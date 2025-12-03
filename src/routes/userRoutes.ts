import { Router } from "express";
import * as userController from '../controllers/UserController'
const app = Router();

app.post('/register', userController.register)
app.post('/login', userController.login)

export default app;