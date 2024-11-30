import React, { useMemo } from "react";
import { useCart } from "../context/CartContext";
import { jsPDF } from "jspdf";
import JsBarcode from "jsbarcode";
import "./car.css";


const Checkout = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const totalAmount = useMemo(() => {
    return cart.reduce((total, item) => {
      const itemTotal = (item.price || 0) * (item.quantity || 1);
      return total + itemTotal;
    }, 0);
  }, [cart]);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Resumen de Compra", 10, 10);

    cart.forEach((item, index) => {
      const y = 20 + index * 10;
      doc.setFontSize(12);
      doc.text(
        `Producto: ${item.title} | Cantidad: ${item.quantity || 1} | Precio: $${item.price}`,
        10,
        y
      );
    });

    const totalY = 20 + cart.length * 10 + 10;
    doc.setFontSize(14);
    doc.text(`Total a pagar: $${totalAmount.toFixed(2)}`, 10, totalY);

    const barcodeCanvas = document.createElement("canvas");
    JsBarcode(barcodeCanvas, "625314643", {
      format: "CODE128",
      displayValue: true,
    });
    const barcodeImage = barcodeCanvas.toDataURL("image/png");

    doc.addImage(barcodeImage, "PNG", 10, totalY + 10, 100, 30);

    doc.save("resumen-compra.pdf");
  };

  return (
    
    <div className="cart-item" style={{ textAlign: "center", marginBottom: "20px" }}>
    <h1 style={{ fontSize: "2rem", color: "#FFFFFF", margin: "20px 0" }}>Carrito de Compras</h1>
  
   
      <ul className="cart-list">
  {cart.map((item) => {
    const imageSrc = item.image
      ? `http://localhost:5000${item.image}`
      : item.cover;
    return (
      <li
        key={item.id}
        style={{
          marginBottom: "20px",
          borderBottom: "1px solid #ddd",
          paddingBottom: "15px",
          display: "flex", 
          alignItems: "center", 
          gap: "20px", 
        }}
      >
        <img
          src={imageSrc}
          alt={item.title}
          style={{
            width: "100px",
            height: "150px",
            objectFit: "cover",
          }}
        />

      
        <div
          style={{
            flex: "1", 
            display: "flex",
            flexDirection: "column", 
            justifyContent: "center",
            color: "#FFFFFF",
          }}
        >
          <h3 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>{item.title}</h3>
          <p style={{ fontSize: "1rem", margin: "5px 0" }}>Precio: ${item.price}</p>
          <p style={{ fontSize: "1rem", margin: "5px 0" }}>
            Cantidad: {item.quantity || 1}
          </p>
        </div>

       
        <div
          style={{
            display: "flex",
            flexDirection: "column", 
            gap: "10px", 
          }}
        >
          <button
            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
            style={{
              backgroundColor: "#4caf50",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            Agregar más
          </button>
          <button
            onClick={() => removeFromCart(item.id)}
            style={{
              backgroundColor: "#ff0000",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            Eliminar
          </button>
        </div>
      </li>
    );
  })}
</ul>
      <div className="summary">
        <h2>Total a pagar: ${totalAmount.toFixed(2)}</h2>
        <button onClick={generatePDF} className="generate-pdf-button">
          Generar PDF con Código de Barras
        </button>
      </div>
    </div>
  );
};

export default Checkout;
