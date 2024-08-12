import axios, { HttpStatusCode } from "axios";
import { config } from "../../config";
import { IResReq } from "../../utils";
import { Repository } from "../v1/Repository/repo.model";
import { Commit } from "../v1/commit/model";
import { getRepository } from "./repository";
import { sequelize } from "../../database";

export interface ICommit {
  page: number;
  repoUrl: string;
  repoData?: any;
  date?: string;
}

interface CommitData {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

export interface ICommitSave {
  message: string;
  author: any;
  date: Date;
  html_url: string;
  repositoryId: string;
}

export const fetchCommit = async ({
  page,
  repoUrl,
  date,
}: ICommit): Promise<IResReq> => {
  try {
    const commitUrl = `${repoUrl}/commits`;

    let commits: CommitData[] = [];
    let commitsResponse;
    // Fetch repository metadata

    if (date) {
      const START_DATE = new Date(date).toISOString();
      commitsResponse = await axios.get(commitUrl, {
        params: { since: START_DATE },
      });
    } else {
      commitsResponse = await axios.get(commitUrl, {
        params: { per_page: 100, page },
      });
    }

    commits = commitsResponse?.data;

    return { code: HttpStatusCode.Found, data: commits, message: "Successful" };
  } catch (error) {
    console.log({ error });

    return {
      code: HttpStatusCode.InternalServerError,
      message: "There was a problem fetching commits!",
      data: {},
    };
  }
};

export const saveCommit = async ({
  message,
  author,
  date,
  html_url,
  repositoryId,
}: ICommitSave) => {
  try {
    await Commit.upsert({
      message,
      author,
      date,
      url: html_url,
      repositoryId: repositoryId,
    });

    return {
      code: HttpStatusCode.Created,
      data: {
        message,
        author,
        date,
        html_url,
        repositoryId,
      },
      message: "Successful",
    };
  } catch (error) {
    console.log({ error });

    return {
      code: HttpStatusCode.InternalServerError,
      message: "There was a problem save Commit!",
      data: {},
    };
  }
};

export const fetchSaveCommit = async ({
  page,
  repoUrl,
  repoData,
  date,
}: ICommit) => {
  try {
    if (!repoData) {
      return {
        code: HttpStatusCode.InternalServerError,
        message: "There was a no repo data!",
        data: {},
      };
    }

    const allCommits = [];
    let commits: CommitData[] = [];
    do {
      const { code, data, message } = await fetchCommit({
        page,
        repoUrl,
        date,
      });

      if (code === HttpStatusCode.InternalServerError) {
        return {
          code,
          message,
          data: {},
        };
      }

      const repositoryId: any = await Repository.findOne({
        where: { url: repoData.url },
      });

      for (const commit of data) {
        const { sha, commit: commitDetails, html_url } = commit;
        const { message, author } = commitDetails;
        const date = new Date(author.date);

        const oldMessage = await Commit.findOne({
          where: { message },

          raw: true,
        });

        if (oldMessage?.message !== message) {
          await saveCommit({
            message,
            author: author.name,
            date,
            html_url,
            repositoryId: repositoryId.id,
          });
        }
        allCommits.push({
          message,
          author: author.name,
          date,
          html_url,
          repositoryId: repositoryId.id,
        });
      }

      page++;
    } while (commits.length > 0);

    return {
      code: HttpStatusCode.Created,
      message: "Successful!",
      data: allCommits,
    };
  } catch (error) {
    console.log({ error });

    return {
      code: HttpStatusCode.InternalServerError,
      message: "There was a problem fetching commit!",
      data: {},
    };
  }
};

export const getServiceCommits = async (name: string): Promise<IResReq> => {
  try {
    const { data, code, message } = await getRepository(name);
    if (code !== HttpStatusCode.Found) {
      return {
        code,
        message,
        data: {},
      };
    }

    const res = await Commit.findAll({
      where: {
        repositoryId: data.id,
      },

      order: [["createdAt", "DESC"]],
    });

    return { code: HttpStatusCode.Found, data: res, message: "Successful" };
  } catch (error) {
    console.log({ error });

    return {
      code: HttpStatusCode.NoContent,
      message: "There was a problem creating!",
      data: {},
    };
  }
};

export const ServiceCommitsTotalAuthors = async (
  name: string
): Promise<IResReq> => {
  try {
    const { data, code, message } = await getRepository(name);

    if (code !== HttpStatusCode.Found) {
      return {
        code,
        message,
        data: {},
      };
    }

    const authors = await Commit.findAll({
      attributes: [
        "author",
        [sequelize.fn("COUNT", sequelize.col("author")), "count"],
      ],
      where: {
        repositoryId: data?.id,
      },
      group: "author",
      order: [[sequelize.fn("COUNT", sequelize.col("author")), "DESC"]],
    });

    return { code: HttpStatusCode.Found, data: authors, message: "Successful" };
  } catch (error) {
    console.log({ error });

    return {
      code: HttpStatusCode.NoContent,
      message: "There was a problem creating!",
      data: {},
    };
  }
};
