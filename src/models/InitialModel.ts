import { promises as fs } from 'fs';
import path from 'path';
import { AppData } from '../types/schema';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'db.json');

async function ChechData(): Promise<void> {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        try {
            await fs.access(DATA_FILE);
        } catch {
            const initialData: AppData = {
                users: [],
                transactions: [],
                budgets: []
            };
            await fs.writeFile(DATA_FILE, JSON.stringify(initialData, null, 2));
        }
    } catch (error) {
        throw new Error(`Failed to initialize data file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export async function readData(): Promise<AppData> {
    await ChechData();
    try {
        const content = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(content) as AppData;
    } catch (error) {
        throw new Error(`Failed to read data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export async function writeData(data: AppData): Promise<void> {
    await ChechData();
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
        throw new Error(`Failed to write data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
