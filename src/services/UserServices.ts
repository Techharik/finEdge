import bcrypt from "bcrypt"
import { ConflictError } from "../utils/errorHandler";
import { User } from "../types/schema";

const registerUserService = async (data: any) => {
    const { name, email, password } = data;

    const existed = //find user based on email

    if (existed) {
        throw new ConflictError('Email already exist , try login')
    }

    //hash password
    const hasedPassword = await bcrypt.hash(password, 10);

    const user: User = {
        id: //randomId,
            name, email,
        password: hasedPassword,
        createdAt: new Date()
    }
    const result = // save to file

    return result;
}