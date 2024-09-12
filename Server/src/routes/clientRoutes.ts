import { Router } from "express";
import {
  createClientHandler,
  getClientByIdHandler,
  updateClientHandler,
  deleteClientHandler,
  getAllClientsHandler,
} from "../controllers/clientController";

const router = Router();

//link routes to the client controllers
router.post("/clients", createClientHandler);
router.get("/clients", getAllClientsHandler);
router.get("/clients/:id", getClientByIdHandler);
router.put("/clients/:id", updateClientHandler);
router.delete("/clients/:id", deleteClientHandler);

export default router;
