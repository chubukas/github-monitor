import express from "express";
import { getCommits } from "./commits.controller";

const router = express.Router();

// GET
router.get("/particular/:repoName", getCommits);

router.get("/top-authors/:repoName", getCommits);

export default router;
