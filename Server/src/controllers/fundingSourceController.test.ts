import { Request, Response } from "express";
import { getAllFundingSources } from "../services/fundingSourceService";
import { getAllFundingSourcesHandler } from "../controllers/fundingSourceController";
import { jest, describe, it, expect } from "@jest/globals";

jest.mock("../services/fundingSourceService");

describe("getAllFundingSourcesHandler", () => {
  it("should return 200 and an array of fundingSources", async () => {
    const fundingSources = [
      { id: 1, name: "NDIS" },
      { id: 2, name: "CASH" },
    ];

    (
      getAllFundingSources as jest.Mock<typeof getAllFundingSources>
    ).mockResolvedValueOnce(fundingSources as any);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getAllFundingSourcesHandler(req, res);

    expect(getAllFundingSources).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fundingSources);
  });

  it("should return 500 on server error", async () => {
    (
      getAllFundingSources as jest.Mock<typeof getAllFundingSources>
    ).mockRejectedValueOnce(new Error("Server error"));

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getAllFundingSourcesHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Server error" });
  });

  it("should return 500 with unknown error if error is not an instance of Error", async () => {
    (
      getAllFundingSources as jest.Mock<typeof getAllFundingSources>
    ).mockRejectedValueOnce("Random error");

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getAllFundingSourcesHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Unknown error" });
  });
});
