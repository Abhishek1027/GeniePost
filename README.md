![GeniePost](https://github.com/user-attachments/assets/1cd2ed11-cc8d-4b9c-b919-2254e19be33c)


# GeniePost

GeniePost is a web-based email application developed using the MERN stack (MongoDB, Express.js, React, Node.js). It features a user-friendly interface with essential email management capabilities and advanced functionalities like automated email drafting and response suggestions powered by Gemini's Large Language Model (LLM).

## Features

- **User Authentication**: Secure login and registration with OAuth.
- **Email Management**: Send, receive, and organize emails.
- **Real-Time Notifications**: Get updates on new messages and events.
- **Automated Drafting**: Generate email drafts and suggestions using Gemini's LLM.
- **Responsive Design**: Accessible and functional on various devices.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript, React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **APIs**: Gemini's Large Language Model (LLM), OAuth
- **Real-Time**: Socket.io

## Getting Started

### Prerequisites

- Node.js (version 14.x or higher)
- MongoDB (running locally or a cloud instance)
- Git

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/geniepost.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd geniepost
    ```

3. **Install dependencies:**

    - For the backend:

        ```bash
        cd backend
        npm install
        ```

    - For the frontend:

        ```bash
        cd ../frontend
        npm install
        ```

4. **Set up environment variables:**

    Create a `.env` file in the `backend` directory and add the following:

    ```
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    GEMINI_API_KEY=your_gemini_api_key
    ```

5. **Start the development servers:**

    - Backend:

        ```bash
        cd backend
        npm start
        ```

    - Frontend:

        ```bash
        cd ../frontend
        npm start
        ```

    The application should now be running on `http://localhost:3000`.

## Usage

- **Login/Register**: Use OAuth for authentication.
- **Manage Emails**: Compose, send, and receive emails.
- **Real-Time Updates**: Notifications for new messages.
- **Draft Emails**: Use the AI features to draft and suggest responses.



## Acknowledgments

- **Gemini's Large Language Model** for advanced email drafting capabilities.
- **Socket.io** for real-time communication.

