import { FundingSource } from "./types";

export const fetchFundingSource = async (
  signal: AbortSignal
): Promise<FundingSource[]> => {
  try {
    const response = await fetch("http://localhost:8080/api/fundingSources", {
      signal,
    }); // Use the Docker service name
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching funding Sources:", error);
    return [];
  }
};
