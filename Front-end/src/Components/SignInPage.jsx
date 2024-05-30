/*
 *Validation for email,password,redirecting to Dashboard if all is true, and also on register to registration page
 */

import { useRef } from "react";
import logo from "../assets/IntelliHome.png";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";

const SignInPage = () => {
  const email = useRef("");
  const pass = useRef("");
  const navigate = useNavigate();
  const Validate = async (evt) => {
    evt.preventDefault();
    if (email.current.value === "" || pass.current.value === "") {
      alert("DON'T LEAVE ANY FIELD BLANK");
      return;
    }
    if (pass.current.value.length !== 8) {
      alert("Your password must be of 8 characters");
      return;
    }
    //validate email
    //if true then validate password by checking that password is of correct email or not
    //if all things are true then allow him to go to dashboard page
    try {
      const userData = {
        email: email.current.value,
        password: pass.current.value,
      };
      //When deployed API change it
      //Here credentails are used to allow to add cookie
      const response = await fetch("http://localhost:8000/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });
      if (response.ok) {
        alert("Verified successfully");
        navigate("/home/dashboard");
      } else {
        const errorData = await response.json();
        alert(errorData.msg);
      }
    } catch (error) {
      alert("Error adding user:", error);
      return;
    }
    email.current.value = "";
    pass.current.value = "";
  };

  return (
    <MDBContainer
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", width: "100vw" }}
    >
      <MDBCard
        // style={{ height: "70vh", width: "70vw" }}
        className="Sign-card"
      >
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src={logo}
              alt="login form"
              className="rounded w-100"
            />
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                {/* <MDBIcon
                  fas
                  icon="cubes fa-3x me-3"
                  style={{ color: "#ff6219" }}
                /> */}
                <span className="h1 fw-bold mb-0">Sign In</span>
              </div>

              <h5
                className="fw-normal my-4 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Sign into your account
              </h5>

              <MDBInput
                wrapperClass="mb-4"
                ref={email}
                label="Email address"
                id="formControlLg"
                type="email"
                size="lg"
              />
              <MDBInput
                wrapperClass="mb-4"
                ref={pass}
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
              />

              <MDBBtn
                className="mb-4 px-5"
                color="dark"
                size="lg"
                onClick={Validate}
                // style={{background:"crims"}}
              >
                Login
              </MDBBtn>
              <span
                className="small text-muted text-center mb-2"
                style={{ cursor: "pointer" }}
              >
                Forgot password?
              </span>
              <p
                className="mb-5 pb-lg-2 text-center"
                style={{ color: "#393f81" }}
              >
                Don&apos;t have an account?{" "}
                <Link to="/register-page" className="register-signIn">
                  Register here
                </Link>
              </p>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default SignInPage;
