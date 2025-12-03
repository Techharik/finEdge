import { Request, Response } from "express"
import { createTransactionValidation } from "../middlewares/validatior"
import { ValidationError } from "../utils/errorHandler";
import { getAllTransationsUserId, getTransactionById } from "../models/TransactionModel";
import { v4 as uuidv4 } from 'uuid';
import { createTransationServices, deleteTransationServices } from "../services/TransactionServices";
import { asyncHandler } from "../utils/asyncHandler";


const createTransactionController = asyncHandler(async (req: Request, res: Response) => {
    const data = {
        ...req.body,
        userId: req.user?.id
    };

    const dto = createTransactionValidation.safeParse(data);
    if (!dto.success) {
        const msg = dto.error.issues[0].message
        throw new ValidationError(msg)
    }

    const result = await createTransationServices(data)
    return res.status(201).json({
        status: 'success',
        data: result
    })
})

const getAllTransaction = asyncHandler(async (req: Request, res: Response) => {
    const useId = req.user?.id;
    if (!useId) {
        throw new Error('user not found')
    }
    const transaction = await getAllTransationsUserId(useId);
    return res.status(200).json({
        status: 'success',
        data: transaction
    })
})


const getTransactionSingle = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const userId = req.user?.id

    const transaction = await getTransactionById(id, userId);
    res.status(200).json({
        status: 'success',
        data: transaction
    })
});
const deleteTransaction = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const userId = req.user?.id

    const result = await deleteTransationServices({ id, userId })

    return res.status(200).json({
        status: 'success',
        data: result
    })
});




export {
    createTransactionController,
    getAllTransaction,
    getTransactionSingle,
    deleteTransaction
}

