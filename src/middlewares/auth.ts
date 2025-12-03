import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/config";
import { NotFoundError } from "../utils/errorHandler";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    // Try Authorization header first
    if (!JWT_SECRET) {
        throw new NotFoundError('SECRET NOT FOUND')
    }
    const authHeader = req.headers['authorization'] || '';
    let token = null;
    if (authHeader) {
        const [scheme, credentials] = authHeader.split(' ');
        if (scheme === 'Bearer' && credentials) {
            token = credentials;
        }
    }


    if (!token && req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ status: 'error', error: 'Unauthorized , Login to continue' });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET) as any;
        req.user = { id: payload?.id, email: payload?.email };
        return next();
    } catch (_err) {
        return res.status(401).json({ status: 'error', error: 'Invalid token , Relogin to continue' });
    }
}
