# IntelliHome - Comprehensive Family Management System

IntelliHome is a sophisticated family management system built with the MERN stack, designed to simplify and enhance family life through a suite of integrated, user-friendly features. This project enables users to manage events, share memories, store important documents, and much more.

## Demo

Link of youtube coming soon...

## Features

- **Real-time collaboration:** Manage family events, share memories, and communicate seamlessly.
- **Secure registration and sign-in:** Incorporates two-factor authentication (2FA) via email OTP and JWT token generation.
- **Dynamic calendar management:** Add, edit, and manage events with real-time database updates.
- **Blogs:** Share memories with options to add photos, titles, and text.
- **Chat application:** Real-time communication using Socket.io.
- **IntelliVault:** Securely store important documents like Aadhar cards, PAN cards, voter IDs, marksheets, and licenses.
- **Healthcare:** Integrates with the ChatGPT API to provide tailored healthcare responses.
- **Family settings:** Manage family members with options to invite, add, or remove members, and delete the entire group.

## Tech Stack

- **React.js**: For building user interfaces.
- **Node.js**: For server-side logic.
- **Express.js**: For building RESTful APIs.
- **MongoDB**: As the primary database.
- **Socket.io**: For real-time communication.
- **Bootstrap**: For responsive design and layout.
- **JWT**: For secure user authentication.
- **NodeMailer**: For sending emails.
- **CSS**: For custom styling.
- **Netlify**: For deploying the frontend.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/07aagamshah04/IntelliHome.git
   ```
2. Install Dependencies
   ```bash
   npm install
   ```
3. Populate .env in main file
   You'll be needing **following** values

   ```
   OPEN_API_KEY= (for e.g. chatgpt api key)
   EMAIL=
   PASSWORD=
   MONGO_URL=
   PORT=
   SECRET = (for generation of hash password)
   ```
