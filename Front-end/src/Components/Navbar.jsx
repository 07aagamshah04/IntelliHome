import { IoHome } from "react-icons/io5";
import { GiHealthNormal } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi2";
import { GrGallery } from "react-icons/gr";
import { FaVault } from "react-icons/fa6";
import { RiUserSettingsFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import image from "../assets/text-logo.png";
import { useEffect } from "react";
import { Offcanvas } from "bootstrap";

const Navbar = () => {
  useEffect(() => {
    const offcanvasElement = document.getElementById('offcanvasNavbar2');
    if (offcanvasElement) {
      const offcanvasInstance = new Offcanvas(offcanvasElement);
      const links = offcanvasElement.querySelectorAll('.nav-link');

      const handleLinkClick = () => {
        offcanvasInstance.hide();

        // Manually remove the backdrop
        const backdrop = document.querySelector('.offcanvas-backdrop');
        if (backdrop) {
          backdrop.remove();
        }
      };

      links.forEach(link => {
        link.addEventListener('click', handleLinkClick);
      });

      return () => {
        links.forEach(link => {
          link.removeEventListener('click', handleLinkClick);
        });
      };
    }
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-white border nav-body"
      aria-label="Offcanvas navbar large"
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar2"
          aria-controls="offcanvasNavbar2"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link to="/">
          <img src={image} alt="" className="intelli-logo" />
        </Link>
        <div
          className="offcanvas offcanvas-start text-bg-white"
          tabIndex="-1"
          id="offcanvasNavbar2"
          aria-labelledby="offcanvasNavbar2Label"
        >
          <div className="offcanvas-header border-bottom">
            <h5 className="offcanvas-title" id="offcanvasNavbar2Label">
              <Link to="/">
                <img src={image} alt="" className="intelli-logo" />
              </Link>
            </h5>
            <button
              type="button"
              className="btn-close btn-close-black"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul
              className="navbar-nav d-flex justify-content-center"
              style={{ width: "100%" }}
            >
              <li>
                <div className="d-flex align-items-center nav-fields">
                  <div className="nav-icons d-flex justify-content-center">
                    <IoHome
                      style={{ fontSize: "1.5rem", color: "rgb(51, 49, 49)" }}
                    />
                  </div>
                  <Link
                    to="/home/dashboard"
                    className="nav-link nav-item"
                  >
                    Dashboard
                  </Link>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center nav-fields">
                  <div className="nav-icons d-flex justify-content-center">
                    <GiHealthNormal
                      style={{ fontSize: "1.5rem", color: "crimson" }}
                    />
                  </div>
                  <Link
                    to="/home/healthcare"
                    className="nav-link nav-item"
                  >
                    Healthcare
                  </Link>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center nav-fields">
                  <div className="nav-icons d-flex justify-content-center">
                    <HiUserGroup
                      style={{ fontSize: "1.5rem", color: "#5ec4e6" }}
                    />
                  </div>
                  <Link
                    to="/home/groupchat"
                    className="nav-link nav-item"
                  >
                    Groupchat
                  </Link>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center nav-fields">
                  <div className="nav-icons d-flex justify-content-center">
                    <GrGallery
                      style={{ fontSize: "1.5rem", color: "#556B2F" }}
                    />
                  </div>
                  <Link
                    to="/home/blogs"
                    className="nav-link nav-item"
                  >
                    Blogs
                  </Link>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center nav-fields">
                  <div className="nav-icons d-flex justify-content-center">
                    <FaVault style={{ fontSize: "1.5rem", color: "Teal" }} />
                  </div>
                  <Link
                    to="/home/Intellivault"
                    className="nav-link nav-item"
                  >
                    IntelliVault
                  </Link>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center nav-fields">
                  <div className="nav-icons d-flex justify-content-center">
                    <RiUserSettingsFill
                      style={{ fontSize: "1.5rem", color: "orange" }}
                    />
                  </div>
                  <Link
                    to="/home/Members"
                    className="nav-link nav-item"
                  >
                    Family Settings
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
