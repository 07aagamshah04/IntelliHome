require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

//Exporting variable from .env
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

// Middleware to parse JSON bodies with increased limit
app.use(express.json({ limit: "50mb" }));

// Middleware to parse URL-encoded bodies with increased limit
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only this origin to access your backend
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // If your requests require cookies or other credentials
  })
);
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

//To connect with MongoDB file we would export connection module
const { ConnectMongoDB } = require("./connection");

//Inbuilt routes
const Myusers = require("./routes/users");
const Pages = require("./routes/page");

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

app.listen(PORT, () => {
  console.log(`SERVER STARTED AT ${PORT}`);
});
