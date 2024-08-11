import { IDatabaseConfig } from "./database.interface";
import { config } from "../config";

export const databaseConfig: IDatabaseConfig = {
  development: {
    username: config.postgres_username,
    password: config.postgres_password,
    database: config.postgres_db,
    host: config.postgres_server,
    port: config.postgres_port,
    dialect: "postgres",
    protocol: "postgres",
    logging: false,
  },
  production: {
    username: config.postgres_username,
    password: config.postgres_password,
    database: config.postgres_db,
    host: config.postgres_server,
    // ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
    port: config.postgres_port,
    dialect: "postgres",
    protocol: "postgres",
    logging: false,
  },
};
