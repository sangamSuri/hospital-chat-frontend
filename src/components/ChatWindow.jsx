import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import MessageBubble from "./MessageBubble.jsx";
import MessageInput from "./MessageInput.jsx";
import { sendMessage } from "../api/chatApi.js";

/**
 * ChatWindow
 * -----------
 * The main "smart" component: owns conversation state (messages,
 * loading, session id) and talks to the backend exclusively through
 * `chatApi.js`. It never imports anything about how the backend
 * predicts intents - that is entirely the backend's concern.
 */
export default function ChatWindow() {
  const [sessionId] = useState(() => uuidv4());
  const [messages, setMessages] = useState([
    { sender: "bot", message: "Hi! I'm the City Hospital assistant. How can I help you today?" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text) => {
    setMessages((prev) => [...prev, { sender: "user", message: text }]);
    setLoading(true);
    setError(null);
    try {
      const data = await sendMessage(sessionId, text);
      setMessages((prev) => [...prev, { sender: "bot", message: data.reply }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-window">
      <header className="chat-header">
        <h1>🏥 City Hospital Assistant</h1>
      </header>

      <div className="chat-body">
        {messages.map((m, idx) => (
          <MessageBubble key={idx} sender={m.sender} message={m.message} />
        ))}
        {loading && <MessageBubble sender="bot" message="Typing..." />}
        <div ref={bottomRef} />
      </div>

      {error && <div className="chat-error">{error}</div>}

      <MessageInput onSend={handleSend} disabled={loading} />
    </div>
  );
}
