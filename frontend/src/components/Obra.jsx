// ./components/Obra.jsx
import { useState, useEffect, useRef } from "react";
import "./Obra.css";

export default function Obra() {
  const [obras, setObras] = useState([]);
  const [lightbox, setLightbox] = useState({ open: false, obraIndex: 0, imgIndex: 0 });
  const startX = useRef(0);
  const endX = useRef(0);

  // Traer obras desde backend
  useEffect(() => {
    fetch("http://localhost:3000/api/obras")
      .then(res => res.json())
      .then(data => setObras(data))
      .catch(err => console.error(err));
  }, []);

  // Lightbox
  const openLightbox = (obraIndex, imgIndex = 0) => {
    setLightbox({ open: true, obraIndex, imgIndex });
  };
  const closeLightbox = () => setLightbox({ open: false, obraIndex: 0, imgIndex: 0 });

  const nextImage = () => {
    const obra = obras[lightbox.obraIndex];
    setLightbox(prev => ({
      ...prev,
      imgIndex: (prev.imgIndex + 1) % obra.imagenes.length
    }));
  };
  const prevImage = () => {
    const obra = obras[lightbox.obraIndex];
    setLightbox(prev => ({
      ...prev,
      imgIndex: (prev.imgIndex - 1 + obra.imagenes.length) % obra.imagenes.length
    }));
  };

  // Teclado
  useEffect(() => {
    const handleKey = (e) => {
      if (!lightbox.open) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox, obras]);

  // Swipe táctil
  const handleTouchStart = (e) => { startX.current = e.touches[0].clientX; };
  const handleTouchMove = (e) => { endX.current = e.touches[0].clientX; };
  const handleTouchEnd = () => {
    if (!lightbox.open) return;
    const deltaX = endX.current - startX.current;
    if (deltaX > 50) prevImage();
    if (deltaX < -50) nextImage();
  };

  return (
    <>
      <section className="obra-gallery-wrapper">
        {(!Array.isArray(obras) || obras.length === 0) ? (
          <p className="loading">Cargando obras...</p>
        ) : (
          <div className="obra-gallery">
            {Array.isArray(obras) && obras.map((obra, obraIdx) => (
              <div
                key={obra.id}
                className="obra-card"
                onClick={() => obra.imagenes.length > 0 && openLightbox(obraIdx)}
              >
                {obra.imagenes.length > 0 ? (
                  <div className="obra-img-wrapper">
                    <img src={obra.imagenes[0]} alt={obra.nombre} className="obra-img" />
                  </div>
                ) : (
                  <div className="obra-img-wrapper placeholder">Sin imagen</div>
                )}
                <div className="obra-info">
                  <h3>{obra.nombre}</h3>
                  <p className="obra-meta">{obra.anio} - {obra.destino}</p>
                  <p className="obra-desc">{obra.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {lightbox.open && (
        <div
          className="lightbox"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>&lt;</button>
          <img
            src={obras[lightbox.obraIndex].imagenes[lightbox.imgIndex]}
            alt={obras[lightbox.obraIndex].nombre}
            className="lightbox-img"
          />
          <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>&gt;</button>
        </div>
      )}
    </>
  );
}
