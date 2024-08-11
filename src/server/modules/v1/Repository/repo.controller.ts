import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import { getRepoCommit, saveRepoAndCommit } from "./repo.services";

export const saveRepo = async (req: Request, res: Response) => {
  try {
    const { owner, repo } = req.params;
    let page = req.query.page as unknown as number;
    let date = req.query.date as unknown as string;

    const { code, data, message } = await saveRepoAndCommit({
      owner,
      repo,
      page,
      date,
    });

    return res.status(code).json({ message, data });
  } catch (error) {
    console.log({ error });

    return res
      .status(HttpStatusCode.InternalServerError)
      .json({ message: "There was a problem", error });
  }
};

export const getRepo = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    const { code, data, message } = await getRepoCommit(name);

    return res.status(code).json({ message, data });
  } catch (error) {
    console.log({ error });

    return res
      .status(HttpStatusCode.InternalServerError)
      .json({ message: "There was a problem", error });
  }
};
