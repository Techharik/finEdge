export interface User {
    id: string,
    name: string,
    email: string,
    password: string,
    createdAt: Date,
}
export type TransactionType = "income" | "expense"
export interface Transaction {
    id: string;
    userId: string;
    type: TransactionType;
    category: string;
    amount: number;
    date: string;
    description?: string;
}

export interface Budget {
    id: string;
    userId: string;
    monthlyGoal: number;
    savingsTarget: number;
    month: string;
}

export interface Summary {
    totalIncome: number;
    totalExpenses: number;
    balance: number;
    transactionCount: number;
}

export interface AppData {
    users: User[];
    transactions: Transaction[];
    budgets: Budget[];
}