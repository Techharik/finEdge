import { Router } from "express";
import * as TransactionController from '../controllers/TransactionController.js';
import { authMiddleware } from "../middlewares/auth.js";

const app = Router();

app.post('/', authMiddleware, TransactionController.createTransactionController);
app.get('/', authMiddleware, TransactionController.getAllTransaction);
app.get('/:id', authMiddleware, TransactionController.getTransactionSingle);
app.patch('/:id', authMiddleware, TransactionController.updateTransaction);
app.delete('/:id', authMiddleware, TransactionController.deleteTransaction)
export default app;