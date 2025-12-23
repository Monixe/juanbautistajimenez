// src/controllers/obra.controller.js
import Obra from "../models/Obra.js";
import EstadoObra from "../models/EstadoObra.js";
import ImagenEstado from "../models/ImagenEstado.js";

// Obtener todas las obras con sus fases y fotos
export const getAllObras = async (req, res) => {
  try {
    const obras = await Obra.findAll({
      include: {
        model: EstadoObra,
        include: ImagenEstado
      }
    });
    res.json(obras);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo las obras" });
  }
};

// Obtener una obra por ID con sus fases e imágenes
export const getObraById = async (req, res) => {
  try {
    const { id } = req.params;
    const obra = await Obra.findByPk(id, {
      include: {
        model: EstadoObra,
        include: ImagenEstado
      }
    });
    if (!obra) return res.status(404).json({ error: "Obra no encontrada" });
    res.json(obra);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo la obra" });
  }
};

// Crear una nueva obra
export const createObra = async (req, res) => {
  try {
    const { nombre, anio, destino, descripcion } = req.body;
    const nuevaObra = await Obra.create({ nombre, anio, destino, descripcion });
    res.status(201).json(nuevaObra);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando la obra" });
  }
};

// Actualizar una obra existente
export const updateObra = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, anio, destino, descripcion } = req.body;
    const obra = await Obra.findByPk(id);
    if (!obra) return res.status(404).json({ error: "Obra no encontrada" });

    await obra.update({ nombre, anio, destino, descripcion });
    res.json(obra);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error actualizando la obra" });
  }
};

// Eliminar una obra
export const deleteObra = async (req, res) => {
  try {
    const { id } = req.params;
    const obra = await Obra.findByPk(id);
    if (!obra) return res.status(404).json({ error: "Obra no encontrada" });

    await obra.destroy();
    res.json({ message: "Obra eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error eliminando la obra" });
  }
};
