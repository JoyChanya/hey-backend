// src/index.ts
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import reviewRouter from "./routes/review.routes";  

const app = express();
const PORT = parseInt(process.env.PORT || "4000", 10);

app.use(cors());
app.use(express.json());

// Mount the single router under /api/reviews
app.use("/api/reviews", reviewRouter);

app.get("/", (_req: Request, res: Response) => {
  res.json({ status: "OK", message: "HeyBackend is running" });
});

// 404 handler
app.use((_req, res) => res.status(404).json({ error: "Not Found" }));

// Global error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () =>
  console.log(`🟢 Server listening on http://localhost:${PORT}`)
);
