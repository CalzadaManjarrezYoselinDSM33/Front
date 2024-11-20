import React, { useState } from "react";
import { useCart } from "../context/CartContext"; 
import Barcode from "react-barcode"; 

const Checkout = () => {
  const { cart, removeFromCart, updateQuantity } = useCart(); 
  const [reference, setReference] = useState(null); 
  const [expiresAt, setExpiresAt] = useState(null); 
  const [instructionsUrl, setInstructionsUrl] = useState(null); 

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleIncrement = (productId) => {
    const product = cart.find((item) => item.id === productId);
    updateQuantity(productId, (product.quantity || 1) + 1);
  };

  const handleCheckout = async () => {
    const orderItems = cart.map((item) => ({
      id: item.id, 
      quantity: item.quantity || 1, 
    }));

    try {
      const response = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: orderItems }), 
      });

      const data = await response.json();

      if (data.reference) {
        setReference(data.reference);
        setExpiresAt(new Date(data.expires_at * 1000).toLocaleString()); 
        setInstructionsUrl(data.instructions_url);
      } else {
        alert("Hubo un error al crear la orden.");
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Error al procesar la orden.");
    }
  };

  return (
    <div
    className="checkout"
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif",
      padding: "20px",
    }}
  >
    <h1 style={{ fontSize: "2rem", color: "#FFFFFF", marginBottom: "20px" }}>
      Resumen de la compra
    </h1>
    <ul style={{ listStyleType: "none", padding: "0", width: "100%", maxWidth: "400px" }}>
      {cart.map((item) => (
        <li
          key={item.id}
          style={{
            marginBottom: "20px",
            textAlign: "center",
            borderBottom: "1px solid #ddd",
            paddingBottom: "15px",
          }}
        >
          <h3 style={{ fontSize: "1.2rem", color: "#FFFFFF" }}>{item.title}</h3>
          <p style={{ fontSize: "1rem", color: "#FFFFFF", margin: "5px 0" }}>
            Precio: ${item.price}
          </p>
          <p style={{ fontSize: "1rem", color: "#FFFFFF", margin: "5px 0" }}>
            Cantidad: {item.quantity || 1}
          </p>
          <button
            onClick={() => handleIncrement(item.id)}
            style={{
              backgroundColor: "#4caf50",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              marginTop: "10px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            Agregar más
          </button>
          <br />
          <button
            onClick={() => handleRemove(item.id)}
            style={{
              backgroundColor: "#ff4d4f",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              marginTop: "10px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  
    <button
      onClick={handleCheckout}
      style={{
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        padding: "12px 20px",
        fontSize: "1rem",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "20px",
        transition: "background-color 0.3s ease",
      }}
    >
      Pagar con OXXO
    </button>

      {reference && (
        <div className="payment-info">
          <h3>Tu código de barras para el pago:</h3>
          <Barcode value={reference} /> 
          <p><strong>Referencia:</strong> {reference}</p>
          <p><strong>Fecha de expiración:</strong> {expiresAt}</p>
          <a href={instructionsUrl} target="_blank" rel="noopener noreferrer">
            Ver instrucciones de pago
          </a>
        </div>
      )}
    </div>
  );
};

export default Checkout;
