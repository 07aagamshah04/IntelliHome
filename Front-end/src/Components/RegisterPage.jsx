/* eslint-disable no-unused-vars */
/**
 * After correct otp move to dashboard
 * We have to send mail to user for OTP
 * Submitting data to database
 */

import "../colorlib-regform-17/colorlib-regform-17/fonts/material-design-iconic-font/css/material-design-iconic-font.min.css";
import "../colorlib-regform-17/colorlib-regform-17/css/style.css";
import image1 from "../colorlib-regform-17/colorlib-regform-17/images/image1.jpg";
import { useEffect, useRef, useState } from "react";
import OtpInput from "./OtpInput";
import { Link, useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const [age, SetAge] = useState(0);
  const [emailChecker, SetEmailChecker] = useState(false);
  const dob = useRef();
  const email = useRef("");
  const [Otp, Setotp] = useState(0);
  const uname = useRef("");
  const gender = useRef("");
  const pass1 = useRef("");
  const pass2 = useRef("");
  const navigate = useNavigate();
  // const OtpGenerator = () => {
  // 	console.log(Math.floor(Math.random() * 9000) + 1000);
  // 	Setotp(Math.floor(Math.random() * 9000) + 1000);
  // }

  useEffect(() => {
    const a = Math.floor(Math.random() * 9000) + 1000;
    // console.log(a);
    Setotp(a);
  }, []);

  const doWork = (e) => {
    e.preventDefault();
    const DobDate = new Date(dob.current.value);
    const todayDate = new Date();

    if (
      dob.current.value === "" ||
      uname.current.value === "" ||
      email.current.value === "" ||
      gender.current.value === "" ||
      gender.current.value === "Gender" ||
      pass1.current.value === "" ||
      pass2.current.value === "" ||
      pass1.current.value !== pass2.current.value
    ) {
      // alert("WRONG INPUTS ENTERED OR FIELD IS MISSING OR PASSWORD INCORRECT");
      // return;
    }

    let age = todayDate.getFullYear() - DobDate.getFullYear();
    const month = todayDate.getMonth() - DobDate.getMonth();
    if (month < 0 || (month === 0 && todayDate.getDate() < DobDate.getDate())) {
      age--;
    }
    if (age < 0) {
      alert("WRONG DOB ENTERED");
    } else {
      SetAge(age);
    }
    SetEmailChecker(true);
    navigate("/home/dashboard");
  };

  const onOtpSubmit = (otp) => {
    if (otp === Otp.toString()) {
      console.log("Right entered");
      //Here we have to take user to dashboard regardless of console statement
    } else {
      alert("Wrong entered");
    }
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
              ref={email}
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
              <option value="femal">Female</option>
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
              <p>Enter OTP sent to {email.current.value}</p>
              <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
            </div>
          )}
          <button className="buttoni">
            Register
            <i className="zmdi zmdi-arrow-right"></i>
          </button>
          <div className="text-center fs-5 mt-4">
            Already have an Account ?
            <Link to="/sign-in" className="register-signIn">
              &nbsp;Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
