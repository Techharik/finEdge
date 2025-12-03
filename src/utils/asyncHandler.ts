import { Request, Response, NextFunction } from "express";
import { AppError } from "./errorHandler";
import { success } from "zod";
import { logger } from "../middlewares/logger";

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>

export const asyncHandler =
    (fn: AsyncHandler) => async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (err: any) {
            console.log("Error caught:", err);

            if (err instanceof AppError) {
                logger.error(err.message, { code: err.statusCode })
                return res.status(err.statusCode).json({
                    status: "error",
                    message: err.message,
                });
            }


            if (err.code === 11000) {
                logger.error("Duplicate resource", { code: 409 })
                return res.status(409).json({
                    status: "fail",
                    message: "Duplicate resource",
                    field: Object.keys(err.keyValue)[0],
                    value: err.keyValue,
                });
            }

            if (err instanceof SyntaxError) {
                logger.error("Invalid JSON payload", { code: 400 })
                return res.status(400).json({
                    status: "fail",
                    message: "Invalid JSON payload",
                });
            }
            //mongo db error cast
            if (err.name === "CastError") {
                return res.status(400).json({
                    status: "fail",
                    message: "Invalid ID format",
                });
            }
            next(err);
        }
    };