import Heading from "./Heading";
import family_1 from "../../assets/family-1.jpg";
import family_2 from "../../assets/family-2.jpg";
import family_3 from "../../assets/family-3.jpg";
const heading = [
  [
    "Home Management and Organization",
    "This category can include features such as home inventory management, grocery list organization, and digital document storage. It focuses on helping users streamline their household tasks and keep track of important information related to their home life.",
  ],
  [
    "Family Health and Well-being",
    "Under this heading, you can include features related to health care assistance, including the health care chatbot, emergency notifications, and tools for managing health records. It emphasizes promoting the health and well-being of all family members.",
  ],
  [
    "Personal Finance and Security",
    "This category encompasses features related to financial management, such as tracking expenses, budgeting, and accessing financial information securely. It also includes security-related features like password management and emergency notifications to ensure the safety and security of users' personal information and finances.",
  ],
];
const images = [family_1, family_2, family_3];
const Headings = () => {
  return (
    <div className="container marketing">
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
