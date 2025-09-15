import React, { useEffect, useState } from "react";
import EmpleadoCalendar from "./EmpleadoCalendar";
import Header from "./Header";
import LogoutButton from "./LogoutButton";

export default function DashboardEmpleado() {
  // Obtener usuario actual desde window.__currentUser
  const [user, setUser] = useState({ email: "", role: "" });
  useEffect(() => {
    if (window.__currentUser) {
      setUser(window.__currentUser);
    }
  }, []);

  // Usar los turnos reales expuestos por Rails
  const [turnos, setTurnos] = useState([]);
  useEffect(() => {
    if (window.__turnos) {
      setTurnos(window.__turnos);
    }
  }, []);

  return (
    <div style={{ maxWidth: "1200px", margin: "2rem auto", padding: "2rem", background: "#f3f4f6", borderRadius: "2rem", boxShadow: "0 4px 24px #0001" }}>
      <Header email={user.email} role={user.role} onLogout={() => window.location.href = "/users/sign_out"} />
      <EmpleadoCalendar turnos={turnos} />
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        <section style={sectionStyle}>
          <h2 style={sectionTitle}>Administrar pacientes</h2>
          {/* Tabla de pacientes y acciones */}
        </section>
        <section style={sectionStyle}>
          <h2 style={sectionTitle}>Reservar turno</h2>
          {/* Formulario para reservar turno */}
        </section>
        <section style={sectionStyle}>
          <h2 style={sectionTitle}>Envío de email</h2>
          {/* Formulario de email */}
        </section>
        <section style={sectionStyle}>
          <h2 style={sectionTitle}>Próximos turnos</h2>
          {/* Lista de turnos */}
        </section>
      </div>
    </div>
  );
}


const sectionStyle = {
  background: "#fff",
  borderRadius: "1rem",
  boxShadow: "0 2px 8px #0001",
  padding: "1.5rem",
  flex: "1 1 300px",
  minWidth: "300px",
  marginBottom: "2rem"
};

const sectionTitle = {
  fontSize: "1.25rem",
  fontWeight: "bold",
  color: "#047857",
  marginBottom: "1rem"
};

const menuBtnStyle = {
  background: "#047857",
  color: "#fff",
  padding: "0.5rem 1rem",
  borderRadius: "0.75rem",
  fontWeight: "bold",
  fontSize: "1rem",
  border: "none",
  textDecoration: "none",
  marginRight: "1rem"
};
