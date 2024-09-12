import { Client } from "./types";

export const fetchClient = async (signal: AbortSignal): Promise<Client[]> => {
  try {
    const response = await fetch("http://localhost:8080/api/clients", {
      signal,
    }); // Use the Docker service name
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    //ignore any aborted requests as they are due to the component being unmounted
    if ((error as string).includes("aborting")) {
      return [];
    }
    console.error("Error fetching funding Sources:", error);
    return [];
  }
};
