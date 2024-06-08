/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { RiDeleteBinLine } from "react-icons/ri";
import image from "../assets/5220.jpg";
import { toast } from "react-toastify";

const DeleteGroup = ({ userRole }) => {
  const handleDeleteClickForGroup = async () => {
    if (userRole === "Family Manager") {
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
      toast.error("Only Manager can delete it!!", {
        position: toast.position,
      });
      return;
    }
  };

  return (
    <div
      className="container border"
      style={{ maxWidth: "1000px", borderRadius: "8px" }}
    >
      <div className="header" style={{ marginTop: "10px" }}>
        <div className="d-flex delete-image">
          <div>
            <h3 style={{ fontWeight: "400" }}>Delete your family group</h3>
            <p>
              You have the flexibility to delete your family group at any point.
              Once deleted, all members will no longer have access to the
              features and services on our platform that rely on the family
              group functionality.
            </p>
          </div>
          <div>
            <img src={image} alt="" height={"150px"} width={"600px"} />
          </div>
        </div>
        {/* <div
          className="line"
          style={{
            width: "100%",
            height: "2px",
            backgroundColor: "var(--bs-border-color)",
            // margin: "0px",
          }}
        ></div> */}
        <button
          type="button"
          className="btn btn-outline-secondary"
          style={{ color: "blue", marginBottom: "10px", marginTop: "10px" }}
          onClick={() => {
            handleDeleteClickForGroup();
          }}
        >
          <RiDeleteBinLine style={{ fontSize: "20px" }} />
          &nbsp;Delete your group
        </button>
      </div>
    </div>
  );
};

export default DeleteGroup;
