import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { getSummary, summaryTrends } from "../controllers/SummaryController.js";

const app = Router();

app.get('/trends/total', authMiddleware, getSummary)
app.get('/trends/monthly', authMiddleware, summaryTrends);

export default app;