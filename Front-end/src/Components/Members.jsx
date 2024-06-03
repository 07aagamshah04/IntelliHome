/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import MemberProfile from "./Member_Profile";
import { FaPlus } from "react-icons/fa";
// import { castObject } from "../../../Back-end/models/family";

const Members = ({ handleGroupClick, handleInvitation, role_de_baba }) => {
  const [invite, setInvite] = useState(false);
  const [exceed, setExceed] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [users, setUsers] = useState();

  const handleInvitationClick = () => {
    if (users.length == 5) {
      setExceed(true);
    } else {
      // console.log("invitation sent...");
      // console.log(invite); // Logs false
      if (currentRole !== "Family Manager") {
        alert("Only Family Manager can invite Members!!");
        return;
      }
      setInvite(true);
      handleInvitation(true); // Updates the state, but not immediately reflected
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          name: "just authenticating and getting token",
        };
        const response = await fetch(
          "http://localhost:8000/api/family-settings/members-token-verify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
          }
        );
        if (response.ok) {
          try {
            const response = await fetch(
              "http://localhost:8000/api/family-settings/get-member-list",
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
              }
            );
            if (response.ok) {
              const data = await response.json();
              let updatedArray = data.data.map((obj) => {
                let name = obj.userName.split(" ");
                let shortname =
                  name.length > 1 ? `${name[0][0]}${name[1][0]}` : name[0][0];
                return { ...obj, logo: shortname.toUpperCase() };
              });
              // console.log(updatedArray);
              // console.log(data.email);
              setUsers(updatedArray);
              setCurrentEmail(data.email);
              setCurrentRole(data.role);
              role_de_baba(data.role);
              // alert(currentEmail);
            }
          } catch (error) {
            alert("Error feching data");
          }
        } else {
          const errorData = await response.json();
          alert(errorData.msg);
        }
      } catch (error) {
        console.log("error");
        alert("Error fetching the data");
      }
    };

    fetchData();

    // role_de_baba(currentRole);

    return () => {
      // Cleanup logic here, if necessary
    };
  }, [invite]);
  // Run this effect whenever invite state changes

  // useEffect(() => {
  //   const updatedUsers = users.map((user) => ({
  //     ...user,
  //     logo: user.firstName[0] + user.lastName[0],
  //   }));
  //   setUsers(updatedUsers);
  // }, []);

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
      {users &&
        users.map((person, index) => (
          <MemberProfile
            key={person.email} // Make sure to provide a unique key
            username={person.userName}
            role={person.role ? "Family Manager" : "Member"}
            logo={person.logo}
            index={index}
            email={person.email}
            user={currentEmail}
            userRole={currentRole}
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
        {`Send invitations (${5 - (users ? users.length : 0)})`}
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
