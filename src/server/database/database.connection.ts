import { Sequelize } from "sequelize";
import { databaseConfig } from "./database.config";
import { config } from "../config";

const DBConnection = () => {
  try {
    let connection;
    // const logger = new Logger('DatabaseProvider');
    console.log("Database Connection....");

    switch (config.NODE_ENV) {
      case "development":
        connection = databaseConfig.development;
        break;
      case "production":
        connection = databaseConfig.production;
        break;
      default:
        connection = databaseConfig.development;
    }
    // uncomment this to stop sequelize logs
    // config.logging = true;
    const sequelize = new Sequelize(connection as unknown as string);
    return sequelize;
  } catch (error: any) {
    console.log(error);
    console.error(`Error: `, {
      name: error.name,
      message: error.message,
    });
    process.exit(1);
  }
};

export const sequelize = DBConnection();
