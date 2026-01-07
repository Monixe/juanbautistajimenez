import express from "express";
import {
  getObras,
  getObra,
  createObraCtrl,
  updateObraCtrl,
  deleteObraCtrl,
} from "../controllers/obras.controllers.js";

const router = express.Router();

router.get("/", getObras);
router.get("/:id", getObra);
router.post("/", createObraCtrl);
router.put("/:id", updateObraCtrl);
router.delete("/:id", deleteObraCtrl);

export default router;
