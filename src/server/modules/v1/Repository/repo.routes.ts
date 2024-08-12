import express from "express";
import { saveRepo, getRepo } from "./repo.controller";

const router = express.Router();

// GET
router.get("/stored/:name", getRepo);

// POST
router.get("/fresh/:owner/:repo", saveRepo);

export default router;
