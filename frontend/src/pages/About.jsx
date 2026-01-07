import "./About.css";
import retrato from "../assets/jbjr.png";

export default function About() {
  return (
    <section className="about-page">
      <div className="about-img-wrapper">
        <img src={retrato} alt="Retrato del artista" className="about-img" />
      </div>

      <div className="about-text">
        <h2>Sobre mí</h2>

        <p>
          Desde niño sentí cómo la imaginería me llamaba con una voz silenciosa,
          revelando secretos en cada veta de la madera.
        </p>

        <p>
          Junto a Lourdes aprendí no solo la técnica, sino también la paciencia,
          el respeto por el oficio y la importancia de mirar la obra con verdad.
          Más tarde, en la Universidad de Sevilla, profundicé en el estudio y
          comprendí la fuerza de los grandes maestros, cuya influencia transformo
          en lenguaje propio.
        </p>

        <p>
          Hoy, cada escultura que creo es un diálogo entre tradición y alma,
          entre materia y emoción. Tallando me encuentro; creando existo; y dejo
          en cada obra un fragmento de mi identidad.
        </p>
      </div>
    </section>
  );
}
