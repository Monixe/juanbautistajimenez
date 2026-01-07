// ./initDB.js
import pool from "./config/db.js";

const initDB = async () => {
  try {
    // 1️⃣ Tabla Obra
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Obra (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        anio INT,
        destino VARCHAR(255),
        descripcion TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // 2️⃣ Tabla EstadoObra (fases)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS EstadoObra (
        id INT AUTO_INCREMENT PRIMARY KEY,
        obra_id INT NOT NULL,
        fase VARCHAR(100) NOT NULL,
        material VARCHAR(100),
        tamano VARCHAR(100),
        disponible BOOLEAN DEFAULT false,
        descripcion TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_estado_obra
          FOREIGN KEY (obra_id)
          REFERENCES Obra(id)
          ON DELETE CASCADE
      )
    `);

    // 3️⃣ Tabla ImagenEstado
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ImagenEstado (
        id INT AUTO_INCREMENT PRIMARY KEY,
        estado_id INT NOT NULL,
        url VARCHAR(500) NOT NULL,
        descripcion TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_imagen_estado
          FOREIGN KEY (estado_id)
          REFERENCES EstadoObra(id)
          ON DELETE CASCADE
      )
    `);

    // 🔹 Datos de prueba

    // Obras
    const [obraResult] = await pool.query(`
      INSERT INTO Obra (nombre, anio, destino, descripcion)
      VALUES 
        ('Escultura del Bosque', 2022, 'Museo de Arte Moderno', 'Escultura tallada en madera inspirada en la naturaleza.'),
        ('Figura en Movimiento', 2021, 'Galería Central', 'Obra que explora la dinámica del cuerpo humano en movimiento.'),
        ('Torsos Abstractos', 2023, 'Exposición Temporal', 'Serie de torsos abstractos que combinan técnica y emoción.')
    `);

    // Estados
    const [estadoResult] = await pool.query(`
      INSERT INTO EstadoObra (obra_id, fase, material, tamano, disponible, descripcion)
      VALUES
        (1, 'Boceto', 'Madera', '50x30 cm', true, 'Primer boceto de la escultura.'),
        (1, 'Tallado', 'Madera', '50x30 cm', true, 'Proceso de tallado.'),
        (2, 'Diseño', 'Yeso', '60x40 cm', true, 'Diseño inicial de la figura.'),
        (3, 'Modelo', 'Arcilla', '45x35 cm', true, 'Modelo de los torsos abstractos.')
    `);

    // Imágenes (usando URLs de ejemplo, puedes reemplazarlas con las tuyas)
    await pool.query(`
      INSERT INTO ImagenEstado (estado_id, url, descripcion)
      VALUES
        (1, 'https://via.placeholder.com/600x400?text=Boceto+1', 'Boceto inicial'),
        (2, 'https://via.placeholder.com/600x400?text=Tallado+1', 'Tallado en proceso'),
        (2, 'https://via.placeholder.com/600x400?text=Tallado+2', 'Detalle del tallado'),
        (3, 'https://via.placeholder.com/600x400?text=Diseño+1', 'Diseño de la figura'),
        (4, 'https://via.placeholder.com/600x400?text=Modelo+1', 'Modelo en arcilla')
    `);

    console.log("✅ Base de datos inicializada con datos de prueba correctamente");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error inicializando la base de datos:", error);
    process.exit(1);
  }
};

initDB();
