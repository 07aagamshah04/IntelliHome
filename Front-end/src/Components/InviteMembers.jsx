/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useReducer, useRef, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";

const InviteMembers = ({ handleInviteToggle }) => {
  const [flag, setFlag] = useState(true);
  const [toggle, setToggle] = useState(false);
  // const [email, setEmail] = useState("");
  const email = useRef("");
  const [emailChecker, SetEmailChecker] = useState(false);
  // Function to handle input change
  // const handleInputChange = (event) => {
  //   setEmail(event.target.value);
  //   // Check if the entered email contains "@gmail.com"
  //   if (event.target.value.includes("@gmail.com")) {
  //     // Do something when email contains "@gmail.com"
  //     setFlag(true);
  //   } else {
  //     setFlag(false);
  //   }
  // };
  const invite_toggle = () => {
    setToggle(!toggle);
    handleInviteToggle(true); // Updates the state, but not immediately reflected
  };

  // useEffect(() => {
  //   handleInviteToggle(toggle); // Call your function with the updated value
  // }, [toggle]); // Run this effect whenever invite state changes

  const handleclick = async (event) => {
    try {
      const emailData = {
        email: email.current.value,
      };
      //When deployed API change it
      const response = await fetch(
        "http://localhost:8000/api/family-settings/send-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
          credentials: "include",
        }
      );
      if (response.ok) {
        alert("Invitation sent successfully");
      } else {
        // console.log(error);
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.log(error);
      alert("Email-id already exists");
    }
  };

  return (
    <>
      <div
        className="container-fluid border-bottom mt-4"
        style={{ marginBottom: "20px" }}
      >
        <h3 className="member-heading" style={{ cursor: "pointer" }}>
          <IoMdArrowBack
            className="back-icon"
            style={{ fontSize: "24px", marginLeft: "5px" }}
            onClick={invite_toggle}
          />
          Invite your family
        </h3>
      </div>
      <div
        className="container border invite"
        style={{ maxWidth: "600px", borderRadius: "8px" }}
      >
        <div className="list-group-item list-group-item-action d-flex gap-3 py-3 flex-column">
          Invite up to 5 people to join your family group, each aged 13 or
          older.
          <br />
          <br />
          Invited members can view the names, emails, and profile pictures of
          current group members.
          <div style={{ width: "100%" }}>
            <input
              //   className="text-center"
              type="email"
              required
              // onChange={handleInputChange}
              ref={email}
              style={{
                width: "100%",
                // marginLeft: "10px",
                // marginRight: "10px",
                // textAlign: "center",
                border: "none",
                outline: "none",
                borderBottom: "1px solid gray",
              }}
            />
          </div>
          <div className="d-flex justify-content-end" style={{ gap: "3.5rem" }}>
            <button className="invitation-button" style={{ color: "blue" }}>
              Cancel
            </button>
            <button
              className={` ${flag ? "invitation-button" : ""} invt-btn`}
              style={{ color: flag ? "blue" : "gray" }}
              onClick={() => handleclick()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InviteMembers;
