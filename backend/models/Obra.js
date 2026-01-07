export const getObrasConImagenes = async () => {
  const [rows] = await pool.query(`
    SELECT o.id, o.nombre, o.anio, o.destino, o.descripcion,
           IFNULL(JSON_ARRAYAGG(i.url), JSON_ARRAY()) AS imagenes
    FROM Obra o
    LEFT JOIN EstadoObra e ON e.obra_id = o.id
    LEFT JOIN ImagenEstado i ON i.estado_id = e.id
    GROUP BY o.id
    ORDER BY o.id ASC
  `);

  return rows.map(obra => ({
    ...obra,
    imagenes: obra.imagenes ? JSON.parse(obra.imagenes) : []
  }));
};
