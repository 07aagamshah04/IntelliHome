import "../colorlib-regform-17/colorlib-regform-17/fonts/material-design-iconic-font/css/material-design-iconic-font.min.css";
import "../colorlib-regform-17/colorlib-regform-17/css/style.css";
import image1 from "../colorlib-regform-17/colorlib-regform-17/images/image1.jpg";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import OtpInput from "./OtpInput";
import { Link, useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const [age, SetAge] = useState(0);
  const [emailChecker, SetEmailChecker] = useState(false);
  const [email, setEmail] = useState("");
  const dob = useRef();
  const uname = useRef("");
  const gender = useRef("");
  const pass1 = useRef("");
  const pass2 = useRef("");
  const [Otp, Setotp] = useState(0);
  const navigate = useNavigate();

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  useEffect(() => {
    const a = Math.floor(Math.random() * 9000) + 1000;
    Setotp(a);
  }, []);

  const checkerFunction = () => {
    let familyId = getQueryParam("familyId");
    if (!familyId) {
      familyId = "nathi bhai";
    }
    return familyId;
  };

  const doWork = async (e) => {
    e.preventDefault();
    const DobDate = new Date(dob.current.value);
    const todayDate = new Date();
    if (
      dob.current.value === "" ||
      uname.current.value === "" ||
      email === "" ||
      gender.current.value === "" ||
      gender.current.value === "Gender" ||
      pass1.current.value === "" ||
      pass2.current.value === "" ||
      pass1.current.value !== pass2.current.value
    ) {
      alert("FIELD IS MISSING OR BOTH PASSWORDS ARE NOT MATCHING");
      return;
    }

    if (pass1.current.value.length !== 8) {
      alert("PASSWORD MUST CONTAIN 8 DIGITS OR CHARACTERS");
      return;
    }

    let age = todayDate.getFullYear() - DobDate.getFullYear();
    const month = todayDate.getMonth() - DobDate.getMonth();
    if (month < 0 || (month === 0 && todayDate.getDate() < DobDate.getDate())) {
      age--;
    }
    if (age < 0) {
      alert("WRONG DOB ENTERED");
      return;
    } else {
      SetAge(age);
    }

    try {
      const emailData = {
        email: email,
      };
      //Here we are checking whether user with same-id already exists
      const response = await fetch(
        "http://localhost:8000/api/users/verify-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        }
      );
      if (response.ok) {
        SetEmailChecker(true);
        try {
          const emailData = {
            name: uname.current.value,
            email: email,
            otp: Otp,
          };
          const response = await fetch(
            "http://localhost:8000/api/users/send-email",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(emailData),
            }
          );
          if (response.ok) {
            alert("OTP SENT TO YOUR EMAIL");
          } else {
            const errorData = await response.json();
            alert(errorData.msg);
          }
        } catch (error) {
          console.error("Error adding user:", error);
        }
      } else {
        const errorData = await response.json();
        alert(errorData.msg);
      }
    } catch (error) {
      alert("Email-id already exists");
    }
  };

  const onOtpSubmit = async (otp) => {
    if (otp === Otp.toString()) {
      let familyId = getQueryParam("familyId");
      if (!familyId) {
        familyId = "nathi bhai";
      }
      let role = false;
      if (familyId === "nathi bhai") {
        role = true;
      }
      try {
        const formData = {
          userName: uname.current.value,
          email: email,
          gender: gender.current.value,
          dob: new Date(dob.current.value),
          password: pass1.current.value,
          role: role,
          familyId: familyId,
        };
        const response = await fetch("http://localhost:8000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          alert("Thank you for registration!!");
          navigate(`/sign-in?familyId=${familyId}`);
        } else {
          const errorData = await response.json();
          alert(errorData.msg);
        }
      } catch (error) {
        const errorData = await response.json();
        alert(errorData.msg);
      }
    } else {
      alert("Wrong OTP entered");
      return;
    }
  };

  const handleSignInClick = (e) => {
    e.preventDefault();
    const familyId = checkerFunction();
    navigate(
      `/sign-in${familyId !== "nathi bhai" ? `?familyId=${familyId}` : ""}`
    );
  };

  return (
    <div className="registration-wrapper" style={{ background: "#E2DFDA" }}>
      <div className="registration-inner" style={{ borderRadius: "10px" }}>
        <div className="registration-image-holder">
          <img
            className="registration-imagii"
            src={image1}
            style={{ borderRadius: "10px" }}
            alt=""
          />
        </div>
        <form action="" onSubmit={doWork}>
          <h3>Create Account</h3>
          <div className="registration-form-wrapper">
            <input
              type="text"
              ref={uname}
              placeholder="Username"
              className="registration-form-control"
            />
            <i className="zmdi zmdi-account"></i>
          </div>
          <div className="registration-form-wrapper">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="registration-form-control"
            />
            <i className="zmdi zmdi-email" />
          </div>
          <div className="registration-form-wrapper">
            <select
              name=""
              id=""
              ref={gender}
              className="registration-form-control"
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <i
              className="zmdi zmdi-caret-down"
              style={{ fontSize: "17px" }}
            ></i>
          </div>
          <div className="registration-form-wrapper">
            <input
              type="date"
              ref={dob}
              className="registration-form-control" /*style={{width : ""}}*/
            />
          </div>
          <div className="registration-form-wrapper">
            <input
              type="password"
              placeholder="Password"
              ref={pass1}
              className="registration-form-control"
            />
            <i className="zmdi zmdi-lock"></i>
          </div>
          <div className="registration-form-wrapper">
            <input
              type="password"
              placeholder="Confirm Password"
              ref={pass2}
              className="registration-form-control"
            />
            <i className="zmdi zmdi-lock"></i>
          </div>
          {emailChecker && (
            <div className="registration-form-wrapper">
              <p>Enter OTP sent to {email}</p>
              <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
            </div>
          )}
          <button className="buttoni">
            Register
            <i className="zmdi zmdi-arrow-right"></i>
          </button>
          <div className="text-center fs-5 mt-4">
            Already have an Account ?
            <Link
              to="#"
              onClick={handleSignInClick}
              className="register-signIn"
            >
              &nbsp;Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
