import { FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import image from "../../assets/text-logo.png";
const Footer = () => {
  return (
    <footer
      className="py-3"
      style={{
        backgroundColor: "#F8F9FA",
        // position: "fixed",
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
              href="#"
              className="nav-link px-2"
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
              href="#"
              className="nav-link px-2 "
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
              href="#"
              className="nav-link px-2"
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
              href="#"
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
            <a href="#" className="nav-link px-2 text-body-secondary">
              About
            </a>
          </li>
          <li className="nav-item" style={{ paddingRight: "20px" }}>
            <a href="#" className="nav-link px-2 text-body-secondary">
              Products
            </a>
          </li>
          <li className="nav-item" style={{ paddingRight: "20px" }}>
            <a href="#" className="nav-link px-2 text-body-secondary">
              Terms & Privacy
            </a>
          </li>
          <li className="nav-item" style={{ paddingRight: "20px" }}>
            <a href="#" className="nav-link px-2 text-body-secondary">
              FAQs
            </a>
          </li>
        </ul>
      </div>
      {/* </div> */}
    </footer>
  );
};

export default Footer;
