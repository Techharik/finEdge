import { User } from "../types/schema";
import { readData, writeData } from "./InitialModel";


export async function createUser(user: User): Promise<User> {
    const data = await readData();
    data.users.push(user);
    await writeData(data);
    return user;
}

export async function getUserById(id: string): Promise<User | null> {
    const data = await readData();
    return data.users.find(u => u.id === id) ?? null
}

export async function getUserByEmail(email: string): Promise<User | null> {
    const data = await readData();
    return data.users.find(u => u.email === email) ?? null
};

export async function getAllUsers(): Promise<User[]> {
    const data = await readData();
    return data.users
}