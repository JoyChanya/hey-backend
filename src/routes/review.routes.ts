// src/routes/review.routes.ts
import { Router } from "express";
import { createReview, listReviews } from "../controllers/review.controller";

const router = Router();

// POST   /api/reviews/
router.post("/", createReview);

// GET    /api/reviews/
router.get("/", listReviews);

//router.get("/test", )

export default router;
