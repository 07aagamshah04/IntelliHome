import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { toast } from "react-toastify";

const profileLogoColors = [
  "#2E8B57", // Sea Green
  "#1E90FF", // Dodger Blue
  "#8A2BE2", // Blue Violet
  "#4682B4", // Steel Blue
  "#556B2F", // Dark Olive Green
  "#483D8B", // Dark Slate Blue
];

const MemberProfile = ({
  logo,
  username,
  role,
  index,
  email,
  user,
  userRole,
  handleGroupClick,
}) => {
  const [flag, setFlag] = useState(true);
  const [profileLogoColor, setprofileLogoColor] = useState("");
  const handleClick = () => {
    const color = profileLogoColors[index]; // Access the color from the array
    setprofileLogoColor(color); // Set the profile logo color
    handleGroupClick({
      username,
      logo,
      role,
      email,
      user,
      userRole,
      profileLogoColor: color,
    });
  };

  return (
    <>
      {flag ? (
        <div className="member-profile">
          <div
            className="list-group-item list-group-item-action d-flex gap-3 py-3"
            onClick={handleClick} // No need to pass event here
          >
            <div
              className="rounded-circle d-flex justify-content-center align-items-center flex-shrink-0"
              style={{
                background: profileLogoColors[index],
                width: "38px",
                height: "38px",
              }}
            >
              <p className="m-0" style={{ color: "white" }}>
                {logo}
              </p>
            </div>

            <div className="d-flex w-100 align-items-center member-flex">
              <div className="member-info">
                <h6 className="mb-0">{username}</h6>
              </div>
              <div className="member-info">
                <p className="mb-0 opacity-75">{role}</p>
              </div>
            </div>

            {/* Arrow */}
            <small
              className="opacity-50 text-nowrap"
              style={{ fontSize: "25px" }}
            >
              <IoIosArrowForward />
            </small>
          </div>
        </div>
      ) : (
        <div onClick={handleClick} style={{ cursor: "pointer" }}>
          Click me
        </div>
      )}
    </>
  );
};

export default MemberProfile;
