import { Request, Response, NextFunction } from "express"
import { asyncHandler } from "../utils/asyncHandler"
import { RegisterUserValidation } from "../middlewares/validatior";
import { ValidationError } from "../utils/errorHandler";


const register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const raw = req.body;

    const dto = RegisterUserValidation.safeParse(raw);

    if (!dto.success) {
        const msg = dto.error.issues[0].message

        throw new ValidationError(msg)
    }
})