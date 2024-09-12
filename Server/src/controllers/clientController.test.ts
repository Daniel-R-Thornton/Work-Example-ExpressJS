import {
  createClient,
  getClientById,
  updateClient,
  deleteClient,
  getAllClients,
} from "../services/clientService";
import {
  createClientHandler,
  getClientByIdHandler,
  updateClientHandler,
  deleteClientHandler,
  getAllClientsHandler,
} from "../controllers/clientController";
import { Request, Response } from "express";
import { jest, describe, it, expect } from "@jest/globals";

jest.mock("../services/clientService");

describe("Client Handlers", () => {
  describe("createClientHandler", () => {
    it("should return 201 and the created client when client is created successfully", async () => {
      const createdClient: any = {
        id: 1,
        name: "John Doe",
        dateOfBirth: "2000-01-01",
        mainLanguage: "ENGLISH",
        secondaryLanguage: "SPANISH",
        fundingSourceId: "1234567890",
      };

      (createClient as jest.Mock<typeof createClient>).mockResolvedValueOnce(
        createdClient
      );

      const req = {
        body: {
          name: "John Doe",
          dateOfBirth: "2000-01-01",
          mainLanguage: "ENGLISH",
          secondaryLanguage: "SPANISH",
          fundingSourceId: "1234567890",
        },
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await createClientHandler(req, res);

      expect(createClient).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdClient);
    });
  });

  it("should return 400 if required fields are missing", async () => {
    const req = { body: {} } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await createClientHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Missing required fields",
    });
  });

  it("should return 500 on server error", async () => {
    const req = {
      body: {
        name: "John Doe",
        dateOfBirth: "2000-01-01",
        mainLanguage: "ENGLISH",
        secondaryLanguage: "SPANISH",
        fundingSourceId: "1234567890",
      },
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (createClient as jest.Mock<typeof createClient>).mockRejectedValueOnce(
      new Error("Server error")
    );

    await createClientHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Server error" });
  });
});

describe("getClientByIdHandler", () => {
  it("should return 200 and the client if found", async () => {
    const client = { id: 1, name: "John Doe" };

    (
      getClientById as jest.Mock<NonNullable<typeof getClientById>>
    ).mockResolvedValueOnce(client as any);

    const req = { params: { id: "1" } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getClientByIdHandler(req, res);

    expect(getClientById).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(client);
  });

  it("should return 404 if client not found", async () => {
    (getClientById as jest.Mock<typeof getClientById>).mockResolvedValueOnce(
      null
    );

    const req = { params: { id: "1" } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getClientByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Client not found" });
  });

  it("should return 500 on server error", async () => {
    (getClientById as jest.Mock<typeof getClientById>).mockRejectedValueOnce(
      new Error("Server error")
    );

    const req = { params: { id: "1" } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getClientByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Server error" });
  });
});

it("should return 500 on server error", async () => {
  (updateClient as jest.Mock<typeof updateClient>).mockRejectedValueOnce(
    new Error("Server error")
  );

  const req = { params: { id: "1" }, body: {} } as unknown as Request;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  await updateClientHandler(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({ error: "Server error" });
});

describe("getAllClientsHandler", () => {
  it("should return 200 and an array of clients", async () => {
    const clients = [{ id: 1, name: "John Doe" }];

    (getAllClients as jest.Mock<typeof getAllClients>).mockResolvedValueOnce(
      clients as any
    );

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getAllClientsHandler(req, res);

    expect(getAllClients).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(clients);
  });

  it("should return 500 on server error", async () => {
    (getAllClients as jest.Mock<typeof getAllClients>).mockRejectedValueOnce(
      new Error("Server error")
    );

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getAllClientsHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Server error" });
  });
});
