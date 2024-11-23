import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "¡Inicio de sesión exitoso!" });

        // Guardar el email y redirigir según el rol
        const userRole = data.role;
        localStorage.setItem("userEmail", email);

        if (userRole === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } else {
        setMessage({ type: "error", text: data.message || "Credenciales inválidas." });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({ type: "error", text: "Error de conexión con el servidor." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>FREE MOVIE</h1>

      <form onSubmit={handleLogin}>
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
        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </button>
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
