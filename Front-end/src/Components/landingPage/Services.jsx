import ServiceCard from "./ServiceCard";
import health_image from "../../assets/healthcare.jpg";
import finance_image from "../../assets/finance.jpg";
import groupchat_image from "../../assets/groupchat.jpg";
import dashboard_image from "../../assets/dashboard.jpg";
import vault_image from "../../assets/vault.png";

const Services = () => {
  const services = [
    { heading: "HealthCare", imageUrl: health_image },
    { heading: "Blogs", imageUrl: finance_image },
    { heading: "GroupChat", imageUrl: groupchat_image },
    { heading: "Dashboard", imageUrl: dashboard_image },
    { heading: "IntelliVault", imageUrl: vault_image },
  ];

  return (
    <div className="container">
      <h1 className="text-center my-5">Our Services</h1>
      <div className="row justify-content-center text-center">
        {services.map((service, index) => (
          <div key={index} className="col-lg-2">
            <ServiceCard
              heading={service.heading}
              imageUrl={service.imageUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
