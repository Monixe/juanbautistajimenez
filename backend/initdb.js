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

    // 3️⃣ Tabla ImagenEstado (imágenes de cada fase)
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

    console.log("✅ Base de datos inicializada correctamente");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error inicializando la base de datos:", error);
    process.exit(1);
  }
};

initDB();
