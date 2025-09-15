import React, { useState } from "react";

export default function Confirmacion() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleConfirm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/users/confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          confirmation_token: token
        })
      });
      if (res.ok) {
        setSuccess("¡Cuenta confirmada!");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1200);
      } else {
        const data = await res.json();
        setError(data.error || "No se pudo confirmar la cuenta");
      }
    } catch (err) {
      setError("Error de red. Intenta nuevamente.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: "1.5rem", boxShadow: "0 4px 24px #0001", padding: "2rem", minWidth: "350px" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: "#2563eb", marginBottom: "1.5rem", textAlign: "center" }}>Confirmar cuenta</h2>
        {error && <div style={errorStyle}>{error}</div>}
        {success && <div style={successStyle}>{success}</div>}
        <form onSubmit={handleConfirm}>
          <label style={labelStyle}>Token de confirmación</label>
          <input type="text" value={token} onChange={e => setToken(e.target.value)} style={inputStyle} placeholder="Token de confirmación" required />
          <button type="submit" style={btnStyle} disabled={loading}>{loading ? "Confirmando..." : "Confirmar"}</button>
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
