import { useRef, useState, useEffect } from "react";
import "./Header.css";

export default function Header({ current, onChange }) {
  const items = [
    { id: "sobre-mi", label: "Sobre mí" },
    { id: "taller", label: "Taller" },
    { id: "obra", label: "Obra" },
    { id: "modeling3d", label: "Modeling 3D" },
    { id: "enlaces", label: "Enlaces" },
    { id: "contacto", label: "Contacto" }
  ];

  const navRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const updateArrows = () => {
    const el = navRef.current;
    if (!el) return;

    const hasOverflow = el.scrollWidth > el.clientWidth;
    setShowLeft(el.scrollLeft > 10);
    setShowRight(hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    updateArrows();

    const el = navRef.current;

    el.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);

    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scrollLeft = () => {
    navRef.current.scrollBy({ left: -150, behavior: "smooth" });
  };

  const scrollRight = () => {
    navRef.current.scrollBy({ left: 150, behavior: "smooth" });
  };

  return (
    <header className="header">
      <button
        className={`arrow left ${showLeft ? "show" : ""}`}
        onClick={scrollLeft}
        aria-label="Scroll left"
      >
        ‹
      </button>

      {/* El ref DEBE IR AQUÍ */}
      <nav className="nav" aria-label="Menú principal" ref={navRef}>
        <ul className="nav-list">
          {items.map(item => (
            <li key={item.id}>
              <button
                className={`nav-btn ${current === item.id ? "active" : ""}`}
                onClick={() => onChange(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <button
        className={`arrow right ${showRight ? "show" : ""}`}
        onClick={scrollRight}
        aria-label="Scroll right"
      >
        ›
      </button>
    </header>
  );
}
