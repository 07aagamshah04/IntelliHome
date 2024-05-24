/* eslint-disable react/prop-types */

const ServiceCard = ({ heading, imageUrl }) => {
  return (
    <div className="service-card mb-4">
      <img
        src={imageUrl}
        className="bd-placeholder-img"
        width="140"
        height="140"
        alt="Service"
        style={{ borderRadius: "10px", background: "white" }}
      />
      <h2 className="fw-normal">{heading}</h2>
    </div>
  );
};

export default ServiceCard;
