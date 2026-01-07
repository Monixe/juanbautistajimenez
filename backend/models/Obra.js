import pool from "../config/db.js";

/* =========================
   CRUD BÁSICO
========================= */
export const getAllObras = async () => {
  const [rows] = await pool.query("SELECT * FROM Obra ORDER BY id ASC");
  return rows;
};

export const getObraById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM Obra WHERE id = ?", [id]);
  return rows[0];
};

export const createObra = async ({ nombre, anio, destino, descripcion }) => {
  const [result] = await pool.query(
    "INSERT INTO Obra (nombre, anio, destino, descripcion) VALUES (?, ?, ?, ?)",
    [nombre, anio ?? null, destino ?? null, descripcion ?? null]
  );
  return result.insertId;
};

export const updateObra = async (id, data) => {
  const { nombre, anio, destino, descripcion } = data;
  await pool.query(
    "UPDATE Obra SET nombre=?, anio=?, destino=?, descripcion=? WHERE id=?",
    [nombre, anio ?? null, destino ?? null, descripcion ?? null, id]
  );
};

export const deleteObra = async (id) => {
  await pool.query("DELETE FROM Obra WHERE id=?", [id]);
};

/* =========================
   HELPERS
========================= */
const splitImagenes = (value) => {
  if (!value) return [];
  return value
    .split("||")
    .map((s) => s.trim())
    .filter(Boolean);
};

/* =========================
   OBRAS CON IMÁGENES
   (MySQL viejo: GROUP_CONCAT)
========================= */
export const getObrasConImagenes = async () => {
  const [rows] = await pool.query(`
    SELECT 
      o.id, o.nombre, o.anio, o.destino, o.descripcion,
      GROUP_CONCAT(DISTINCT i.url ORDER BY i.id SEPARATOR '||') AS imagenes
    FROM Obra o
    LEFT JOIN EstadoObra e ON e.obra_id = o.id
    LEFT JOIN ImagenEstado i ON i.estado_id = e.id
    GROUP BY o.id
    ORDER BY o.id ASC
  `);

  return rows.map((obra) => ({
    ...obra,
    imagenes: splitImagenes(obra.imagenes),
  }));
};

export const getObraConImagenesById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT 
      o.id, o.nombre, o.anio, o.destino, o.descripcion,
      GROUP_CONCAT(DISTINCT i.url ORDER BY i.id SEPARATOR '||') AS imagenes
    FROM Obra o
    LEFT JOIN EstadoObra e ON e.obra_id = o.id
    LEFT JOIN ImagenEstado i ON i.estado_id = e.id
    WHERE o.id = ?
    GROUP BY o.id
    `,
    [id]
  );

  const obra = rows[0];
  if (!obra) return null;

  return {
    ...obra,
    imagenes: splitImagenes(obra.imagenes),
  };
};

/* =========================
   FILTRO POR MATERIAL
   Para Modeling 3D:
   /api/obras?material=Digital
========================= */
export const getObrasConImagenesByMaterial = async (material) => {
  const [rows] = await pool.query(
    `
    SELECT 
      o.id, o.nombre, o.anio, o.destino, o.descripcion,
      GROUP_CONCAT(DISTINCT i.url ORDER BY i.id SEPARATOR '||') AS imagenes
    FROM Obra o
    INNER JOIN EstadoObra e ON e.obra_id = o.id
    LEFT JOIN ImagenEstado i ON i.estado_id = e.id
    WHERE LOWER(e.material) = LOWER(?)
    GROUP BY o.id
    ORDER BY o.id ASC
    `,
    [material]
  );

  return rows.map((obra) => ({
    ...obra,
    imagenes: splitImagenes(obra.imagenes),
  }));
};
