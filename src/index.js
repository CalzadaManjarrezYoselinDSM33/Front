import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./components/context/CartContext";  
import { AuthProvider } from "./components/AuthContext"; 

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider> 
    <CartProvider>  
      <App />
    </CartProvider>
    </AuthProvider> 
  </React.StrictMode>
);
