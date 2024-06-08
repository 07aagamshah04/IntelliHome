import { useRef } from "react";
import logo from "../assets/IntelliHome.png";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { toast } from "react-toastify";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";

const SignInPage = () => {
  const email = useRef("");
  const pass = useRef("");
  const navigate = useNavigate();

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  const Validate = async (evt) => {
    evt.preventDefault();
    if (email.current.value === "" || pass.current.value === "") {
      toast.error("DON'T LEAVE ANY FIELD BLANK", {
        position: toast.position,
      });
      return;
    }
    if (pass.current.value.length !== 8) {
      toast.error("Your password must be of 8 characters", {
        position: toast.position,
      });
      return;
    }
    try {
      let familyId = getQueryParam("familyId");
      if (!familyId) {
        familyId = "nathi bhai";
      }
      const userData = {
        email: email.current.value,
        password: pass.current.value,
        familyId: familyId,
      };
      const response = await fetch("http://localhost:8000/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });
      if (response.ok) {
        toast.success("Verified Successfully", {
          position: toast.position,
        });
        const data = await response.json();
        localStorage.setItem("token", data.cookie);
        navigate("/home/dashboard");
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg, {
          position: toast.position,
        });
      }
    } catch (error) {
      toast.error("Error logging User!", {
        position: toast.position,
      });
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
      <MDBCard className="Sign-card">
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
                id="formControlLg1"
                type="password"
                size="lg"
              />

              <MDBBtn
                className="mb-4 px-5"
                color="dark"
                size="lg"
                onClick={Validate}
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
