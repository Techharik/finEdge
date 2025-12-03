import { Router } from "express";
import * as TransactionController from '../controllers/TransactionController';
import { authMiddleware } from "../middlewares/auth";

const app = Router();

app.post('/', authMiddleware, TransactionController.createTransactionController);
app.get('/', authMiddleware, TransactionController.getAllTransaction);
app.get('/:id', authMiddleware, TransactionController.getTransactionSingle);
app.patch('/:id', authMiddleware, () => { });
app.delete('/:id', authMiddleware, TransactionController.deleteTransaction)
export default app;