import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import FundingSource from "./FundingSource";

class Client extends Model {
  public id!: string;
  public name!: string;
  public dateOfBirth!: Date;
  public mainLanguage!: string;
  public secondaryLanguage?: string;
  public fundingSourceId!: string;
}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    mainLanguage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secondaryLanguage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fundingSourceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "clients",
  }
);

// Define associations after models are initialized
Client.belongsTo(FundingSource, {
  foreignKey: "fundingSourceId",
  as: "fundingSource",
});

FundingSource.hasMany(Client, {
  foreignKey: "fundingSourceId",
  as: "clients",
});

export default Client;
