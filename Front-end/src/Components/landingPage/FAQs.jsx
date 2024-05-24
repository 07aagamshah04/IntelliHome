import { useState } from "react";

const Faqs = () => {
  // Define FAQs data
  const faqs = [
    {
      question: "How does the health care chatbot work?",
      answer:
        "Our health care chatbot provides personalized health advice and assistance based on user input. It can answer health-related questions, provide medication reminders, and offer guidance on maintaining a healthy lifestyle.",
    },
    {
      question: "How does IntellHome handle digital documents and records?",
      answer:
        "IntellHome provides a secure platform for storing and organizing digital documents such as contracts, receipts, insurance policies, and medical records. Users can access their documents from anywhere, and IntellHome ensures data security and privacy.",
    },
    {
      question: " How does IntellHome handle emergencies?",
      answer:
        " In case of emergencies, IntellHome allows users to quickly send alerts and notifications to all household members via email. This feature ensures that everyone is informed and can take appropriate action in emergency situations.",
    },
  ];

  // State to manage active FAQ
  const [activeFaq, setActiveFaq] = useState(null);

  // Function to toggle active FAQ
  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="faq_area section_padding_130" id="faq">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-lg-6">
            <div
              className="section_heading text-center wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <h3>
                <span>Frequently </span> Asked Questions
              </h3>
              <p>Find your answers below or contact us for more information!</p>
              <div className="line"></div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-lg-8">
            <div className="accordion faq-accordian" id="faqAccordion">
              {/* Map through FAQs and generate FAQ cards */}
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="card border-0 wow fadeInUp"
                  data-wow-delay={`0.${index + 2}s`}
                >
                  <div className="card-header" id={`heading${index}`}>
                    <h6
                      className={`mb-0 ${
                        activeFaq === index ? "" : "collapsed"
                      }`}
                      data-toggle="collapse"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={activeFaq === index ? "true" : "false"}
                      aria-controls={`collapse${index}`}
                    >
                      {faq.question}
                      <span className="lni-chevron-up"></span>
                    </h6>
                  </div>
                  <div
                    className={`collapse ${activeFaq === index ? "show" : ""}`}
                    id={`collapse${index}`}
                    aria-labelledby={`heading${index}`}
                    data-parent="#faqAccordion"
                  >
                    <div className="card-body">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="support-button text-center d-flex align-items-center justify-content-center mt-4 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <i className="lni-emoji-sad"></i>
              <p className="mb-0 px-2">Cant find your answers?</p>
              <a href="#"> Contact us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
