import { HttpStatusCode } from "axios";
import {
  fetchRepository,
  getRepository,
  IFetchRepository,
  saveRepository,
} from "../../services/repository";
import { fetchSaveCommit } from "../../services/commit";

export const saveRepoAndCommit = async ({
  repo,
  page = 1,
  date,
  owner,
}: IFetchRepository) => {
  try {
    const { data, code, message } = await fetchRepository({ repo, owner });

    if (code !== HttpStatusCode.Found) {
      return {
        code,
        message,
        data: {},
      };
    }

    const repos = await saveRepository({ data, code, message });

    if (repos.code === HttpStatusCode.InternalServerError) {
      return {
        code: repos.code,
        message: repos.message,
        data: repos.data,
      };
    }

    const commitRes = await fetchSaveCommit({
      page: page as number,
      repoUrl: data.repoUrl,
      repoData: repos.data,
      date,
    });

    if (commitRes.code !== HttpStatusCode.Created) {
      return {
        code: commitRes.code,
        message: commitRes.message,
        data: {},
      };
    }

    const returnData = repos.data;
    returnData.commits = commitRes.data;

    return {
      code: HttpStatusCode.Created,
      message: "Successful",
      data: returnData,
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

export const getRepoCommit = async (name: string) => {
  try {
    const { data, code, message } = await getRepository(name);

    if (code === HttpStatusCode.NoContent) {
      return {
        code,
        message,
        data: {},
      };
    }

    return {
      code,
      message,
      data,
    };
  } catch (error) {
    console.log({ error });

    return {
      code: HttpStatusCode.InternalServerError,
      message: "There was a problem!",
      data: {},
    };
  }
};
