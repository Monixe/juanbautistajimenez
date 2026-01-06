export default function Obra() {
  const obras = ["obra1.jpg", "obra2.jpg", "obra3.jpg"];

  return (
    <section className="page gallery">
      {obras.map((src, i) => (
        <img key={i} src={`/img/${src}`} alt={`Obra ${i+1}`} />
      ))}
    </section>
  );
}
