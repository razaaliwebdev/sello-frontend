import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HashRouter } from "react-router-dom";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <GoogleOAuthProvider clientId="90770038046-jpumef82nch1o3amujieujs2m1hr73rt.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </HashRouter>
    </Provider>
  </StrictMode>
);
