import React, { useState } from "react";
import "./suscripcionPage.css";
import { useNavigate } from "react-router-dom";  

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, role }),
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Usuario guardado con éxito" });
        setTimeout(() => {
          if (role === "admin") {
            navigate("/admin");  
          } else {
            navigate("/");  
          }
        }, 2000);
      } else {
        setMessage({ type: "error", text: "Hubo un error al guardar el usuario" });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({ type: "error", text: "Error de conexión con el servidor" });
    }
  };

  return (
    <div className="form-container">
        <h1>FREE MOVIE</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Rol:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </label>
        <button type="submit">Guardar Usuario</button>
      </form>

      {message && (
        <div className={`alert ${message.type === "error" ? "error" : "success"}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default UserForm;
