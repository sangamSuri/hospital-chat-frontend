import React, { useState } from "react";

/**
 * MessageInput
 * -------------
 * Controlled text input + send button. Knows nothing about the API -
 * it just calls the onSend(text) callback passed in by the parent
 * (ChatWindow), keeping it fully reusable/testable in isolation.
 */
export default function MessageInput({ onSend, disabled }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        placeholder="Type your message... (e.g. 'book an appointment')"
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
      />
      <button type="submit" disabled={disabled || !text.trim()}>
        Send
      </button>
    </form>
  );
}
