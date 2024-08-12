import { connectDatabase } from "../database";
import { Repository } from "../modules/v1/Repository/repo.model";
import { saveRepoAndCommit } from "../modules/v1/Repository/repo.services";

describe("GitHub Service", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  test("fetchRepositoryData stores repository data", async () => {
    const { code, data } = await saveRepoAndCommit({
      repo: "pageme",
      page: 1,
      owner: "chubukas",
    });

    const repo = await Repository.findOne({ where: { name: "pageme" } });
    expect(repo).toBeDefined();
    expect(repo?.url).toBe("https://github.com/chubukas/pageme");
    expect(code).toBe(201);
    expect(data?.commits).toBeDefined();
  });
});
