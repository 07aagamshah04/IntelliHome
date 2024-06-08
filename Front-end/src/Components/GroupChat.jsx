import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

const GroupChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [payload, setPayload] = useState({});
  const messagesEndRef = useRef(null);

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
      return null;
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom on initial load and when messages change
  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const token = localStorage.getItem("token");
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
          setMessages(data);
        } else {
          toast.error("Error fetching data!!");
        }
      } catch (error) {
        toast.error("Error fetching the data!!");
      }
    };

    setPayload(payload);

    socket.on("connect", () => {
      // toast.success("Welcome to the Chat!", {
      //   position: toast.position,
      // });
    });

    socket.emit("join-room", payload.familyId);

    socket.on("receive-message", (data) => {
      setMessages((messages) => [...messages, data]);
    });

    fetchData();

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const generateSenderColor = (name) => {
    const colors = ["#5ECF9C", "#53BDEB", "#E542A3", "#08BA67", "#F7A22E"];
    const hash = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = hash % colors.length;
    return colors[index];
  };

  // Function to format the timestamp to HH:mm AM/PM format
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format
    const formattedTime = `${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${ampm}`;
    return formattedTime;
  };

  return (
    <div className="group-chat-container">
      <div className="message-container">
        {messages.map((message, index) => {
          const isSelf = message.SendedBy === payload.userName;
          const name = message.SendedBy.split(" ");
          const logo = name[0][0].toUpperCase() + name[1][0].toUpperCase();
          const senderColor = generateSenderColor(message.SendedBy);
          return (
            <div key={index} className={`message ${isSelf ? "self" : "other"}`}>
              <div
                className="logo-container"
                style={{ backgroundColor: senderColor }}
              >
                {logo}
              </div>
              <div
                className="text"
                style={{ backgroundColor: isSelf ? "#dcf8c6" : "#fff" }}
              >
                <div className="sender" style={{ color: senderColor }}>
                  {message.SendedBy}
                </div>
                <div className="message-text large">{message.text}</div>
                <div className="timestamp small" style={{ color: "gray" }}>
                  {formatTimestamp(message.timestamp)}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
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
