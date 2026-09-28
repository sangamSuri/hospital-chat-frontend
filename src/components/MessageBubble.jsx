import React from "react";

/**
 * MessageBubble
 * --------------
 * Purely presentational component: renders one chat message.
 * Props: { sender: "user" | "bot", message: string }
 */
export default function MessageBubble({ sender, message }) {
  const isUser = sender === "user";
  return (
    <div className={`bubble-row ${isUser ? "bubble-row--user" : "bubble-row--bot"}`}>
      <div className={`bubble ${isUser ? "bubble--user" : "bubble--bot"}`}>
        {message}
      </div>
    </div>
  );
}
