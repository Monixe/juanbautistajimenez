// src/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Importa la conexión a la base de datos
import pool from "./config/db.js";

// Importa funciones de tus modelos
import {
  getObras,
  getObraById,
  createObra,
  updateObra,
  deleteObra,
} from "./models/Obra.js";

import {
  getEstadosByObraId,
  getEstadoById,
  createEstado,
  updateEstado,
  deleteEstado,
} from "./models/EstadoObra.js";

dotenv.config();

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas de ejemplo para Obra
app.get("/api/obras", async (req, res) => {
  try {
    const obras = await getObras();
    res.json(obras);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/obras/:id", async (req, res) => {
  try {
    const obra = await getObraById(req.params.id);
    if (!obra) return res.status(404).json({ error: "Obra no encontrada" });
    res.json(obra);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/obras", async (req, res) => {
  try {
    const id = await createObra(req.body);
    res.status(201).json({ message: "Obra creada", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/obras/:id", async (req, res) => {
  try {
    await updateObra(req.params.id, req.body);
    res.json({ message: "Obra actualizada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/obras/:id", async (req, res) => {
  try {
    await deleteObra(req.params.id);
    res.json({ message: "Obra eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rutas de ejemplo para EstadoObra
app.get("/api/obras/:obraId/estados", async (req, res) => {
  try {
    const estados = await getEstadosByObraId(req.params.obraId);
    res.json(estados);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 404 general
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Verifica la conexión a MySQL antes de arrancar
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
app.listen(PORT, () => {
  console.log(`Backend en http://localhost:${PORT}`);
});
