import { Router } from "express";
import { getAllFundingSourcesHandler } from "../controllers/fundingSourceController";

const router = Router();

//link routes to the fundingSources controllers
router.get("/fundingSources", getAllFundingSourcesHandler);

export default router;
