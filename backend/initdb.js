import dotenv from "dotenv";
dotenv.config();

import pool from "./config/db.js";

const initDB = async () => {
  try {
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

    // SOLO PARA PRUEBAS: limpia y repuebla
    await pool.query("SET FOREIGN_KEY_CHECKS = 0");
    await pool.query("TRUNCATE TABLE ImagenEstado");
    await pool.query("TRUNCATE TABLE EstadoObra");
    await pool.query("TRUNCATE TABLE Obra");
    await pool.query("SET FOREIGN_KEY_CHECKS = 1");

    await pool.query(`
      INSERT INTO Obra (nombre, anio, destino, descripcion)
      VALUES
        ('Cristo Crucificado', 2020, 'Parroquia San Pedro', 'Escultura de Jesús crucificado en madera tallada a mano.'),
        ('Virgen Dolorosa', 2021, 'Colección Privada', 'Imagen de la Virgen María en madera policromada.'),
        ('Niño Jesús Bendiciendo', 2022, 'Convento Carmelita', 'Escultura del Niño Jesús en madera, estilo clásico.'),
        ('San Juan Evangelista', 2023, 'Exposición Digital', 'Modelo escultórico de San Juan realizado en 3D.')
    `);

    await pool.query(`
      INSERT INTO EstadoObra (obra_id, fase, material, tamano, disponible, descripcion)
      VALUES
        (1, 'Boceto', 'Madera', '40x25 cm', false, 'Boceto inicial del Cristo.'),
        (1, 'Tallado', 'Madera de cedro', '180x120 cm', true, 'Tallado principal del cuerpo.'),
        (1, 'Policromía', 'Madera', '180x120 cm', true, 'Aplicación de color y detalles finales.'),

        (2, 'Tallado', 'Madera', '160x60 cm', true, 'Tallado completo de la Virgen.'),
        (2, 'Policromía', 'Madera', '160x60 cm', true, 'Acabado final con expresión dolorosa.'),

        (3, 'Tallado', 'Madera', '70x40 cm', true, 'Figura del Niño Jesús ya definida.'),
        (3, 'Detalle', 'Madera', '70x40 cm', true, 'Trabajo fino en rostro y manos.'),

        (4, 'Modelado 3D', 'Digital', 'Escala real', true, 'Modelo base en software 3D.'),
        (4, 'Render', 'Digital', 'Escala real', true, 'Render final con iluminación.')
    `);

    // OJO: estado_id aquí debe existir. Con los inserts de arriba, los estados serán 1..9
    await pool.query(`
      INSERT INTO ImagenEstado (estado_id, url, descripcion)
      VALUES
        (3, 'https://res.cloudinary.com/dcium2xbt/image/upload/v1767784774/jesuscabra1_ptqwm8.png', 'Vista frontal'),
        (3, 'https://res.cloudinary.com/dcium2xbt/image/upload/v1767784775/jesuscabra2_tqjrnz.png', 'Vista frontal'),
        (3, 'https://res.cloudinary.com/dcium2xbt/image/upload/v1767784776/jesuscabra3_wyxphb.png', 'Perfil lateral'),
        (3, 'https://res.cloudinary.com/dcium2xbt/image/upload/v1767784777/jesuscabra4_zccg5y.png', 'Detalle del rostro'),

        (5, 'https://res.cloudinary.com/dcium2xbt/image/upload/v1767784778/virgen1_gszimo.png', 'Vista completa'),
        (5, 'https://res.cloudinary.com/dcium2xbt/image/upload/v1767784778/virgen2_xgv0rx.png', 'Detalle del rostro'),
        (5, 'https://res.cloudinary.com/dcium2xbt/image/upload/v1767784779/virgen3_fjgxfg.png', 'Detalle del manto'),
        (5, 'https://res.cloudinary.com/dcium2xbt/image/upload/v1767784781/virgen4_rnx558.png', 'Detalle del rostro'),
        (5, 'https://res.cloudinary.com/dcium2xbt/image/upload/v1767784782/virgen5_jfiaf7.png', 'Detalle del rostro'),

        (7, 'https://res.cloudinary.com/dcium2xbt/image/upload/v1767784771/infan1_zpufro.png', 'Vista frontal'),
        (7, 'https://res.cloudinary.com/dcium2xbt/image/upload/v1767784771/infan2_jzwhev.png', 'Manos bendiciendo'),
        (7, 'https://res.cloudinary.com/dcium2xbt/image/upload/v1767784772/infan3_vc3gbs.png', 'Detalle del rostro'),
        (7, 'https://res.cloudinary.com/dcium2xbt/image/upload/v1767784773/infan4_hqkver.png', 'Vista frontal'),
        (7, 'https://res.cloudinary.com/dcium2xbt/image/upload/v1767784774/infan5_lhrtei.png', 'Vista frontal'),


        (9, 'https://res.cloudinary.com/dcium2xbt/image/upload/v1767784767/3dsanjuan1_h3v83m.png', 'Modelo base'),
        (9, 'https://res.cloudinary.com/dcium2xbt/image/upload/v1767784767/3dsanjuan5_hzmy4y.png', 'Vista lateral'),
        (9, 'https://res.cloudinary.com/dcium2xbt/image/upload/v1767784766/3dsanjuan2_rko8oc.png', 'Render final')
    `);

    console.log("✅ DB inicializada");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error inicializando la base de datos:", error);
    process.exit(1);
  }
};

initDB();
