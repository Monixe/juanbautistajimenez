// src/models/Obra.js (sin Sequelize)
import pool from "../config/db.js";

// Obtener todas las obras
export const getObras = async () => {
  const [rows] = await pool.query("SELECT * FROM Obra");
  return rows;
};

// Obtener una obra por id
export const getObraById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM Obra WHERE id = ?", [id]);
  return rows[0];
};

// Crear una obra
export const createObra = async (obraData) => {
  const { nombre, anio, destino, descripcion } = obraData;
  const [result] = await pool.query(
    "INSERT INTO Obra (nombre, anio, destino, descripcion) VALUES (?, ?, ?, ?)",
    [nombre, anio, destino, descripcion]
  );
  return result.insertId;
};

// Actualizar una obra
export const updateObra = async (id, obraData) => {
  const { nombre, anio, destino, descripcion } = obraData;
  await pool.query(
    "UPDATE Obra SET nombre=?, anio=?, destino=?, descripcion=? WHERE id=?",
    [nombre, anio, destino, descripcion, id]
  );
};

// Borrar una obra
export const deleteObra = async (id) => {
  await pool.query("DELETE FROM Obra WHERE id=?", [id]);
};
