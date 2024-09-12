import { Request, Response } from "express";
import { getAllFundingSources } from "../services/fundingSourceService";

/**
 * Retrieves all fundingSources.
 * @example
 * GET /fundingSources
 * @returns {Client[]} An array of all fundingSources
 * @throws {Error} If an error occurs while retrieving the fundingSources
 */
export const getAllFundingSourcesHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const fundingSources = await getAllFundingSources();
    res.status(200).json(fundingSources);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: errorMessage });
  }
};
