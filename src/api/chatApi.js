/**
 * chatApi.js
 * -----------
 * The ONLY file in the frontend that knows the backend's URL and JSON
 * shape (see backend/app/schemas/chat.py for the contract). Every
 * component calls these functions instead of calling fetch()
 * directly - so if the backend URL, auth, or response shape changes,
 * only this file needs to be edited.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

export async function sendMessage(sessionId, message) {
  const res = await fetch(`${BASE_URL}/chat/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId, message }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to reach the assistant. Please try again.");
  }
  return res.json(); // { session_id, reply, intent, confidence, timestamp }
}

export async function fetchHistory(sessionId) {
  const res = await fetch(`${BASE_URL}/chat/history/${sessionId}`);
  if (!res.ok) throw new Error("Failed to load chat history");
  return res.json(); // { session_id, history: [...] }
}
