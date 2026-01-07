import { useState } from "react";
import Header from "./components/Header";
import About from "./pages/About";
import Taller from "./pages/Taller";
import Obra from "./pages/Obra";
import Modeling3D from "./pages/Modeling3D";
import Enlaces from "./pages/Enlaces";
import Contacto from "./pages/Contacto";
import HeroBanner from "./components/HeroBanner";
import Footer from "./components/Footer";
import "./index.css";

export default function App() {
  const [page, setPage] = useState("sobre-mi");

  const renderPage = () => {
    switch (page) {
      case "taller":
        return <Taller />;
      case "obra":
        return <Obra />;
      case "modeling3d":
        return <Modeling3D />;
      case "enlaces":
        return <Enlaces />;
      case "contacto":
        return <Contacto />;
      default:
        return <About />;
    }
  };

  return (
    <div className="app-shell">
      <Header current={page} onChange={setPage} />
      <HeroBanner />
      <main className="app-main">{renderPage()}</main>
      <Footer />
    </div>
  );
}
