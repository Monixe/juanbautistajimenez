import "./Contacto.css";

export default function Contacto() {
  return (
    <section className="contact-page">
      <h2>Contacto</h2>

      <div className="contact-card">
        <div className="contact-info">
          <p><strong>Dirección:</strong><br />Calle Clara de Jesús Montero, nº5A, Triana (Sevilla)</p>

          <p>
            <strong>Teléfono:</strong><br />
            <a href="tel:+34600111222">+34 600 111 222</a>
          </p>

          <p>
            <strong>Correo electrónico:</strong><br />
            <a href="mailto:info@tuweb.com">info@tuweb.com</a>
          </p>

          <p>
            <strong>Página web:</strong><br />
            <a
              href="https://www.tuweb.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.tuweb.com
            </a>
          </p>
        </div>

        <div className="contact-map">
          <iframe
            title="Mapa de ubicación"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d792.5242298831554!2d-6.008333030346173!3d37.387540163825804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126c6c527324eb%3A0x4e9d694cfbe228a9!2sC.%20Clara%20de%20Jes%C3%BAs%20Montero%2C%205a%2C%2041010%20Sevilla!5e0!3m2!1ses!2ses!4v1763919377163!5m2!1ses!2ses"
            width="100%"
            height="280"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
