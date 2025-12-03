import { Transaction } from "../types/schema.js";
import { readData, writeData } from "./InitialModel.js";



export async function createTransaction(transaction: Transaction): Promise<Transaction> {
    const data = await readData();
    data.transactions.push(transaction);
    await writeData(data);
    return transaction;
}

export async function getTransactionById(
    id: string,
    userId: string
): Promise<Transaction | null> {
    const data = await readData();

    const transaction = data.transactions.find(
        t => t.id === id && t.userId === userId
    );

    return transaction ?? null;
}

export async function getAllTransationsUserId(userId: string): Promise<Transaction[]> {
    const data = await readData();
    const transactions = data.transactions.filter(t => t.userId === userId)
    return transactions;
}
export async function updateTransaction(id: string, userId: string, updates: Partial<Transaction>): Promise<Transaction | null> {
    const data = await readData();
    const index = data.transactions.findIndex(t => t.id === id && t.userId === userId);
    if (index === -1) {
        return null;
    }
    data.transactions[index] = { ...data.transactions[index]!, ...updates };
    await writeData(data);
    return data.transactions[index]!;
}


export async function deleteTransaction(id: string): Promise<boolean> {
    const data = await readData();
    const index = data.transactions.findIndex(t => t.id === id);
    if (index === -1) {
        return false;
    }
    data.transactions.splice(index, 1);
    await writeData(data);
    return true;
}