import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { getSummary, summaryTrends } from "../controllers/SummaryController";

const app = Router();

app.get('/trends/total', authMiddleware, getSummary)
app.get('/trends/monthly', authMiddleware, summaryTrends);

export default app;