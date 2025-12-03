import { createTransaction, deleteTransaction, getTransactionById } from "../models/TransactionModel";
import { Transaction } from "../types/schema";
import { NotFoundError, ValidationError } from "../utils/errorHandler";
import { v4 as uuidv4 } from 'uuid';


export const createTransationServices = async (data: any) => {
    const { userId, type, amount, category, description } = data;
    if (amount <= 0) {
        throw new ValidationError('Amount should be greater than 0');
    }
    if (type! == "income" && type !== "expense") {
        throw new ValidationError('Type must be either income or expense')
    }
    const newTransaction: Transaction = {
        id: uuidv4(),
        userId,
        type, amount, category, date: new Date().toISOString(), ...(description !== undefined && { description })
    }
    return await createTransaction(newTransaction)
}
export const deleteTransationServices = async (data: any) => {
    //find the document exists
    const { id, userId } = data;

    if (!id || !userId) {
        throw new Error('Ivalid id or userId')
    }
    const exists = await getTransactionById(id, userId);

    if (!exists) {
        throw new NotFoundError('transaction not exists in documents')
    }

    const result = await deleteTransaction(id);
    return result
}