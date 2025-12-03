import { createTransaction, deleteTransaction, getAllTransationsUserId, getTransactionById, updateTransaction } from "../models/TransactionModel";
import { Summary, Transaction } from "../types/schema";
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

export const updateTransactionServices = async (data: any) => {
    const { id, userId, body } = data;

    if (!id || !userId) {
        throw new ValidationError('Invalid id and userId')
    }
    if (body.amount !== undefined && body.amount <= 0) {
        throw new ValidationError('Amount must be creater than 0')
    }
    const transaction = await updateTransaction(id, userId, { ...body })
    return transaction
}

export async function getSummary(userId?: string): Promise<Summary> {
    if (!userId) {
        throw new ValidationError('userId not existed')
    }
    const transactions = await getAllTransationsUserId(userId);

    const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);

    return {
        totalIncome,
        totalExpenses,
        balance: totalIncome - totalExpenses,
        transactionCount: transactions.length,
    };
}