/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import MemberProfile from "./Member_Profile";
import { FaPlus } from "react-icons/fa";

const Members = ({ handleGroupClick, handleInvitation }) => {
  const [invite, setInvite] = useState(false);
  const [exceed, setExceed] = useState(false);
  const handleInvitationClick = () => {
    if (users.length == 5) {
      setExceed(true);
    } else {
      console.log("invitation sent...");
      console.log(invite); // Logs false
      setInvite(true); // Updates the state, but not immediately reflected
    }
  };

  useEffect(() => {
    console.log(invite); // Logs true when invite state is updated
    handleInvitation(invite); // Call your function with the updated value
  }, [invite]); // Run this effect whenever invite state changes

  const [users, setUsers] = useState([
    {
      firstName: "Jaimin",
      lastName: "Salvi",
      userName: "Jaimin Salvi",
      role: "Family Manager",
      email: "salvijaimin275@gmail.com",
    },
    {
      firstName: "Aagam",
      lastName: "Shah",
      userName: "Aagam Shah",
      role: "Member",
      email: "07aagamshah04@gmail.com",
    },
    {
      firstName: "Sashrik",
      lastName: "Gupta",
      userName: "Sashrik Gupta",
      role: "Member",
      email: "sashrikgupta@gmail.com",
    },
  ]);

  useEffect(() => {
    const updatedUsers = users.map((user) => ({
      ...user,
      logo: user.firstName[0] + user.lastName[0],
    }));
    setUsers(updatedUsers);
  }, []);

  return (
    <div
      className="container border"
      style={{ maxWidth: "1000px", borderRadius: "8px" }}
    >
      <div className="header" style={{ marginTop: "10px" }}>
        <h3 style={{ fontWeight: "400" }}>Your family group members</h3>
        <p>This is a list of all members.</p>
        <div
          className="line"
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#DDDDDD",
          }}
        ></div>
      </div>
      {/* Render MemberProfile components inside the map function */}
      {users.map((person, index) => (
        <MemberProfile
          key={person.userName} // Make sure to provide a unique key
          username={person.userName}
          role={person.role}
          logo={person.logo}
          index={index}
          email={person.email}
          handleGroupClick={handleGroupClick}
        />
      ))}
      <button
        type="button"
        className="btn btn-outline-secondary"
        style={{ color: "black", marginBottom: "10px", marginTop: "10px" }}
        onClick={handleInvitationClick}
      >
        <FaPlus style={{ color: "#397FDA" }} />{" "}
        {`Send invitations (${5 - users.length})`}
      </button>
      {!exceed ? null : (
        <div style={{ color: "red", marginLeft: "5px" }}>
          * You have already invite 5 members can&apos;t invite more.
        </div>
      )}
    </div>
  );
};

export default Members;
