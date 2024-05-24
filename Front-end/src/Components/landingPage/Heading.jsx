/* eslint-disable react/prop-types */
const Heading = ({ head, body, image }) => {
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
          <p className="lead">{body}</p>
        </div>
      </div>
      <hr className="featurette-divider"></hr>
    </>
  );
};
export default Heading;
