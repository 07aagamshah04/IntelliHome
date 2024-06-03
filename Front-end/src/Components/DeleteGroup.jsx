import { RiDeleteBinLine } from "react-icons/ri";
import image from "../assets/5220.jpg";
const DeleteGroup = ({ userRole }) => {
  const handleDeleteClickForGroup = () => {
    // event.preventDefault();
    alert(userRole);
    if (userRole === "Family Manager") {
    } else {
      alert("Only Manager can delete it!!");
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
