import jwt from "jsonwebtoken"
import { JWT_TIME, JWT_SECRET } from "../config/config";

export const createToken = (user: any) => {
    if (!JWT_SECRET) return undefined;
    if (!JWT_TIME) return undefined;


    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        JWT_SECRET!,
        { expiresIn: JWT_TIME }
    )
    return token

}