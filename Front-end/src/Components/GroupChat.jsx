import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
// import './GroupChat.css'; // Import CSS file for styling

const GroupChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [payload, setPayload] = useState({});

  const socket = useMemo(
    () =>
      io("http://localhost:5000", {
        withCredentials: true,
      }),
    []
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    socket.emit("message", {
      text: inputMessage,
      CreatedBy: payload.familyId,
      SendedBy: payload.userName,
    });
    setInputMessage("");
  };

  const parseJWT = (token) => {
    if (!token) return null;
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(window.atob(base64));
    } catch (e) {
      console.error("Failed to parse JWT", e);
      return null;
    }
  };

  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");
    // console.log('JWT Token:', token);

    // Parse the JWT token (assuming you have a function parseJWT)
    const payload = parseJWT(token);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/chats/${payload.familyId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          toast.error("Error fetching data!!", {
            position: toast.position,
          });
        }
      } catch (error) {
        toast.error("Error fetching the data", {
          position: toast.position,
        });
      }
    };

    setPayload(payload);

    // Setup WebSocket connection
    socket.on("connect", () => {
      console.log("WebSocket connected");
    });

    socket.emit("join-room", payload.familyId);

    socket.on("receive-message", (data) => {
      console.log(data);
      // setMessages((messages) => [...messages, data]);
    });

    fetchData();

    // Cleanup the WebSocket connection when the component unmounts
    return () => {
      socket.disconnect();
      console.log("WebSocket disconnected");
    };
  }, []);

  return (
    <div className="group-chat-container">
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default GroupChat;
