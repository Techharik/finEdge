import { getAllTransationsUserId } from "../models/TransactionModel";
import { Summary } from "../types/schema";
import { ValidationError } from "../utils/errorHandler";

export async function getMonthlyTrends(userId: string) {


    const userTxns = await getAllTransationsUserId(userId)

    const trendMap: Record<string, { income: number; expense: number }> = {};

    for (const t of userTxns) {
        const date = new Date(t.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

        if (!trendMap[monthKey]) {
            trendMap[monthKey] = { income: 0, expense: 0 };
        }

        trendMap[monthKey][t.type] += t.amount;
    }


    return Object.entries(trendMap).map(([month, values]) => ({
        month,
        ...values
    }));
}


export async function getTotalSummary(userId?: string): Promise<Summary> {
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