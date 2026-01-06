import { useState } from "react";
import Header from "./components/Header";
import About from "./components/About";
import Taller from "./components/Taller";
import Obra from "./components/Obra";
import Modeling3D from "./components/Modeling3D";
import Enlaces from "./components/Enlaces";
import Contacto from "./components/Contacto";
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
  <>
    {/* Header recibe page y setPage */}
    <Header current={page} onChange={setPage} />
    
    {/* Hero banner justo debajo del header */}
    <HeroBanner />

    {/* Contenido de la sección seleccionada */}
    <main className="main">
      {renderPage()}
    </main>

    {/* Footer al final de la página */}
    <Footer />
  </>
);
}
