/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import DeleteGroup from "./DeleteGroup";
import Members from "./Members";
import { IoMdArrowBack } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import InviteMembers from "./InviteMembers";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const MemberSection = () => {
  const [flag, setFlag] = useState(true);
  const idx = useRef(0);
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [role, setrole] = useState("");
  const [logo, setlogo] = useState("");
  const [profileLogoColor, setprofileLogoColor] = useState("");
  const [userRole, setUserRole] = useState("");

  const delMessage = [
    "If you delete your family group, all members will lose access to IntelliHome services that need a family group to work.",
    "If you leave your family group, you loose access to IntelliHome services. Are you sure?",
  ];
  const delbtnMessage = ["Delete family group", "Leave family group"];
  const [invitation, setInvitation] = useState(false);

  function handleInvitation(invite) {
    setInvitation(invite);
  }
  function handleGroupClick({
    username,
    email,
    user,
    role,
    logo,
    userRole,
    profileLogoColor,
  }) {
    if (role === "Member") {
      idx.current += 1;
    } else {
      idx.current = 0;
    }
    setUsername(username);
    setemail(email);
    setrole(role);
    setlogo(logo);
    setprofileLogoColor(profileLogoColor);
    if (user === email || userRole === "Family Manager") {
      setFlag(false);
    } else {
      setFlag(true);
    }
  }

  function role_dede_baba(userRole) {
    setUserRole(userRole);
  }

  function toggle() {
    setFlag(!flag);
  }

  function handleInviteToggle(toggle) {
    setInvitation(!toggle);
  }

  const deleteMember = async (memberId, familyId) => {
    if (userRole === "Family Manager" && role === "Family Manager") {
      try {
        const response = await fetch(
          `https://backend-intellihome-api.onrender.com/api/family-settings/deleteGroup`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          toast.error("Failed to delete Group", {
            position: toast.position,
          });
        } else {
          const data = await response.json();
          toast.success("Group deleted successfully", {
            position: toast.position,
          });
          try {
            const response = await fetch(
              "https://backend-intellihome-api.onrender.com/api/logout",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
              }
            );
            if (response.ok) {
              localStorage.removeItem("token");
              window.location.href = "/";
            } else {
              toast.error("Error in Logout", {
                position: toast.position,
              });
            }
          } catch (error) {
            toast.error("Error in Logout", {
              position: toast.position,
            });
          }
        }
      } catch (error) {
        toast.error("Failed to delete group", {
          position: toast.position,
        });
      }
    } else {
      try {
        let data;
        data = {
          email: email,
        };
        const response = await fetch(
          `https://backend-intellihome-api.onrender.com/api/family-settings/deleteUser`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
          }
        );

        if (!response.ok) {
          toast.error("Failed to delete member", {
            position: toast.position,
          });
        } else {
          const data = await response.json();
          toast.success("Member deleted successfully", {
            position: toast.position,
          });
          try {
            const response = await fetch(
              "https://backend-intellihome-api.onrender.com/api/logout",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
              }
            );
            if (response.ok) {
              localStorage.removeItem("token");
              window.location.href = "/";
            } else {
              toast.error("Error in Logout", {
                position: toast.position,
              });
            }
          } catch (error) {
            toast.error("Error in Logout", {
              position: toast.position,
            });
          }
        }
      } catch (error) {
        toast.error("Failed to delete member", {
          position: toast.position,
        });
      }
    }
  };

  return (
    <>
      {invitation ? (
        <InviteMembers handleInviteToggle={handleInviteToggle} />
      ) : !flag ? (
        <div>
          <div
            className="container-fluid border-bottom mt-4"
            style={{ marginBottom: "20px" }}
          >
            <h3 className="member-heading" style={{ cursor: "pointer" }}>
              <IoMdArrowBack
                className="back-icon"
                style={{ fontSize: "24px", marginLeft: "5px" }}
                onClick={toggle}
              />
              Your family group details
            </h3>
          </div>

          <div
            className="container border invite"
            style={{ maxWidth: "600px", borderRadius: "8px" }}
          >
            <div className="list-group-item list-group-item-action d-flex gap-3 py-3">
              <div
                className="rounded-circle d-flex justify-content-center align-items-center flex-shrink-0"
                style={{
                  background: profileLogoColor,
                  width: "38px",
                  height: "38px",
                }}
              >
                <p className="m-0" style={{ color: "white" }}>
                  {logo}
                </p>
              </div>

              <div className="d-flex w-100 align-items-start flex-column">
                <div className="member-info">
                  <h6 className="mb-0" style={{ textAlign: "left" }}>
                    {username}
                  </h6>
                </div>
                <div className="member-info">
                  <p className="mb-0 opacity-75">{email}</p>
                </div>
                <div className="member-info">
                  <p className="mb-0 opacity-75">{role}</p>
                </div>
              </div>
            </div>

            <div>
              <p>{delMessage[idx.current]}</p>
            </div>

            <button
              type="button"
              className="btn btn-outline-secondary"
              style={{ color: "blue", marginBottom: "10px", marginTop: "10px" }}
              onClick={() => {
                deleteMember();
              }}
            >
              <RiDeleteBinLine style={{ fontSize: "20px" }} />
              &nbsp;
              {role === "Member" && userRole === "Family Manager"
                ? "Remove Member"
                : delbtnMessage[idx.current && role]}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div
            className="container-fluid border-bottom mt-4"
            style={{ marginBottom: "20px" }}
          >
            <h3 className="member-heading" style={{ cursor: "pointer" }}>
              <Link to="/home/dashboard">
                <IoMdArrowBack
                  className="back-icon"
                  style={{
                    fontSize: "24px",
                    marginLeft: "5px",
                    color: "black",
                  }}
                />
              </Link>
              Your family on IntelliHome
            </h3>
          </div>

          <Members
            handleGroupClick={handleGroupClick}
            handleInvitation={handleInvitation}
            role_de_baba={role_dede_baba}
          />
          <br />
          <DeleteGroup userRole={userRole} />
        </div>
      )}
    </>
  );
};

export default MemberSection;
