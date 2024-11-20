import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Correo con token enviado correctamente." });

        // Al recibir el rol, redirigir según sea admin o usuario
        const userRole = data.role;
        localStorage.setItem("userEmail", email);

        if (userRole === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } else {
        setMessage({ type: "error", text: data.message || "Credenciales inválidas" });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({ type: "error", text: "Error de conexión con el servidor" });
    }
  };

  return (
    <div className="login-container">
      <h1>FREE MOVIE</h1>
      
      <form onSubmit={handleLogin}>
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
        <button type="submit">Iniciar Sesión</button>
      </form>

      <p>¿No tienes cuenta? <a href="/sus">Suscríbete aquí</a></p>

      {message && (
        <div className={`alert ${message.type === "error" ? "error" : "success"}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default Login;
