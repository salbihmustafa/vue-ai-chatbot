<template>
  <div id="app">
    <h1>AI Chatbot</h1>
    <div class="chat-window">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <strong v-if="message.sender === 'user'">You:</strong>
        <strong v-else>Bot:</strong>
        <span>{{ message.text }}</span>
      </div>
    </div>
    <div class="input-container">
      <input v-model="userMessage" @keyup.enter="sendMessage" placeholder="Type your message..." />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userMessage: '',
      messages: [],
    };
  },
  methods: {
    async sendMessage() {
      if (this.userMessage.trim() === '') return;

      // Add the user's message to the chat
      this.messages.push({ sender: 'user', text: this.userMessage });

      try {
        const response = await axios.post('http://localhost:3000/chat', {
          message: this.userMessage,
        });

        // Add the bot's response to the chat
        this.messages.push({ sender: 'bot', text: response.data.message });
      } catch (error) {
        console.error('Error:', error);
        this.messages.push({ sender: 'bot', text: 'Error getting response from chatbot.' });
      }

      // Clear the input field
      this.userMessage = '';
    },
  },
};
</script>

<style>
/* Root elements should take up full width and height */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

/* Ensure the app container takes the full viewport width */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Take the full height of the viewport */
  width: 100vw; /* Ensure full width of viewport */
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.chat-window {
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 100%;
  max-width: 900px; /* Wider for larger screens */
  height: 500px; /* Taller for larger screens */
  padding: 20px;
  margin-bottom: 20px;
  overflow-y: auto;
  background-color: #f9f9f9;
}

.message {
  margin-bottom: 15px;
}

.message strong {
  display: inline-block;
  margin-right: 10px;
}

.input-container {
  display: flex;
  width: 100%;
  max-width: 900px; /* Widen the input container for desktops */
}

input {
  flex: 1;
  padding: 15px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
  box-sizing: border-box;
  outline: none;
}

input:focus {
  border-color: #007bff;
}

button {
  padding: 15px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0 5px 5px 0;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

/* Responsive design for smaller screens */
@media (max-width: 900px) {
  .chat-window {
    max-width: 100%; /* Take the full width of the container */
    height: 400px; /* Slightly shorter height on smaller screens */
  }

  .input-container {
    max-width: 100%; /* Take the full width of the container */
  }
}

@media (max-width: 600px) {
  h1 {
    font-size: 2rem;
  }

  .chat-window {
    height: 300px;
    padding: 15px;
  }

  input {
    font-size: 0.9rem;
  }

  button {
    font-size: 0.9rem;
    padding: 15px;
  }
}
</style>
