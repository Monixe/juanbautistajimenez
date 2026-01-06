import React from "react";
import "./HeroBanner.css";
import videoHeader from "../assets/videoHeader/videoHeader.mp4";

export default function HeroBanner() {
  return (
    <section className="hero-banner">
      <video
        className="hero-video"
        src={videoHeader}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="hero-overlay">
        <h1>Juan Bautista Jiménez</h1>
        <p>Explora mi obra, taller y más</p>
      </div>
    </section>
  );
}
