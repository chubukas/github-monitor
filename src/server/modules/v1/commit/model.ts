import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../../database"; // your sequelize instance
import { Repository } from "../Repository/repo.model";

export class Commit extends Model {
  public id!: number;
  public message!: string;
  public author!: string;
  public date!: Date;
  public url!: string;
  public repositoryId!: number;
}

Commit.init(
  {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    repositoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: Repository,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Commit",
  }
);

Repository.hasMany(Commit, { foreignKey: "repositoryId" });
Commit.belongsTo(Repository, { foreignKey: "repositoryId" });
