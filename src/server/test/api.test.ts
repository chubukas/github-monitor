import { sequelize } from "../database";
import { Repository } from "../modules/v1/Repository/repo.model";
import { saveRepoAndCommit } from "../modules/v1/Repository/repo.services";

describe("GitHub Service", () => {
  beforeAll(async () => {
    try {
      await sequelize.authenticate(); // Check if the connection is successful
      await sequelize.sync({ force: true });
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
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
