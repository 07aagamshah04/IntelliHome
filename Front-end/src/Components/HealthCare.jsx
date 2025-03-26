/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { GoogleGenerativeAI } from "@google/generative-ai";
import html2pdf from "html2pdf.js";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ChatGptTypingLogo =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnbjCMu8Z0KvrJHXE1gOIKQ_X-EW7E1LJmng&usqp=CAU";

const HealthcareChatbot = () => {
  const [responseMarkdown, setResponseMarkdown] = useState("");
  const [input, setInput] = useState({
    currentSymptoms: "fever",
    medications: "paracetamol",
    allergies: "none",
    vitalSigns: "none",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // We'll reference the chatbot's response container
  const reportRef = useRef(null);

  const fetchBotResponse = async () => {
    setIsLoading(true);
    const { currentSymptoms, medications, allergies, vitalSigns } = input;

    if (!currentSymptoms || !medications || !allergies || !vitalSigns) {
      setIsLoading(false);
      setError("Please fill in all fields.");
      return;
    }

    setError("");

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      // Adjust the model name if needed:
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      const prompt = `Patient Information:
Current Symptoms: ${currentSymptoms}
Medications: ${medications}
Allergies: ${allergies}
Vital Signs: ${vitalSigns}

Retrieve Information:
- Possible Acute Disease
- Precautions
- Lab Tests
- Specialist to Consult`;

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });

      const text =
        result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received.";

      setResponseMarkdown(text);
    } catch (err) {
      console.error("Error fetching bot response:", err);
      setError("Error fetching bot response. Please try again later.");
    }

    setIsLoading(false);
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setInput({
      currentSymptoms: "",
      medications: "",
      allergies: "",
      vitalSigns: "",
    });
    setResponseMarkdown("");
  };

  // Use html2pdf.js to generate a PDF of the rendered Markdown
  const downloadReport = () => {
    if (!reportRef.current) return;

    const element = reportRef.current; // The element to convert to PDF
    const options = {
      margin: 0.5, // inches
      filename: "healthcare-report.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 }, // Increase scale for sharper text
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Generate the PDF and automatically download it
    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="container mt-5">
      <div className="row d-flex align-items-stretch">
        {/* LEFT SIDE: Input Form */}
        <div className="col-md-6 border rounded p-3 d-flex flex-column">
          <h3>Healthcare Information</h3>
          <form className="flex-grow-1 d-flex flex-column">
            <div className="mb-3">
              <label htmlFor="currentSymptoms" className="form-label">
                Current Symptoms
              </label>
              <textarea
                className="form-control flex-grow-1"
                id="currentSymptoms"
                name="currentSymptoms"
                value={input.currentSymptoms}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="medications" className="form-label">
                Medications
              </label>
              <textarea
                className="form-control flex-grow-1"
                id="medications"
                name="medications"
                value={input.medications}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="allergies" className="form-label">
                Allergies
              </label>
              <textarea
                className="form-control flex-grow-1"
                id="allergies"
                name="allergies"
                value={input.allergies}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="vitalSigns" className="form-label">
                Vital Signs
              </label>
              <textarea
                className="form-control flex-grow-1"
                id="vitalSigns"
                name="vitalSigns"
                value={input.vitalSigns}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-primary me-2"
                onClick={fetchBotResponse}
              >
                Submit and Analyze
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT SIDE: Chatbot Response */}
        <div className="col-md-6 border rounded p-3 d-flex flex-column mt-md-0 mt-3">
          <h3>Chatbot Response</h3>
          <div className="messages flex-grow-1 d-flex flex-column">
            {isLoading && (
              <div className="d-flex align-items-center mb-3">
                <img
                  src={ChatGptTypingLogo}
                  alt="ChatGPT Typing"
                  className="me-1 rounded-circle"
                  style={{ width: "60px", height: "50px" }}
                />
                <span> is generating...</span>
              </div>
            )}

            {responseMarkdown && (
              <>
                {/* 
                  We'll render the markdown in a container that 
                  is referenced by reportRef for PDF generation. 
                */}
                <div ref={reportRef} className="chatbot-response mb-3">
                  <ReactMarkdown>{responseMarkdown}</ReactMarkdown>
                </div>
                <button className="btn btn-success" onClick={downloadReport}>
                  Download Report as PDF
                </button>
              </>
            )}

            {error && <div className="error text-danger">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthcareChatbot;
