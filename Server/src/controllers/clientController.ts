import { Request, Response } from "express";
import {
  createClient,
  getClientById,
  updateClient,
  deleteClient,
  getAllClients,
} from "../services/clientService";

/**
 * Creates a new client and returns it in the response body.
 * @example
 * POST /clients
 * {
 *   "name": "John Doe",
 *   "dateOfBirth": "2000-01-01",
 *   "mainLanguage": "ENGLISH",
 *   "secondaryLanguage": "SPANISH",
 *   "fundingSourceId": "1234567890"
 * }
 * @returns {Client} The newly created client
 * @throws {Error} If an error occurs while creating the client
 */
export const createClientHandler = async (req: Request, res: Response) => {
  try {
    const {
      name,
      dateOfBirth,
      mainLanguage,
      secondaryLanguage,
      fundingSourceId,
    } = req.body;

    console.log(req.body);
    console.log(
      name,
      dateOfBirth,
      mainLanguage,
      secondaryLanguage,
      fundingSourceId
    );
    // Basic validation
    if (!name || !dateOfBirth || !mainLanguage || !fundingSourceId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const client = await createClient(req.body);
    res.status(201).json(client);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    res.status(500).json({ error: errorMessage });
  }
};

/**
 * Retrieves a client by its id.
 * @example
 * GET /clients/:id
 * @returns {Client} The client with the given id
 * @throws {Error} If an error occurs while retrieving the client
 */
export const getClientByIdHandler = async (req: Request, res: Response) => {
  try {
    const client = await getClientById(Number(req.params.id));
    if (client) {
      res.status(200).json(client);
    } else {
      res.status(404).json({ error: "Client not found" });
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: errorMessage });
  }
};

/**
 * Updates a client by its id.
 * @example
 * PATCH /clients/:id
 * {
 *   "name": "John Doe",
 *   "dateOfBirth": "2000-01-01",
 *   "mainLanguage": "ENGLISH",
 *   "secondaryLanguage": "SPANISH",
 *   "fundingSourceId": "1234567890"
 * }
 * @returns {Client} The updated client
 * @throws {Error} If an error occurs while updating the client
 */
export const updateClientHandler = async (req: Request, res: Response) => {
  try {
    const updatedClient = await updateClient(Number(req.params.id), req.body);
    res.status(200).json(updatedClient);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: errorMessage });
  }
};

/**
 * Deletes a client by its id.
 * @example
 * DELETE /clients/:id
 * @returns {Object} A JSON object with a message indicating the client was deleted
 * @throws {Error} If an error occurs while deleting the client
 */
export const deleteClientHandler = async (req: Request, res: Response) => {
  try {
    await deleteClient(Number(req.params.id));
    res.status(200).json({ message: "Client deleted" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: errorMessage });
  }
};

/**
 * Retrieves all clients.
 * @example
 * GET /clients
 * @returns {Client[]} An array of all clients
 * @throws {Error} If an error occurs while retrieving the clients
 */
export const getAllClientsHandler = async (req: Request, res: Response) => {
  try {
    const clients = await getAllClients();
    res.status(200).json(clients);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: errorMessage });
  }
};
