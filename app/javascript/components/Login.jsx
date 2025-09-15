
import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Login submit
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const params = new URLSearchParams();
      params.append('user[email]', email);
      params.append('user[password]', password);
      params.append('user[remember_me]', '0');
      // Obtener CSRF token de meta tag
      const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      const res = await fetch("/users/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          ...(csrf ? { 'X-CSRF-Token': csrf } : {})
        },
        body: params.toString()
      });
      if (res.ok) {
        setSuccess("¡Login exitoso! Redirigiendo...");
        setTimeout(() => {
          window.location.href = "/";
        }, 1200);
      } else {
        const data = await res.json();
        setError(data.error || "Credenciales inválidas");
      }
    } catch (err) {
      setError("Error de red. Intenta nuevamente.");
    }
    setLoading(false);
  };

  // Password recovery submit
  const handleRecovery = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/users/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          user: {
            email: recoveryEmail
          }
        })
      });
      if (res.ok) {
        setSuccess("¡Correo de recuperación enviado!");
      } else {
        const data = await res.json();
        setError(data.error || "No se pudo enviar el correo");
      }
    } catch (err) {
      setError("Error de red. Intenta nuevamente.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: "2rem", boxShadow: "0 8px 32px #0002", padding: "2.5rem 2rem", minWidth: "370px", maxWidth: "95vw" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "2rem" }}>
          <img src="/icon.png" alt="Kuracisto" style={{ width: 64, height: 64, marginBottom: "0.5rem" }} />
          <h2 style={{ fontSize: "2.2rem", fontWeight: "bold", color: "#7c3aed", marginBottom: "0.5rem", textAlign: "center", letterSpacing: "-1px" }}>{showRecovery ? "Recuperar contraseña" : "Iniciar sesión"}</h2>
        </div>
        {error && <div style={errorStyle}>{error}</div>}
        {success && <div style={successStyle}>{success}</div>}
        {!showRecovery ? (
          <form onSubmit={handleLogin}>
            <div style={{ position: "relative", marginBottom: "1.5rem" }}>
              <label style={labelStyle}><MdEmail style={{ marginRight: 6, verticalAlign: "middle" }} /> Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ ...inputStyle, paddingLeft: "2.5rem" }} placeholder="Correo electrónico" required />
              <FaUser style={{ position: "absolute", left: 10, top: 38, color: "#7c3aed", fontSize: "1.2rem" }} />
            </div>
            <div style={{ position: "relative", marginBottom: "1.5rem" }}>
              <label style={labelStyle}><FaLock style={{ marginRight: 6, verticalAlign: "middle" }} /> Contraseña</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ ...inputStyle, paddingLeft: "2.5rem" }} placeholder="Contraseña" required />
              <FaLock style={{ position: "absolute", left: 10, top: 38, color: "#7c3aed", fontSize: "1.2rem" }} />
            </div>
            <button type="submit" style={btnStyle} disabled={loading}>{loading ? "Accediendo..." : "Acceder"}</button>
            <div style={{ textAlign: "right", marginTop: "0.5rem" }}>
              <button type="button" style={linkStyle} onClick={() => setShowRecovery(true)}>¿Olvidaste tu contraseña?</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRecovery}>
            <div style={{ position: "relative", marginBottom: "1.5rem" }}>
              <label style={labelStyle}><MdEmail style={{ marginRight: 6, verticalAlign: "middle" }} /> Correo electrónico</label>
              <input type="email" value={recoveryEmail} onChange={e => setRecoveryEmail(e.target.value)} style={{ ...inputStyle, paddingLeft: "2.5rem" }} placeholder="Correo electrónico" required />
              <FaUser style={{ position: "absolute", left: 10, top: 38, color: "#7c3aed", fontSize: "1.2rem" }} />
            </div>
            <button type="submit" style={btnStyle} disabled={loading}>{loading ? "Enviando..." : "Enviar recuperación"}</button>
            <div style={{ textAlign: "right", marginTop: "0.5rem" }}>
              <button type="button" style={linkStyle} onClick={() => setShowRecovery(false)}>Volver al login</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontWeight: "bold",
  color: "#374151",
  marginBottom: "0.5rem",
  marginTop: "1rem"
};
const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  borderRadius: "0.75rem",
  border: "1px solid #cbd5e1",
  marginBottom: "1rem",
  fontSize: "1rem"
};
const btnStyle = {
  width: "100%",
  background: "#2563eb",
  color: "#fff",
  padding: "0.75rem",
  borderRadius: "0.75rem",
  fontWeight: "bold",
  fontSize: "1rem",
  border: "none",
  cursor: "pointer"
};
const linkStyle = {
  background: "none",
  border: "none",
  color: "#2563eb",
  textDecoration: "underline",
  cursor: "pointer",
  fontSize: "0.95rem"
};
const errorStyle = {
  background: "#fee2e2",
  color: "#b91c1c",
  padding: "0.75rem",
  borderRadius: "0.75rem",
  marginBottom: "1rem",
  textAlign: "center",
  fontWeight: "bold"
};
const successStyle = {
  background: "#d1fae5",
  color: "#065f46",
  padding: "0.75rem",
  borderRadius: "0.75rem",
  marginBottom: "1rem",
  textAlign: "center",
  fontWeight: "bold"
};
