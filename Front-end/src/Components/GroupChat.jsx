import { useEffect, useMemo, useState} from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

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
        toast.error("Error fetching the data");
      }
    };

    setPayload(payload);

    socket.on("connect", () => {
      console.log("WebSocket connected");
    });

    socket.emit("join-room", payload.familyId);

    socket.on("receive-message", (data) => {
      setMessages((messages) => [...messages, data]);
    });

    fetchData();

    return () => {
      socket.disconnect();
      console.log("WebSocket disconnected");
    };
  }, [socket]);

  const generateSenderColor = (name) => {
    const colors = ["#5ECF9C", "#53BDEB", "#E542A3", "#08BA67", "#F7A22E"]; // List of colors
    const hash = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = hash % colors.length; // Use hash to select color index
    return colors[index]; // Return the selected color
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
                {message.text}
              </div>
            </div>
          );
        })}
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
