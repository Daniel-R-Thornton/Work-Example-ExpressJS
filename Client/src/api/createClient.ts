import { CreateClientInput } from "./types";

export const createClient = async (
  client: CreateClientInput
): Promise<CreateClientInput | null> => {
  try {
    const response = await fetch("http://localhost:8080/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating client:", error);
    return null;
  }
};
