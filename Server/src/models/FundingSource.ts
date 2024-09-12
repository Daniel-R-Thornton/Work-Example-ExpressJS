import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class FundingSource extends Model {
  public id!: string;
  public name!: string;
}

FundingSource.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "funding_sources",
  }
);

export default FundingSource;
