import express, { NextFunction, Request, Response } from "express";

import repoRoute from "./Repository/repo.routes";
import commitRoute from "./commit/commit.route";

const router = express.Router();

// Test Route
router.get(`/`, (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).send("Welcome To GitHub Monitor Api version one");
});

router.use("/repo", repoRoute);
router.use("/repo", commitRoute);

export default router;
