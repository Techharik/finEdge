import { Request, Response } from 'express';
import * as TransactionService from '../services/TransactionServices';
import { cacheService } from '../utils/cache';
import { Summary } from '../types/schema';
import { asyncHandler } from '../utils/asyncHandler';

const CACHE_TTL = 60;

export const getSummary = asyncHandler(async (req: Request, res: Response): Promise<void> => {

    const userId = req.user?.id;
    const cacheKey = `sum_${userId ?? 'all'}`;

    const cached = cacheService.get<Summary>(cacheKey);
    if (cached) {
        res.status(200).json({
            success: true,
            data: cached,
            cached: true
        });
        return;
    }

    const summary = await TransactionService.getSummary(userId);
    cacheService.set(cacheKey, summary, CACHE_TTL);

    res.status(200).json({
        success: true,
        data: summary,
        cached: false
    });

})
