import express from "express";
import { saveRepo, getRepo } from "./repo.controller";

const router = express.Router();

// GET
router.get("/particular/:name", getRepo);

// POST
router.post("/particular/:owner/:repo", saveRepo);

export default router;
