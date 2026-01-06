export default function Enlaces() {
  const links = [
    { img: "ig.jpg", desc: "Instagram", url: "https://instagram.com" },
    { img: "artstation.jpg", desc: "ArtStation", url: "https://artstation.com" }
  ];

  return (
    <section className="page cards">
      {links.map((item, i) => (
        <a
          key={i}
          href={item.url}
          className="card"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={`/img/${item.img}`} alt={item.desc} />
          <p>{item.desc}</p>
        </a>
      ))}
    </section>
  );
}
