import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SupportChatProvider } from "./contexts/SupportChatContext.jsx";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";
import AppLoader from "./components/common/AppLoader.jsx";
import "leaflet/dist/leaflet.css";

// Check if Google OAuth is configured
const hasGoogleClientId = !!import.meta.env.VITE_GOOGLE_CLIENT_ID;
const fallbackClientId = "90770038046-jpumef82nch1o3amujieujs2m1hr73rt.apps.googleusercontent.com";
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || fallbackClientId;
const isUsingFallback = !hasGoogleClientId;

// Suppress Google OAuth library errors when using fallback client ID (development only)
if (isUsingFallback && import.meta.env.DEV) {
  // Filter console.error and console.warn for Google OAuth related errors
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  
  console.error = function(...args) {
    const message = String(args[0] || '');
    // Filter out Google OAuth library errors (GSI_LOGGER, origin not allowed, 403 errors)
    if (
      message.includes('GSI_LOGGER') ||
      message.includes('origin is not allowed') ||
      message.includes('credential_button_library') ||
      message.includes('button?type=standard') ||
      (args.length > 1 && String(args[1] || '').includes('403'))
    ) {
      // Suppress these specific errors - they're expected when OAuth isn't configured
      return;
    }
    // Allow all other errors through
    originalConsoleError.apply(console, args);
  };
  
  console.warn = function(...args) {
    const message = String(args[0] || '');
    // Filter out Google OAuth warnings
    if (
      message.includes('GSI_LOGGER') ||
      message.includes('origin is not allowed') ||
      message.includes('credential_button_library')
    ) {
      return;
    }
    originalConsoleWarn.apply(console, args);
  };
  
  // Warn once about configuration (only in development)
  if (!sessionStorage.getItem('google-warning-shown')) {
    sessionStorage.setItem('google-warning-shown', 'true');
    // Use setTimeout to ensure this runs after console override
    setTimeout(() => {
      console.group('ℹ️ Google OAuth Notice');
      console.info("VITE_GOOGLE_CLIENT_ID not configured. Google Sign-In button is visible but won't work.");
      console.info("To enable Google Sign-In:");
      console.info("1. Create a .env file with: VITE_GOOGLE_CLIENT_ID=your-client-id");
      console.info("2. Add http://localhost:5173 to Google Cloud Console authorized origins");
      console.info("Note: Google OAuth library errors (403, GSI_LOGGER) are expected and have been filtered.");
      console.groupEnd();
    }, 100);
  }
}

// App Root Component with Initial Loader
const AppRoot = () => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Hide loader after app initializes
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 500); // Small delay to ensure smooth transition

    return () => clearTimeout(timer);
  }, []);

  return (
    <StrictMode>
      <ErrorBoundary>
        {isInitialLoad && <AppLoader />}
        <Provider store={store}>
          <BrowserRouter>
            <GoogleOAuthProvider clientId={googleClientId}>
              <SupportChatProvider>
                <App />
              </SupportChatProvider>
            </GoogleOAuthProvider>
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")).render(<AppRoot />);
