import "./Enlaces.css";

export default function Enlaces() {
  const cards = [
    {
      title: "Entrevista en El Llamador",
      desc: "Entrevista a Juan Bautista Jiménez en el programa El Llamador.",
      href: "https://www.facebook.com/elllamador/videos/el-imaginero-juan-bautista-jimenez-anoche-en-elllamador-v%C3%ADdeo-victor-espinosa/849781916936695/",
      embedUrl:
        "https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/elllamador/videos/849781916936695/&show_text=false&width=560",
      type: "facebook",
    },
    {
      title: "Entrevista en Diario de Pasión",
      desc: "Conversación sobre obra y trayectoria en Diario de Pasión.",
      href: "https://www.youtube.com/watch?v=Fr6A1zCGqeg",
      embedUrl: "https://www.youtube.com/embed/Fr6A1zCGqeg",
      type: "youtube",
    },
    {
      title: "Entrevista · Juan Bautista Jiménez",
      desc: "Entrevista completa sobre el proceso creativo y la imaginería.",
      href: "https://www.youtube.com/watch?v=yXomf8Xk6b0",
      embedUrl: "https://www.youtube.com/embed/yXomf8Xk6b0",
      type: "youtube",
    },
  ];

  return (
    <section className="enlaces-page">
      <header className="enlaces-header">
        <h2>Entrevistas</h2>
        <p>Apariciones en medios y entrevistas audiovisuales.</p>
      </header>

      <div className="enlaces-grid">
        {cards.map((item, i) => (
          <article className="enlace-card" key={i}>
            <div className="enlace-media enlace-media-video">
              <iframe
                src={item.embedUrl}
                title={item.title}
                loading="lazy"
                allow={
                  item.type === "youtube"
                    ? "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    : "autoplay; clipboard-write; encrypted-media; picture-in-picture"
                }
                allowFullScreen
              />
            </div>

            <div className="enlace-info">
              <h3 className="enlace-title">{item.title}</h3>
              <p className="enlace-desc">{item.desc}</p>

              <a
                className="enlace-btn"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver en la plataforma original
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
