import "./Footer.css";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <span className="footer-left">
        © {new Date().getFullYear()} Juan Bautista Jiménez
      </span>

      <div className="footer-center social-icons">
        <a href="https://www.facebook.com/people/Juan-Bautista-Jim%C3%A9nez-Rosa/61572805974391/?name=xhp_nt__fb__action__open_user" target="_blank" rel="noopener noreferrer" className="icon">
          <FaFacebookF />
        </a>
        <a href="https://www.instagram.com/escultorjuanbautista/" target="_blank" rel="noopener noreferrer" className="icon">
          <FaInstagram />
        </a>
        <a href="https://wa.me/34655662441" target="_blank" rel="noopener noreferrer" className="icon">
          <FaWhatsapp />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
