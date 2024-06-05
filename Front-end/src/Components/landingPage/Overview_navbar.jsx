import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import image from "../../assets/text-logo.png";
const OverviewNavbar = () => {
  const [select, SetSelect] = useState("Overview");

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-white bg-white"
        aria-label="Offcanvas navbar large"
      >
        <div className="container-fluid">
          <img src={image} alt="" className="intelli-logo" />
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
          <div
            className="offcanvas offcanvas-end text-bg-white"
            tabIndex="-1"
            id="offcanvasNavbar2"
            aria-labelledby="offcanvasNavbar2Label"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbar2Label">
                IntelliHome
              </h5>
              <button
                type="button"
                className="btn-close btn-close-black"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav  d-flex justify-content-end gap-5">
                <li className={` ${select === "Overview" ? "selected" : ""}`}>
                  <Link
                    to="/"
                    className="nav-link nav-item active"
                    style={{ fontSize: "1.2rem", fontWeight: "500" }}
                    onClick={() => SetSelect("Overview")}
                  >
                    Overview
                  </Link>
                </li>
                <li
                  className={` ${select === "get-started" ? "selected" : ""}`}
                >
                  <Link
                    to="/register-page"
                    className="nav-link "
                    style={{ fontSize: "1.2rem", fontWeight: "500" }}
                    onClick={() => SetSelect("get-started")}
                  >
                    Get-Started
                  </Link>
                </li>
                <li className={` ${select === "sign-in" ? "selected" : ""}`}>
                  <Link
                    to="/sign-in"
                    className="nav-link"
                    style={{ fontSize: "1.2rem", fontWeight: "500" }}
                    onClick={() => SetSelect("sign-in")}
                  >
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default OverviewNavbar;
