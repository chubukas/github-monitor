import { sequelize } from "./database.connection";

export { sequelize };

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate(); // Check if the connection is successful
    await sequelize.sync({ force: true });
    console.log(`Database connection established and synced`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
