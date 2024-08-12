import express from "express";
import { getFreshRepo, getRepo } from "./repo.controller";

const router = express.Router();

// GET
router.get("/stored/:name", getRepo);

// POST
router.get("/fresh/:owner/:repo", getFreshRepo);

export default router;
