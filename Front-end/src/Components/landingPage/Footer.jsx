import { FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import image from "../../assets/text-logo.png";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

const Footer = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <footer
      className="py-3"
      style={{
        backgroundColor: "#F8F9FA",
        bottom: 0,
        left: 0,
        width: "100%",
      }}
    >
      <div className="border-bottom flex-direction">
        <h4 className="margin-footer">Follow Us</h4>
        <ul className="nav pb-3 mb-3">
          <li className="nav-item" style={{ padding: "0 8px" }}>
            <a
              href="https://www.instagram.com"
              className="nav-link px-2"
              target="_blank"
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#202124",
              }}
            >
              <FaInstagram />
            </a>
          </li>
          <li className="nav-item" style={{ padding: "0 8px" }}>
            <a
              href="https://www.twitter.com"
              className="nav-link px-2 "
              target="_blank"
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#202124",
              }}
            >
              <FaTwitter />
            </a>
          </li>
          <li className="nav-item" style={{ padding: "0 8px" }}>
            <a
              href="https://www.facebook.com"
              className="nav-link px-2"
              target="_blank"
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#202124",
              }}
            >
              <FaFacebook />
            </a>
          </li>
          <li className="nav-item" style={{ padding: "0 8px" }}>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              className="nav-link px-2 "
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#202124",
              }}
            >
              <FaLinkedin />
            </a>
          </li>
        </ul>
      </div>
      <div className=" flex-direction mt-4">
        <div style={{ paddingRight: "20px" }} className="margin-footer">
          <img src={image} alt="" className="intelli-logo" />
        </div>
        <ul className="nav pb-3 mb-3 mt-4">
          <li className="nav-item" style={{ paddingRight: "20px" }}>
            <a href="#about" className="nav-link px-2 text-body-secondary">
              About
            </a>
          </li>
          <li className="nav-item" style={{ paddingRight: "20px" }}>
            <a href="#services" className="nav-link px-2 text-body-secondary">
              Products
            </a>
          </li>
          <li className="nav-item" style={{ paddingRight: "20px" }}>
            <a
              href="#"
              className="nav-link px-2 text-body-secondary"
              onClick={handleShow}
            >
              Terms & Privacy
            </a>
          </li>
          <li className="nav-item" style={{ paddingRight: "20px" }}>
            <a href="#faq" className="nav-link px-2 text-body-secondary">
              FAQs
            </a>
          </li>
        </ul>
      </div>
      <div className="text-center mt-3">
        <p style={{ margin: 0, fontSize: "0.9rem", color: "#202124" }}>
          &copy; {new Date().getFullYear()} Made with{" "}
          <>
            <FaHeart style={{ color: "red" }} />
          </>{" "}
          by Aagam Shah and Jaimin Salvi
        </p>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Terms & Privacy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          User is allowed to be the part of only one group, once you leave the
          existing group then your data will be lost of that group and you will
          be redirected to the new group.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </footer>
  );
};

export default Footer;
