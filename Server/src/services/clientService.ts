import Client from "../models/Client";

type CreateClientInput = {
  name: string;
  dateOfBirth: Date;
  mainLanguage: string;
  secondaryLanguage: string;
  fundingSourceId: string;
};

type UpdateClientinput = {
  name?: string;
  dateOfBirth?: Date;
  mainLanguage?: string;
  secondaryLanguage?: string;
  fundingSourceId?: number;
};

export const createClient = async (clientData: CreateClientInput) => {
  return await Client.create(clientData);
};

export const getClientById = async (id: number) => {
  return await Client.findByPk(id);
};

export const updateClient = async (id: number, updates: UpdateClientinput) => {
  const client = await Client.findByPk(id);
  if (client) {
    return await client.update(updates);
  }
  throw new Error("Client not found");
};

export const deleteClient = async (id: number) => {
  const client = await Client.findByPk(id);
  if (client) {
    await client.destroy();
    return { message: "Client deleted" };
  }
  throw new Error("Client not found");
};

export const getAllClients = async () => {
  return await Client.findAll();
};

export default {
  createClient,
  getClientById,
  updateClient,
  deleteClient,
  getAllClients,
};
