import { useEffect } from "react";

export default function InstagramReel() {
  useEffect(() => {
    // Cargar el script de Instagram para embebidos
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="instagram-container">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/reel/Ctrqo8xuI60/"
        data-instgrm-version="14"
        style={{ width: "100%", maxWidth: "540px", margin: "0 auto" }}
      ></blockquote>
    </div>
  );
}
