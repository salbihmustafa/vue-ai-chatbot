const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const rateLimit = require('express-rate-limit'); // Import the rate limit package
const { CohereClient } = require('cohere-ai'); // Import Cohere client

dotenv.config(); // Load .env file

// Initialize Cohere client with your API key from the .env file
const cohere = new CohereClient({
	token: process.env.COHERE_API_KEY
});

const app = express();
const port = 3000;

// Enable CORS for all requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Set up trust proxy (required if using reverse proxy like Nginx or Heroku)
app.set('trust proxy', 1);

// Set up rate limiter: maximum of 3 requests per minute
const limiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute window
	max: 3, // Limit each IP to 3 requests per minute
	message: 'Too many requests, please try again later.',
	handler: (req, res) => {
		console.log('Rate limit exceeded for IP:', req.ip); // Log the IP that exceeded rate limit
		res.status(429).json({ error: 'Too many requests, please try again later.' });
	}
});

// Apply the rate limiter to all requests
app.use(limiter);

// API route to handle chatbot requests using Cohere client
app.post('/chat', async (req, res) => {
	const userMessage = req.body.message;

	// Log the received message
	console.log(`Received message: ${userMessage}`);

	try {
		// Initialize chat history (you can modify this as needed)
		const chatHistory = [
			{ role: 'User', message: 'This is a test message, is this working?' },
			{ role: 'Chatbot', message: 'Yes, your message has been received, and I am able to respond! How can I assist you today?' }
		];

		// Stream the response from Cohere's chatStream
		const stream = await cohere.chatStream({
			model: 'command-r-08-2024', // Use the desired Cohere model
			message: userMessage,
			temperature: 0.3, // Set response creativity
			chatHistory: chatHistory, // Include your chat history
			promptTruncation: 'AUTO',
			connectors: [{ id: 'web-search' }] // You can adjust or remove connectors as needed
		});

		// Stream the chatbot response back to the frontend
		let botMessage = '';
		for await (const chat of stream) {
			if (chat.eventType === 'text-generation') {
				botMessage += chat.text;
			}
		}

		res.json({ message: botMessage.trim() });
	} catch (error) {
		console.error('Error during Cohere API call:', error.message || error.response.data);
		res.status(500).json({ error: 'Something went wrong on the server.' });
	}
});

// Start the server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});