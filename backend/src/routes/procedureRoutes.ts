import { Router } from "express";
import {
  createProcedure,
  getProcedures,
  getProcedureById,
  updateProcedure,
  deleteProcedure
} from "../controllers/procedureController";

const router = Router();

router.post("/", createProcedure);
router.get("/", getProcedures);
router.get("/:id", getProcedureById);
router.put("/:id", updateProcedure);
router.delete("/:id", deleteProcedure);

export default router;