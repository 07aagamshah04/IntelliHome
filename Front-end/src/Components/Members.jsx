/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import MemberProfile from "./Member_Profile";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import Loader from "./Loader";
// import { castObject } from "../../../Back-end/models/family";

const Members = ({ handleGroupClick, handleInvitation, role_de_baba }) => {
  const [invite, setInvite] = useState(false);
  const [exceed, setExceed] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);

  const handleInvitationClick = () => {
    if (users.length == 5) {
      setExceed(true);
    } else {
      if (currentRole !== "Family Manager") {
        toast.error("Only Family Manager can invite Members!!", {
          position: toast.position,
        });
        return;
      }
      setInvite(true);
      handleInvitation(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
            if (response.status == 401) {
              toast.error("You are Unauthorized!!! Kindly SignIn or Register", {
                position: toast.position,
              });
              setTimeout(() => {
                window.location.href = "/sign-in";
              }, 3000);
            }
            if (response.ok) {
              const data = await response.json();
              let updatedArray = data.data.map((obj) => {
                let name = obj.userName.split(" ");
                let shortname =
                  name.length > 1 ? `${name[0][0]}${name[1][0]}` : name[0][0];
                return { ...obj, logo: shortname.toUpperCase() };
              });
              setUsers(updatedArray);
              setCurrentEmail(data.email);
              setCurrentRole(data.role);
              role_de_baba(data.role);
            }
          } catch (error) {
            toast.error("Error feching data", {
              position: toast.position,
            });
          }
        } else {
          const errorData = await response.json();
          toast.error(errorData.msg, {
            position: toast.position,
          });
        }
      } catch (error) {
        toast.error("Error fetching the data", {
          position: toast.position,
        });
      }
      setLoading(false);
    };

    fetchData();

    return () => {};
  }, [invite]);

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
      {loading ? (
        <Loader />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Members;
