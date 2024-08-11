import "dotenv/config";

export const config = {
  postgres_server: String(process.env.POSTGRES_SERVER),
  postgres_port: Number(process.env.POSTGRES_PORT),
  postgres_username: String(process.env.POSTGRES_USERNAME),
  postgres_password: String(process.env.POSTGRES_PASSWORD),
  postgres_db: String(process.env.POSTGRES_DB),
  postgres_url: String(process.env.POSTGRES_URL),
  NODE_ENV: String(process.env.NODE_ENV),
  PORT: String(process.env.PORT),
  GITHUB_API_BASE_URL: String(process.env.GITHUB_API_BASE_URL),
  GIT_USER: String(process.env.GIT_USER),
  GIT_REPO: String(process.env.GIT_REPO),
};
