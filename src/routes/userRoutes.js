import { Router } from "express";
import userController from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.post('/', userController.criar);
userRoutes.put('/:id', userController.atualizar);
userRoutes.delete('/:id', userController.deletar);
userRoutes.get('/', userController.selecionar);
userRoutes.get('/:id', userController.selecionarPorId);

export default userRoutes;