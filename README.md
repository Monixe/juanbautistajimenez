# Proyecto Web de Esculturas – Juan Bautista Jiménez

Este proyecto es una aplicación web para **gestionar, documentar y mostrar obras escultóricas**, incluyendo sus distintas fases de creación y las imágenes asociadas a cada una.

Está pensada para un artista/estudio que necesita un sistema claro, escalable y ordenado para su archivo de obras.

---

## 🧱 Estructura del proyecto

El sistema se basa en **tres entidades principales** relacionadas entre sí:

```
Obra 1 ──< EstadoObra 1 ──< ImagenEstado
```

### 1. Obra

Representa la escultura como entidad principal, independientemente de su estado o fase.

**Campos:**

* `id` – Identificador único
* `nombre` – Nombre de la obra
* `anio` – Año de creación
* `destino` – Cliente, colección o ubicación final
* `descripcion` – Información general de la obra

---

### 2. EstadoObra (Fases)

Representa las distintas fases o estados de una obra (modelo 3D, prototipo, obra final, etc.).

**Campos:**

* `id` – Identificador único de la fase
* `obra_id` – Referencia a la obra (`Obra.id`)
* `fase` – Nombre de la fase (ej. "modelo 3D", "prototipo", "final")
* `material` – Material usado en esa fase (barro, metal, ZBrush, madera…)
* `tamano` – Dimensiones
* `disponible` – Booleano (disponible o no)
* `descripcion` – Detalles específicos de la fase

📌 **Notas clave**:

* Una obra puede tener múltiples fases.
* Fases con el mismo nombre pueden existir en distintas obras sin conflicto.

---

### 3. ImagenEstado

Almacena las imágenes asociadas a cada fase de una obra.

**Campos:**

* `id` – Identificador único
* `estado_id` – Referencia a la fase (`EstadoObra.id`)
* `url` – Ruta o enlace de la imagen
* `descripcion` – Opcional (frontal, lateral, detalle…)

📌 **Ventaja clave**: no hay límite de imágenes por fase.

---

## ⚙️ Tecnologías

* **Backend**: Node.js + Express
* **Base de datos**: MySQL
* **Frontend**: React
* **Deploy**:

  * Backend / DB: Railway
  * Frontend: Vercel

---

## 🔐 Variables de entorno

Ejemplo de `.env` para el backend:

```env
MYSQL_URL=mysql://usuario:password@host:puerto/database
PORT=3000
```

---

## 🚀 Inicialización del proyecto

1. Instalar dependencias:

```bash
npm install
```

2. Inicializar la base de datos:

```bash
node initDB.js
```

3. Arrancar el servidor:

```bash
npm start
```

---

## ✅ Ventajas del diseño

* Base de datos limpia y normalizada
* Escalable (sin columnas duplicadas)
* Permite múltiples fases e imágenes por obra
* Ideal para catálogo artístico profesional

---

## 📌 Estado del proyecto

Proyecto en desarrollo activo. La estructura está preparada para ampliaciones futuras como:

* Autenticación
* Panel de administración
* Filtros avanzados
* Galería pública

---

**Autor:** Mónica Jiménez
