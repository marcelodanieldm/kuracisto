import React, { useState } from "react";

export default function LogoutButton({ redirectTo = "/" }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/users/sign_out", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: "include"
      });
      if (res.ok) {
        window.location.href = redirectTo;
      } else {
        setError("No se pudo cerrar sesión");
      }
    } catch (err) {
      setError("Error de red. Intenta nuevamente.");
    }
    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleLogout} style={btnStyle} disabled={loading}>
        {loading ? "Cerrando sesión..." : "Cerrar sesión"}
      </button>
      {error && <div style={errorStyle}>{error}</div>}
    </div>
  );
}

const btnStyle = {
  background: "#ef4444",
  color: "#fff",
  padding: "0.5rem 1.5rem",
  borderRadius: "0.75rem",
  fontWeight: "bold",
  fontSize: "1rem",
  border: "none",
  cursor: "pointer",
  marginTop: "1rem"
};
const errorStyle = {
  background: "#fee2e2",
  color: "#b91c1c",
  padding: "0.5rem",
  borderRadius: "0.75rem",
  marginTop: "0.5rem",
  textAlign: "center",
  fontWeight: "bold"
};
