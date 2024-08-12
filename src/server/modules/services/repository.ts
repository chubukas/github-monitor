import axios, { HttpStatusCode } from "axios";
import { config } from "../../config";
import { IResReq } from "../../utils";
import { Repository } from "../v1/Repository/repo.model";
import { fetchSaveCommit } from "./commit";
import { Commit } from "../v1/commit/model";

export interface IFetchRepository {
  owner: string;
  repo: string;
  page?: number;
  date?: string;
}

export const fetchRepository = async ({
  repo,
  owner,
}: IFetchRepository): Promise<IResReq> => {
  try {
    const repoUrl = `${config.GITHUB_API_BASE_URL}/repos/${owner}/${repo}`;

    // Fetch repository metadata
    const repoResponse = await axios.get(repoUrl);
    const repoData = repoResponse?.data;
    repoData.repoUrl = repoUrl;

    return {
      code: HttpStatusCode.Found,
      data: repoData,
      message: "Successful",
    };
  } catch (error) {
    console.log({ error });

    return {
      code: HttpStatusCode.InternalServerError,
      message: "There was a problem fetching!",
      data: {},
    };
  }
};

export const saveRepository = async ({ data }: IResReq): Promise<IResReq> => {
  try {
    await Repository.upsert({
      id: data.id,
      name: data.name,
      description: data.description,
      url: data.html_url,
      language: data.language,
      forksCount: data.forks_count,
      starsCount: data.stargazers_count,
      openIssuesCount: data.open_issues_count,
      watchersCount: data.watchers_count,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    });

    const response = await Repository.findOne({
      where: {
        name: data.name,
      },
      raw: true,
    });

    return {
      code: HttpStatusCode.Created,
      data: response,
      message: "Successful",
    };
  } catch (error) {
    console.log({ error });

    return {
      code: HttpStatusCode.InternalServerError,
      message: "There was a problem creating!",
      data: {},
    };
  }
};

export const getRepository = async (name: string): Promise<IResReq> => {
  try {
    const data = await Repository.findOne({
      where: {
        name,
      },
      include: [{ model: Commit }],
      order: [["createdAt", "DESC"]],
      raw: true,
    });

    if (!data) {
      return {
        code: HttpStatusCode.NoContent,
        message: "There was a problem creating!",
        data: {},
      };
    }

    return { code: HttpStatusCode.Found, data, message: "Successful" };
  } catch (error) {
    console.log({ error });

    return {
      code: HttpStatusCode.NoContent,
      message: "There was a problem creating!",
      data: {},
    };
  }
};
