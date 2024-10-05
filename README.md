# AI Chatbot using Vue.js and Node.js

This project is a simple AI-powered chatbot built with **Vue.js** for the frontend and **Node.js** for the backend. The chatbot integrates with **Cohere's AI API** to generate real-time conversational responses. The application is responsive and works on both desktop and mobile devices, providing a seamless user experience.

## Features
- Real-time chat with an AI chatbot.
- Responsive design for both desktop and mobile views.
- Built with Vue.js for the frontend and Node.js (Express) for the backend.
- Uses Cohere's AI language model to generate chatbot responses.

## Technologies Used
- **Vue.js** (Frontend)
- **Node.js** and **Express.js** (Backend)
- **Axios** (For handling HTTP requests)
- **Cohere AI API** (For natural language response generation)

## Demo
Run the project locally to interact with the AI chatbot. Follow the instructions below to set up the project.

## Setup Instructions

### Prerequisites
Before you begin, make sure you have the following installed:
- **Node.js** (v14.x or later)
- **npm** (v6.x or later)

### 1. Clone the repository
First, clone the project repository from GitHub:
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

### 2. Install dependencies
Navigate to the root folder of the project and install all necessary dependencies
npm install

### 3. Setup the .env file
Create a .env file in the root of your project to store your Cohere API Key. Add the following line to the .env file:
COHERE_API_KEY=your-cohere-api-key-here
Make sure this file is not tracked by Git, as it contains sensitive information (it's already included in .gitignore).

### 4. Run the backend server
node server.js
The backend will be running on http://localhost:3000

### 5. Run the frontend (Vue.js)
To start the Vue.js development server for the frontend:
npm run serve
By default, the frontend will be available at http://localhost:8080

### 6. Usage
- Open your browser and go to http://localhost:8080.
- Start chatting with the AI chatbot by typing a message in the input field and pressing Send or Enter.

Project Structure
- server.js: Backend server code that handles API requests and communicates with Cohere's AI API.
- src/: Vue.js frontend source code, including the chat UI.
- .env: This file stores environment variables like API keys (this file is ignored by Git and should not be committed).

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute this project for personal or commercial purposes, provided that the original copyright notice and permission notice are included in all copies or substantial portions of the software.

**MIT License**



