import { Request, Response, NextFunction } from "express"
import { asyncHandler } from "../utils/asyncHandler.js"
import { loginValidation, RegisterUserValidation } from "../middlewares/validatior.js";
import { ValidationError } from "../utils/errorHandler.js";
import { loginUserService, registerUserService } from "../services/UserServices.js";


const register = asyncHandler(async (req: Request, res: Response) => {
    const raw = req.body;

    const dto = RegisterUserValidation.safeParse(raw);

    if (!dto.success) {
        const msg = dto.error.issues[0].message
        throw new ValidationError(msg)
    }
    const result = await registerUserService(dto.data)

    return res.status(200).json({
        status: 'success',
        data: result
    })
})


const login = asyncHandler(async (req: Request, res: Response) => {
    const dto = loginValidation.safeParse(req.body);

    if (!dto.success) {
        const msg = dto.error.issues[0].message
        throw new ValidationError(msg)
    }

    const result = await loginUserService(dto.data);

    return res.status(200).json({
        status: "success",
        data: result
    })
});



export {
    register, login
}