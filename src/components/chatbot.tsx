import { useState, useEffect } from "react";
import { X, Send, ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import Lottie from "lottie-react";
import foxey from "./Animation - 1742926868203.json"; // Ensure correct path for the animation

// Predefined queries & responses
const predefinedQueries = [
  { query: "How does the job scam detection work?", answer: "Our AI scans job listings for red flags using NLP and ML techniques." },
  { query: "What are red flags in job postings?", answer: "Common red flags include unrealistic salaries, vague job descriptions, and upfront payment requests." },
  { query: "Is this job listing legitimate?", answer: "Provide the job details, and we can analyze it for suspicious patterns." },
  { query: "How can I report a scam?", answer: "You can report a scam using our 'Report Job' feature on the website." },
  { query: "What features does JobOrJoke offer?", answer: "We provide AI-driven scam detection, salary comparison, and employer verification." }
];

// Sample chatbot responses
const responses = [
  "That's interesting! Tell me more. 😊",
  "I'm here to help! Do you need job scam detection tips? 🤖",
  "I can analyze job descriptions for you! Just send the details. 🧐",
  "Good question! I will try my best to assist you. 🔍"
];

// Random greeting messages
const greetings = [
  "Hello! 👋 How can I help you today?",
  "Hey there! 😊 Need any job scam detection tips?",
  "Hi! 👀 Looking for job safety advice?",
  "Greetings! 🛡️ How can I assist you today?"
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: greetings[Math.floor(Math.random() * greetings.length)], sender: "bot" }]);
  const [input, setInput] = useState("");
  const [showQueries, setShowQueries] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark mode from the document root
  useEffect(() => {
    const checkDarkMode = () => setIsDarkMode(document.documentElement.classList.contains("dark"));
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Handle user selecting a predefined query
  const handleQuerySelect = (query: string, answer: string) => {
    setMessages([...messages, { text: query, sender: "user" }, { text: answer, sender: "bot" }]);
    setShowQueries(false);
  };

  // Handle user sending a message
  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const updatedMessages = [...messages, { text: input, sender: "user" }];
    setInput("");

    // Find a predefined response or use a generic response
    const foundResponse = predefinedQueries.find(q => q.query.toLowerCase() === input.toLowerCase())?.answer;
    const botResponse = foundResponse || responses[Math.floor(Math.random() * responses.length)];

    setMessages([...updatedMessages, { text: botResponse, sender: "bot" }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Chatbot Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center space-x-2 p-0 rounded-full shadow-lg transition-all hover:scale-105 ${
            isDarkMode ? "bg-blue-500 text-white" : "bg-blue-500 text-white"
          }`}
        >
          <Lottie animationData={foxey} style={{ width: 50, height: 50 }} loop={true} />
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className={`w-80 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-xl rounded-lg overflow-hidden`}>
          {/* Header */}
          <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🦊 Foxey</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-600 dark:text-gray-400 hover:text-red-500">
              <X size={20} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-3 h-64 overflow-y-auto flex flex-col gap-2">
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 rounded-md max-w-[80%] ${msg.sender === "user" ? "ml-auto bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"}`}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Query Selection Button */}
          <div className="p-3 border-t border-gray-300 dark:border-gray-700">
            <button
              onClick={() => setShowQueries(!showQueries)}
              className="w-full flex items-center justify-between bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded-md"
            >
              Select a Query
              {showQueries ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {/* Query List */}
            {showQueries && (
              <div className="mt-2 border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
                {predefinedQueries.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuerySelect(item.query, item.answer)}
                    className="block w-full text-left p-2 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {item.query}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Input Field */}
          <div className="p-3 border-t border-gray-300 dark:border-gray-700 flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 rounded-md border dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button onClick={handleSendMessage} className="ml-2 text-blue-500 hover:text-blue-700">
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
