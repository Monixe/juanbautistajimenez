import {
  getObrasConImagenes,
  getObrasConImagenesByMaterial,
  getObraConImagenesById,
  createObra,
  updateObra,
  deleteObra,
} from "../models/Obra.js";

// GET /api/obras  o  /api/obras?material=Digital
export const getObras = async (req, res) => {
  try {
    const { material } = req.query;

    const obras = material
      ? await getObrasConImagenesByMaterial(material)
      : await getObrasConImagenes();

    res.json(obras);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo obras" });
  }
};

// GET /api/obras/:id
export const getObra = async (req, res) => {
  try {
    const { id } = req.params;
    const obra = await getObraConImagenesById(id);
    if (!obra) return res.status(404).json({ error: "Obra no encontrada" });
    res.json(obra);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo la obra" });
  }
};

// POST /api/obras
export const createObraCtrl = async (req, res) => {
  try {
    const { nombre, anio, destino, descripcion } = req.body;
    if (!nombre) return res.status(400).json({ error: "Nombre obligatorio" });

    const id = await createObra({ nombre, anio, destino, descripcion });
    res.status(201).json({ id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando la obra" });
  }
};

// PUT /api/obras/:id
export const updateObraCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    await updateObra(id, req.body);
    res.json({ message: "Obra actualizada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error actualizando la obra" });
  }
};

// DELETE /api/obras/:id
export const deleteObraCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteObra(id);
    res.json({ message: "Obra eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error eliminando la obra" });
  }
};
