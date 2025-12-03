import bcrypt from "bcrypt"
import { ConflictError, NotFoundError, ValidationError } from "../utils/errorHandler";
import { User } from "../types/schema";
import { createUser, getUserByEmail } from "../models/UserModel";
import { v4 as uuidv4 } from 'uuid';
import { createToken } from "../utils/jwt";

export const registerUserService = async (data: any) => {
    const { name, email, password } = data;

    const existed = await getUserByEmail(email)

    if (existed) {
        throw new ConflictError('Email already exist , try login')
    }

    //hash password
    const hasedPassword = await bcrypt.hash(password, 10);
    const uuid = uuidv4();
    const user: User = {
        id: uuid,
        name, email,
        password: hasedPassword,
        createdAt: new Date()
    }
    const result = await createUser(user)

    return result;
}

export const loginUserService = async (data: any) => {
    const { email, password } = data;

    const existed = await getUserByEmail(email);

    if (!existed) {
        throw new NotFoundError('Email Not found')
    }

    const comparePass = await bcrypt.compare(password, existed.password);

    if (!comparePass) {
        throw new ValidationError('Password is Incorrect');
    }

    const token = createToken(existed)
    return token;
}