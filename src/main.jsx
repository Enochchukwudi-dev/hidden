import { createRoot } from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppFloat from "./components/WhatsAppFloat";
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById("root")).render(
  <Router>
    <ScrollToTop />
    <CartProvider>
      <App />
    </CartProvider>
    <WhatsAppFloat />
  </Router>
);
