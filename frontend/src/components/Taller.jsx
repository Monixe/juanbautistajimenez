export default function Taller() {
  const images = ["taller1.jpg", "taller2.jpg", "taller3.jpg"];

  return (
    <section className="page gallery">
      {images.map((src, i) => (
        <img key={i} src={`/img/${src}`} alt={`Imagen del taller ${i+1}`} />
      ))}
    </section>
  );
}
