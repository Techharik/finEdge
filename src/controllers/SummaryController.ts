import { Request, Response } from 'express';
import { cacheService } from '../utils/cache.js';
import { Summary } from '../types/schema.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getMonthlyTrends, getTotalSummary } from '../services/summaryServices.js';
import { NotFoundError } from '../utils/errorHandler.js';

const CACHE_TTL = 60;

export const getSummary = asyncHandler(async (req: Request, res: Response): Promise<void> => {

    const userId = req.user?.id;
    const cacheKey = `sum_${userId ?? 'all'}`;

    const cached = cacheService.get<Summary>(cacheKey);
    if (cached) {
        res.status(200).json({
            status: "success",
            data: cached,
            cached: true
        });
        return;
    }

    const summary = await getTotalSummary(userId);
    cacheService.set(cacheKey, summary, CACHE_TTL);

    res.status(200).json({
        status: 'success',
        data: summary,
        cached: false
    });

})

export const summaryTrends = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new NotFoundError('userId not found')
    }
    const cacheKey = `trends_${userId ?? 'all'}`;

    const cached = cacheService.get<Summary>(cacheKey);
    if (cached) {
        res.status(200).json({
            status: "success",
            data: cached,
            cached: true
        });
        return;
    }
    const trends = await getMonthlyTrends(userId);
    cacheService.set(cacheKey, trends, CACHE_TTL);

    return res.json({
        status: 'success',
        data: trends
    })
})