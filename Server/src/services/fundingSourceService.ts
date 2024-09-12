import FundingSource from "../models/FundingSource";

export const getAllFundingSources = async () => {
  return await FundingSource.findAll();
};
