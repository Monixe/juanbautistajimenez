import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import obrasRouter from "./routes/obras.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/obras", obrasRouter);

// Healthcheck
app.get("/api/health", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    conn.release();
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend corriendo en http://localhost:${PORT}`));
