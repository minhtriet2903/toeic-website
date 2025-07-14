import { GoogleOAuthProvider } from "@react-oauth/google";
import { createRoot } from "react-dom/client";
import "react-quill/dist/quill.snow.css";
import { BrowserRouter } from "react-router-dom";
import App from "./containers";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <AuthProvider>
    <GoogleOAuthProvider
      clientId={import.meta.env.ANISH_SERVICE_GOOGLE_AUTH_CLIENT_ID}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </AuthProvider>
  // </StrictMode>
);
