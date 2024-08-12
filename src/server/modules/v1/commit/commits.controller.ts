import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import {
  getAuthorsService,
  getCommitService,
  getMostCommitAuthorsService,
} from "./commits.service";

export const getCommits = async (req: Request, res: Response) => {
  try {
    const { repoName } = req.params;

    const { code, data, message } = await getCommitService(repoName);

    return res.status(code).json({ message, data });
  } catch (error) {
    console.log({ error });

    return res
      .status(HttpStatusCode.InternalServerError)
      .json({ message: "There was a problem", error });
  }
};

export const getAuthorsCommitsByRepo = async (req: Request, res: Response) => {
  try {
    const { repoName } = req.params;

    const { code, data, message } = await getAuthorsService(repoName);

    return res.status(code).json({ code, message, data });
  } catch (error) {
    console.log({ error });

    return res
      .status(HttpStatusCode.InternalServerError)
      .json({ message: "There was a problem", error });
  }
};

export const getMostAuthorsCommits = async (req: Request, res: Response) => {
  try {
    const { code, data, message } = await getMostCommitAuthorsService();

    return res.status(code).json({ code, message, data });
  } catch (error) {
    console.log({ error });

    return res
      .status(HttpStatusCode.InternalServerError)
      .json({ message: "There was a problem", error });
  }
};
