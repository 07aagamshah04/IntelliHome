/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const ChatGptTypingLogo =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnbjCMu8Z0KvrJHXE1gOIKQ_X-EW7E1LJmng&usqp=CAU";

const HealthcareChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState({
    currentSymptoms: "",
    medications: "",
    allergies: "",
    vitalSigns: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   fetchBotResponse(); // Call the function when the component mounts
  // }, []);

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
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + API_KEY,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: "You are a healthcare chatbot." },
              {
                role: "user",
                content: `Patient Information:\nCurrent Symptoms: ${currentSymptoms}\nMedications: ${medications}\nAllergies: ${allergies}\nVital Signs: ${vitalSigns}`,
              },
              {
                role: "system",
                content:
                  "Retrieve Information:\n- Possible Acute Disease\n- Precautions\n- Lab Tests\n- Specialist to Consults",
              },
            ],
            max_tokens: 400, // Adjust max_tokens based on desired response length
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      // Parse and format the response
      const formattedResponse = {
        data: "",
      };

      data.choices.forEach((choice) => {
        formattedResponse["data"] = choice.message.content;
      });

      const myarr = formattedResponse.data.split("\n");
      setMessages(myarr);
    } catch (error) {
      console.error("Error fetching bot response:", error);
      setError("Error fetching bot response. Please try again later.");
    }

    setIsLoading(false); // Set isLoading back to false after fetching data
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
    setMessages([]);
  };

  return (
    <div className="container mt-5">
      <div className="row d-flex">
        <div className="col-md-6 border rounded p-3">
          <h3>Healthcare Information</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="currentSymptoms" className="form-label">
                Current Symptoms
              </label>
              <textarea
                className="form-control"
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
                className="form-control"
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
                className="form-control"
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
                className="form-control"
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
        <div className="col-md-6 border rounded p-3 d-flex flex-column justify-content-between mt-md-0 mt-3">
          <div>
            <h3>Chatbot Response</h3>
            <div className="messages">
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
              {messages.map(
                (message, index) =>
                  message !== "" && (
                    <div key={index} className={`message ${message.author}`}>
                      {`->${message}\n`}
                    </div>
                  )
              )}
              {error && <div className="error">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthcareChatbot;
