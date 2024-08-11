import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../../database"; // your sequelize instance

export class Repository extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public url!: string;
  public language!: string;
  public forksCount!: number;
  public starsCount!: number;
  public openIssuesCount!: number;
  public watchersCount!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Repository.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING,
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    language: DataTypes.STRING,
    forksCount: DataTypes.INTEGER,
    starsCount: DataTypes.INTEGER,
    openIssuesCount: DataTypes.INTEGER,
    watchersCount: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "Repository",
  }
);
