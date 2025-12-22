import express from 'express';
import cors from 'cors';

const app = express();

// Configuración
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// Arrancar servidor
app.listen(3000, () => {
  console.log('Backend en http://localhost:3000');
});
