import React, { useMemo } from "react";
import { useCart } from "../context/CartContext";
import { jsPDF } from "jspdf";
import JsBarcode from "jsbarcode";

const Checkout = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  // Calcula el total a pagar utilizando useMemo para optimizar el rendimiento
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

    // Generación del código de barras
    const barcodeCanvas = document.createElement("canvas");
    JsBarcode(barcodeCanvas, "1234567890", {
      format: "CODE128",
      displayValue: true,
    });
    const barcodeImage = barcodeCanvas.toDataURL("image/png");

    doc.addImage(barcodeImage, "PNG", 10, totalY + 10, 100, 30);

    // Guarda el PDF generado
    doc.save("resumen-compra.pdf");
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
      <ul
        style={{
          listStyleType: "none",
          padding: "0",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {cart.map((item) => {
          const imageSrc = item.image ? `http://localhost:5000${item.image}` : item.cover;
          return (
            <li
              key={item.id}
              style={{
                marginBottom: "20px",
                textAlign: "center",
                borderBottom: "1px solid #ddd",
                paddingBottom: "15px",
              }}
            >
              <div className="cart-item">
                <img src={imageSrc} alt={item.title} 
                 style={{
                  width: "100px",
                  height: "150px",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}/>
                <h3 style={{ fontSize: "1.2rem", color: "#FFFFFF" }}>{item.title}</h3>
                <p style={{ fontSize: "1rem", color: "#FFFFFF", margin: "5px 0" }}>
                  Precio: ${item.price}
                </p>
                <p style={{ fontSize: "1rem", color: "#FFFFFF", margin: "5px 0" }}>
                  Cantidad: {item.quantity || 1}
                </p>
                <button
                  onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
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
                  onClick={() => removeFromCart(item.id)}
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
              </div>
            </li>
          );
        })}
      </ul>

      <h2 style={{ fontSize: "1.5rem", color: "#FFFFFF", marginTop: "20px" }}>
        Total a pagar: ${totalAmount.toFixed(2)}
      </h2>

      <button
        onClick={generatePDF}
        style={{
          backgroundColor: "#FF0000",
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
        Generar PDF con Código de Barras
      </button>
    </div>
  );
};

export default Checkout;
