import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Frontend runs completely independently of the backend's tech stack.
// It only needs to know the backend's base URL (see src/api/chatApi.js).
export default defineConfig({
  plugins: [react()],
  // server: {
  //   port: 5173,
  // },
  base: "/hospital-chat-frontend"

});
