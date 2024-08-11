import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import { getAuthorsService, getCommitService } from "./commits.service";

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

export const getAuthorsCommits = async (req: Request, res: Response) => {
  try {
    const { repoName } = req.params;

    const { code, data, message } = await getAuthorsService(repoName);

    return res.status(code).json({ message, data });
  } catch (error) {
    console.log({ error });

    return res
      .status(HttpStatusCode.InternalServerError)
      .json({ message: "There was a problem", error });
  }
};
