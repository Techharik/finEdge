import { Request, Response, NextFunction } from "express"
import { asyncHandler } from "../utils/asyncHandler"
import { loginValidation, RegisterUserValidation } from "../middlewares/validatior";
import { ValidationError } from "../utils/errorHandler";
import { loginUserService, registerUserService } from "../services/UserServices";


const register = asyncHandler(async (req: Request, res: Response) => {
    const raw = req.body;

    const dto = RegisterUserValidation.safeParse(raw);

    if (!dto.success) {
        const msg = dto.error.issues[0].message
        throw new ValidationError(msg)
    }
    const result = await registerUserService(dto)

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

    const result = await loginUserService(dto);

    return res.status(200).json({
        status: "success",
        data: result
    })
});



export {
    register, login
}