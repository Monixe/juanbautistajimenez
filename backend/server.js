// ./server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import { getObrasConImagenes } from "./models/Obra.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Endpoint para todas las obras con imágenes
app.get("/api/obras", async (req, res) => {
  try {
    const obras = await getObrasConImagenes();
    res.json(obras);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verifica conexión MySQL
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Conectado a MySQL");
    connection.release();
  } catch (error) {
    console.error("Error conectando a MySQL:", error.message);
  }
})();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend corriendo en http://localhost:${PORT}`));
