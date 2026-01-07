import { useEffect, useRef, useState } from "react";
import "./Obra.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Obra({ material }) {
  const [obras, setObras] = useState([]);
  const [loading, setLoading] = useState(true);

  const [lightbox, setLightbox] = useState({
    open: false,
    obraIndex: 0,
    imgIndex: 0,
  });

  const startX = useRef(0);
  const endX = useRef(0);

  // ✅ Traer obras desde backend (con filtro opcional por material)
  useEffect(() => {
    setLoading(true);

    const url = material
      ? `${API_URL}/api/obras?material=${encodeURIComponent(material)}`
      : `${API_URL}/api/obras`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setObras(Array.isArray(data) ? data : []))
      .catch(() => setObras([]))
      .finally(() => setLoading(false));
  }, [material]);

  // ✅ Bloquea scroll del fondo cuando el lightbox está abierto
  useEffect(() => {
    // tu web ya oculta scrollbar en body, pero esto asegura que el lightbox no “mueva” nada
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "hidden";
    };
  }, [lightbox.open]);

  const openLightbox = (obraIndex, imgIndex = 0) => {
    setLightbox({ open: true, obraIndex, imgIndex });
  };

  const closeLightbox = () => {
    setLightbox({ open: false, obraIndex: 0, imgIndex: 0 });
  };

  const nextImage = () => {
    const obra = obras[lightbox.obraIndex];
    if (!obra || !obra.imagenes?.length) return;
    setLightbox((prev) => ({
      ...prev,
      imgIndex: (prev.imgIndex + 1) % obra.imagenes.length,
    }));
  };

  const prevImage = () => {
    const obra = obras[lightbox.obraIndex];
    if (!obra || !obra.imagenes?.length) return;
    setLightbox((prev) => ({
      ...prev,
      imgIndex: (prev.imgIndex - 1 + obra.imagenes.length) % obra.imagenes.length,
    }));
  };

  // ✅ Teclado
  useEffect(() => {
    const handleKey = (e) => {
      if (!lightbox.open) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox.open, lightbox.obraIndex, lightbox.imgIndex, obras]);

  // ✅ Swipe táctil (solo en lightbox)
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    endX.current = startX.current;
  };

  const handleTouchMove = (e) => {
    endX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!lightbox.open) return;
    const deltaX = endX.current - startX.current;
    if (deltaX > 50) prevImage();
    if (deltaX < -50) nextImage();
  };

  if (loading) {
    return <div className="obra-loading">Cargando obras…</div>;
  }

  return (
    <>
      <section className="obra-section">
        <div className="obra-gallery" aria-label="Galería de obras">
          {obras.map((obra, obraIdx) => (
            <article
              key={obra.id}
              className="obra-card"
              onClick={() => (obra.imagenes?.length ? openLightbox(obraIdx, 0) : null)}
              role="button"
              tabIndex={0}
            >
              <div className="obra-img-wrapper">
                {obra.imagenes?.length ? (
                  <img src={obra.imagenes[0]} alt={obra.nombre} className="obra-img" />
                ) : (
                  <div className="obra-placeholder">Sin imagen</div>
                )}
              </div>

              <div className="obra-info">
                <h3 className="obra-title">{obra.nombre}</h3>
                <p className="obra-meta">
                  {obra.anio ? obra.anio : "—"} {obra.destino ? `· ${obra.destino}` : ""}
                </p>
                <p className="obra-desc">{obra.descripcion}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {lightbox.open && obras[lightbox.obraIndex] && (
        <div
          className="lightbox"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className="lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            aria-label="Anterior"
          >
            ‹
          </button>

          <img
            src={obras[lightbox.obraIndex].imagenes[lightbox.imgIndex]}
            alt={obras[lightbox.obraIndex].nombre}
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
            draggable="false"
          />

          <button
            className="lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            aria-label="Siguiente"
          >
            ›
          </button>

          <button
            className="lightbox-close"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
