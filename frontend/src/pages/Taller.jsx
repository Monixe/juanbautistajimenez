import { useEffect, useMemo, useState } from "react";
import "./Taller.css";
import jbjr from "../assets/jbjr.png";

export default function Taller() {
  const images = useMemo(
    () => [
      "https://res.cloudinary.com/dcium2xbt/image/upload/v1767824475/as2_kq36tc.jpg",
      jbjr,
    ],
    []
  );

  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 8000); // tiempo total por imagen (lento y elegante)

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="taller-page">
      <div className="taller-carousel">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            className={`taller-img ${i === active ? "is-active" : ""}`}
            alt="Imagen del taller"
            draggable="false"
          />
        ))}
      </div>

      <div className="taller-text">
        <h2>Taller</h2>
        <p>
          El taller es el lugar donde la materia empieza a hablar. Un espacio de
          tiempo, silencio y trabajo constante, donde cada obra madura sin
          prisas.
        </p>
      </div>
    </section>
  );
}
