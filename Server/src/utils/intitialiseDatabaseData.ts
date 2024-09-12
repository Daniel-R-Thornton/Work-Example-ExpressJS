import sequelize from "../config/database";

import FundingSource from "../models/FundingSource";

export async function insertDefaultData() {
  try {
    // Sync models (creates tables if they don't exist)
    await sequelize.sync({ force: false });

    // NDIS, HCP, CHSP, DVA, HACC

    await Promise.all([
      FundingSource.findOrCreate({
        where: { name: "NDIS" },
        defaults: { name: "NDIS", id: 1 },
      }),

      FundingSource.findOrCreate({
        where: { name: "HCP" },
        defaults: { name: "HCP", id: 2 },
      }),

      FundingSource.findOrCreate({
        where: { name: "CHSP" },
        defaults: { name: "CHSP", id: 3 },
      }),

      FundingSource.findOrCreate({
        where: { name: "DVA" },
        defaults: { name: "DVA", id: 4 },
      }),

      FundingSource.findOrCreate({
        where: { name: "HACC" },
        defaults: { name: "HACC", id: 5 },
      }),
    ]);
  } catch (error) {
    console.error("Error inserting default data:", error);
  }
}

export default insertDefaultData;
