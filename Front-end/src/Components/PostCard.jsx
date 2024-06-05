/* eslint-disable react/prop-types */
import { RiDeleteBinLine } from "react-icons/ri";
import styles from "../Modules/PostCard.module.css";
const PostCard = ({ head, body, image, id, handleDelete }) => {
  const handleclick = () => {
    handleDelete(id);
  };
  return (
    <>
      <div className="row featurette">
        <div className="col-md-5">
          <img
            src={image}
            className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
            width="500"
            height="500"
            alt="Placeholder"
            style={{
              borderRadius: "10px", // Add border-radius to the image
              objectFit: "cover", // Ensure the image covers the container
            }}
          />
        </div>
        <div className="col-md-7 ">
          <h2 className="featurette-heading fw-normal lh-1 mt-4">{head}</h2>
          <p className="lead">&quot;{body}&quot;</p>

          <button
            type="button"
            className={`btn ${styles.button} btn-outline-secondary`}
            style={{ color: "gray", marginBottom: "10px", marginTop: "10px" }}
            onClick={() => {
              handleclick();
            }}
          >
            <RiDeleteBinLine style={{ fontSize: "20px" }} />
            &nbsp;Delete post
          </button>
        </div>
      </div>
      <hr className="featurette-divider"></hr>
    </>
  );
};
export default PostCard;
