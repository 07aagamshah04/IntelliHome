import { useState } from "react";
import { IoHome } from "react-icons/io5";
import { GiHealthNormal } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi2";
import { GrGallery } from "react-icons/gr";
import { FaVault } from "react-icons/fa6";
import { RiUserSettingsFill } from "react-icons/ri";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import image from "../assets/text-logo.png";
import { Modal, Button, Offcanvas } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleLogout = async () => {
    try {
      //When deployed API change it
      const response = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        window.location.href = "/";
      } else {
        alert("Error in logout");
      }
    } catch (error) {
      alert("Error in logout");
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-white border nav-body"
        aria-label="Offcanvas navbar large"
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setShowOffcanvas(true)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link to="/">
            <img
              src={image}
              alt=""
              className="intelli-logo"
              onClick={handleLogout}
            />
          </Link>
          <div className="collapse navbar-collapse d-none d-lg-flex justify-content-center">
            <ul className="navbar-nav gap-20 ">
              <li className="nav-item">
                <Link to="/home/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/home/healthcare" className="nav-link">
                  Healthcare
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/home/groupchat" className="nav-link">
                  Groupchat
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/home/blogs" className="nav-link">
                  Blogs
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/home/Intellivault" className="nav-link">
                  IntelliVault
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/home/Members" className="nav-link">
                  Family Settings
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link"
                  onClick={handleShowModal}
                  style={{ textTransform: "none" }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
          <Offcanvas
            show={showOffcanvas}
            onHide={() => setShowOffcanvas(false)}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <Link to="/">
                  <img src={image} alt="" className="intelli-logo" />
                </Link>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
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
                    <Link to="/home/dashboard" className="nav-link nav-item">
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
                    <Link to="/home/healthcare" className="nav-link nav-item">
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
                    <Link to="/home/groupchat" className="nav-link nav-item">
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
                    <Link to="/home/blogs" className="nav-link nav-item">
                      Blogs
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center nav-fields">
                    <div className="nav-icons d-flex justify-content-center">
                      <FaVault style={{ fontSize: "1.5rem", color: "Teal" }} />
                    </div>
                    <Link to="/home/Intellivault" className="nav-link nav-item">
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
                    <Link to="/home/Members" className="nav-link nav-item">
                      Family Settings
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center nav-fields">
                    {/* <div className="nav-icons d-flex justify-content-center">
                      <RiUserSettingsFill style={{ fontSize: "1.5rem", color: "orange" }} />
                    </div> */}
                    <div className="nav-icons d-flex justify-content-center">
                      <RiLogoutCircleLine
                        style={{ fontSize: "1.5rem", color: "black" }}
                      />
                    </div>
                    <button
                      className="nav-link nav-item btn btn-link"
                      onClick={handleShowModal}
                      style={{ textTransform: "none" }}
                    >
                      Logout
                    </button>
                  </div>
                </li>
              </ul>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </nav>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;
