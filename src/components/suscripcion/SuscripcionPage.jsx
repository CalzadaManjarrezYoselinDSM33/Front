import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./suscripcionPage.css";

const CombinedForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        name,
        email,
        password,
        role,
      });

      if (response.status === 201) {
        setMessage({ type: "success", text: response.data.message });
        setTimeout(() => {
          if (role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data.message) {
        setMessage({ type: "error", text: error.response.data.message });
      } else {
        setMessage({ type: "error", text: "Error al conectar con el servidor" });
      }
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
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <button type="submit">Registrar</button>
      </form>

      {message && (
        <div className={`alert ${message.type === "error" ? "error" : "success"}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default CombinedForm;
