import HealthcareChatbot from "./HealthCare";
import Faqs from "./landingPage/FAQs";
import Footer from "./landingPage/Footer";
import Headings from "./landingPage/Headings";
import OverView from "./landingPage/Overview";
import OverviewNavbar from "./landingPage/Overview_navbar";
import Services from "./landingPage/Services";
// import RegistrationPage from "./RegisterPage";
// import SignInPage from "./SignInPage";

const Homepage = () => {
  return (
    <>
      <OverviewNavbar />
      <OverView />
      <Headings />
      <Services />
      <Faqs />
      <Footer />
    </>
  );
};

export default Homepage;
