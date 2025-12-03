import { Request, Response } from "express"
import { createTransactionValidation } from "../middlewares/validatior"
import { ValidationError } from "../utils/errorHandler";
import { getAllTransationsUserId, getTransactionById } from "../models/TransactionModel";
import { v4 as uuidv4 } from 'uuid';
import { createTransationServices, deleteTransationServices, updateTransactionServices } from "../services/TransactionServices";
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
    const { type, min, max, cate } = req.query;

    if (!useId) {
        throw new Error('user not found')
    }
    let transaction = await getAllTransationsUserId(useId);

    if (type) {
        transaction = transaction.filter(t => t.type === type)
    };

    if (min) {
        transaction = transaction.filter(t => t.amount >= Number(min))
    }
    if (max) {
        transaction = transaction.filter(t => t.amount <= Number(max))
    }

    if (cate) {
        transaction = transaction.filter(t => t.category === cate)
    }

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


const updateTransaction = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const userId = req.user?.id
    const body = req.body

    const result = await updateTransactionServices({ id, userId, body })

    return res.status(200).json({
        status: 'success',
        data: result
    })
});




export {
    createTransactionController,
    getAllTransaction,
    getTransactionSingle,
    deleteTransaction,
    updateTransaction
}

