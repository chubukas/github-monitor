import { HttpStatusCode } from "axios";
import {
  getServiceCommits,
  ServiceCommitsTotalAuthors,
} from "../../services/commit";

export const getCommitService = async (name: string) => {
  try {
    const { data, code, message } = await getServiceCommits(name);

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

export const getAuthorsService = async (name: string) => {
  try {
    const { data, code, message } = await ServiceCommitsTotalAuthors(name);

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
