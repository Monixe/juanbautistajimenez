// src/models/EstadoObra.js (sin Sequelize)
import pool from "../config/db.js";

// Obtener todos los estados de una obra
export const getEstadosByObraId = async (obraId) => {
  const [rows] = await pool.query(
    "SELECT * FROM EstadoObra WHERE obra_id = ?",
    [obraId]
  );
  return rows;
};

// Obtener un estado específico
export const getEstadoById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM EstadoObra WHERE id = ?",
    [id]
  );
  return rows[0];
};

// Crear un nuevo estado
export const createEstado = async (estadoData) => {
  const { obra_id, fase, material, tamano, disponible, descripcion } = estadoData;
  const [result] = await pool.query(
    `INSERT INTO EstadoObra (obra_id, fase, material, tamano, disponible, descripcion)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [obra_id, fase, material, tamano, disponible, descripcion]
  );
  return result.insertId;
};

// Actualizar un estado
export const updateEstado = async (id, estadoData) => {
  const { fase, material, tamano, disponible, descripcion } = estadoData;
  await pool.query(
    `UPDATE EstadoObra SET fase=?, material=?, tamano=?, disponible=?, descripcion=? WHERE id=?`,
    [fase, material, tamano, disponible, descripcion, id]
  );
};

// Borrar un estado
export const deleteEstado = async (id) => {
  await pool.query("DELETE FROM EstadoObra WHERE id=?", [id]);
};
