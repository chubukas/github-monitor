import express from "express";
import {
  getAuthorsCommitsByRepo,
  getCommits,
  getMostAuthorsCommits,
} from "./commits.controller";

const router = express.Router();

// GET
router.get("/repo/:repoName", getCommits);

router.get("/top-authors", getMostAuthorsCommits);

router.get("/repo-top-authors/:repoName", getAuthorsCommitsByRepo);

export default router;
