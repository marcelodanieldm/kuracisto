import React, { useState } from "react";

export default function Perfil() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Optionally fetch current user info here (if API available)

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          user: {
            email,
            password,
            password_confirmation: passwordConfirmation,
            current_password: currentPassword
          }
        })
      });
      if (res.ok) {
        setSuccess("¡Perfil actualizado!");
      } else {
        const data = await res.json();
        setError(data.error || "No se pudo actualizar el perfil");
      }
    } catch (err) {
      setError("Error de red. Intenta nuevamente.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: "1.5rem", boxShadow: "0 4px 24px #0001", padding: "2rem", minWidth: "350px" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: "#2563eb", marginBottom: "1.5rem", textAlign: "center" }}>Editar perfil</h2>
        {error && <div style={errorStyle}>{error}</div>}
        {success && <div style={successStyle}>{success}</div>}
        <form onSubmit={handleUpdate}>
          <label style={labelStyle}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} placeholder="Correo electrónico" />
          <label style={labelStyle}>Nueva contraseña</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} placeholder="Nueva contraseña" />
          <label style={labelStyle}>Confirmar nueva contraseña</label>
          <input type="password" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} style={inputStyle} placeholder="Confirmar nueva contraseña" />
          <label style={labelStyle}>Contraseña actual</label>
          <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} style={inputStyle} placeholder="Contraseña actual" required />
          <button type="submit" style={btnStyle} disabled={loading}>{loading ? "Actualizando..." : "Actualizar perfil"}</button>
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
