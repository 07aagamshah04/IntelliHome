const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

// Exporting variable from .env
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

// Middleware to parse JSON bodies with increased limit
app.use(express.json({ limit: "50mb" }));

// Middleware to parse URL-encoded bodies with increased limit
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// CORS middleware
app.use(
  cors({
    // origin: "*", // Allow all origins. Replace with specific origin for production.
    origin: "http://localhost:5173", // Allow only this origin to access your backend
    optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // If your requests require cookies or other credentials
  })
);

// Ensure cookie-parser is used before your authentication middleware
app.use(cookieParser());

// Use the authentication middleware
app.use(checkForAuthenticationCookie("token"));

// To connect with MongoDB file we would export connection module
const { ConnectMongoDB } = require("./connection");

// Inbuilt routes
const Myusers = require("./routes/users");
const Pages = require("./routes/page");
const Family = require("./routes/familysettings");
const Events = require("./routes/dashboard");
const Blogs = require("./routes/blogs");
// const Chats = require("./routes/chat");

// Connection with mongoose
ConnectMongoDB(MONGO_URL)
  .then(() => {
    console.log("DATABASE CONNECTED SUCCESSFULLY");
  })
  .catch((error) => {
    console.log("mongoose error", error);
  });

// Routes
app.use("/api", Pages);
app.use("/api/users", Myusers);
app.use("/api/family-settings", Family);
app.use("/api/dashboard", Events);
app.use("/api/blogs", Blogs);
// app.use("/api/chats", Chats);

app.listen(PORT, () => {
  console.log(`SERVER STARTED AT ${PORT}`);
});
