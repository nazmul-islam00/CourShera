import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./styles/figma-theme.css";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/auth/AuthProvider.jsx";
import { CheckoutProvider } from "./context/checkout/CheckoutProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CheckoutProvider>
          <App />
        </CheckoutProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
