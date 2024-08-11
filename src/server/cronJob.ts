import cron from "node-cron";
import { saveRepoAndCommit } from "./modules/v1/Repository/repo.services";
import { config } from "./config";

// Configure cron job to run every hour
export const cronJob = () => {
  cron.schedule("0 * * * *", async () => {
    console.log("CronJob Fetching repository data...");
    const { code } = await saveRepoAndCommit({
      owner: config.GIT_USER,
      repo: config.GIT_REPO,
      page: 1,
    });

    console.log({ code });
  });
};
