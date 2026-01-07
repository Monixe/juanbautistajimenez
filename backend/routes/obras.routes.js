// ./routes/obras.routes.js
import { Router } from "express";
import { 
  getAllObras, 
  getObraById, 
  createObra, 
  updateObra, 
  deleteObra 
} from "../controllers/obra.controller.js";

const router = Router();

// Rutas para obras
router.get("/", getAllObras);          // GET /api/obras -> lista todas las obras
router.get("/:id", getObraById);      // GET /api/obras/:id -> obtiene obra por id
router.post("/", createObra);         // POST /api/obras -> crea nueva obra
router.put("/:id", updateObra);       // PUT /api/obras/:id -> actualiza obra
router.delete("/:id", deleteObra);    // DELETE /api/obras/:id -> elimina obra

export default router;
