import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SupportChatProvider } from "./contexts/SupportChatContext.jsx";
import "leaflet/dist/leaflet.css";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "90770038046-jpumef82nch1o3amujieujs2m1hr73rt.apps.googleusercontent.com";

// Warn if using fallback client ID
if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) {
  console.warn("⚠️ VITE_GOOGLE_CLIENT_ID not set in environment variables. Using fallback client ID.");
  console.warn("⚠️ Make sure to add your origin to Google Cloud Console authorized JavaScript origins:");
  console.warn("   - http://localhost:5173");
  console.warn("   - http://127.0.0.1:5173");
  console.warn("   - Your production domain (if applicable)");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={googleClientId}>
          <SupportChatProvider>
            <App />
          </SupportChatProvider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
