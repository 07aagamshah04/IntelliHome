import { useRef, useState } from "react";
import DeleteGroup from "./DeleteGroup";
import Members from "./Members";
import { IoMdArrowBack } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import InviteMembers from "./InviteMembers";
import { Link } from "react-router-dom";

const MemberSection = () => {
  const [flag, setFlag] = useState(true);
  const idx = useRef(0);
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [role, setrole] = useState("");
  const [logo, setlogo] = useState("");
  const [profileLogoColor, setprofileLogoColor] = useState("");
  const delMessage = [
    "If you delete your family group, all members will lose access to IntelliHome services that need a family group to work.",
    "If you leave your family group, you loose access to IntelliHome services. Are you sure?",
  ];
  const delbtnMessage = ["Delete family group", "Leave family group"];
  const [invitation, setInvitation] = useState(false);
  function handleInvitation(invite) {
    setInvitation(invite);
    console.log(invite);
  }
  function handleGroupClick({ username, email, role, logo, profileLogoColor }) {
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
    setFlag(!flag);
  }

  function toggle() {
    setFlag(!flag);
  }

  function handleInviteToggle(toggle) {
    setInvitation(!toggle);
  }
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
            >
              <RiDeleteBinLine style={{ fontSize: "20px" }} />
              &nbsp;{delbtnMessage[idx.current]}
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
          />
          <br />
          <DeleteGroup />
        </div>
      )}
    </>
  );
};

export default MemberSection;
