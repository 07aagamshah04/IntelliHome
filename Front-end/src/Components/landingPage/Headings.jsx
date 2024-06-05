import Heading from "./Heading";
import family_1 from "../../assets/family-1.jpg";
import family_2 from "../../assets/family-2.jpg";
import family_3 from "../../assets/family-3.jpg";
const heading = [
  [
    "Event Management and Family Interaction",
    "This category includes tools for keeping family members organized and connected. It features a dashboard for scheduling and managing events, as well as a group chat for family communication.",
  ],
  [
    "Healthcare Guidance and Well-being",
    "Focused on promoting family health, this category provides a comprehensive healthcare chatbot that offers personalized guidance. Users can input detailed information about their symptoms, allergies, and vital signs, upon which the chatbot suggests appropriate mitigation measures. It also advises on necessary specialists or lab tests.",
  ],
  [
    "Memory Sharing and Secure Document Storage",
    "This category helps families preserve memories and secure important documents. It includes a blog for sharing personal stories and a secure storage feature for important documents like ID cards and certificates.",
  ],
];

const images = [family_1, family_2, family_3];
const Headings = () => {
  return (
    <div className="container marketing" id="about">
      {heading.map((pair, index) => (
        <Heading
          key={pair[0]}
          head={pair[0]}
          body={pair[1]}
          image={images[index]}
        />
      ))}
      {/* Call the incrementFlag function to update the flag state */}
    </div>
  );
};

export default Headings;
