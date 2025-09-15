import React, { useState } from "react";

export default function Registro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          user: {
            email,
            password,
            password_confirmation: passwordConfirmation
          }
        })
      });
      if (res.ok) {
        setSuccess("¡Registro exitoso! Redirigiendo...");
        setTimeout(() => {
          window.location.href = "/";
        }, 1200);
      } else {
        const data = await res.json();
        setError(data.error || "No se pudo registrar");
      }
    } catch (err) {
      setError("Error de red. Intenta nuevamente.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: "1.5rem", boxShadow: "0 4px 24px #0001", padding: "2rem", minWidth: "350px" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: "#2563eb", marginBottom: "1.5rem", textAlign: "center" }}>Registro</h2>
        {error && <div style={errorStyle}>{error}</div>}
        {success && <div style={successStyle}>{success}</div>}
        <form onSubmit={handleRegister}>
          <label style={labelStyle}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} placeholder="Correo electrónico" required />
          <label style={labelStyle}>Contraseña</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} placeholder="Contraseña" required />
          <label style={labelStyle}>Confirmar contraseña</label>
          <input type="password" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} style={inputStyle} placeholder="Confirmar contraseña" required />
          <button type="submit" style={btnStyle} disabled={loading}>{loading ? "Registrando..." : "Registrarse"}</button>
        </form>
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
