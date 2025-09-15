import React from "react";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #e0e7ff 0%, #fff 50%, #93c5fd 100%)" }}>
      <nav style={{ background: "#1e40af", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#fff", fontWeight: "bold", fontSize: "2rem" }}>Kuracisto</span>
        <div>
          <a href="/users/sign_in" style={navBtnStyle}>Iniciar sesión</a>
        </div>
      </nav>
      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1rem" }}>
        {/* Hero Section */}
        <section style={{ textAlign: "center", margin: "3rem 0 4rem 0" }}>
          <h1 style={{ fontSize: "3rem", fontWeight: "bold", color: "#1e3a8a", marginBottom: "1.5rem" }}>Bienvenido a Kuracisto</h1>
          <p style={{ fontSize: "1.25rem", color: "#374151", marginBottom: "2rem" }}>Sistema moderno para la gestión médica. Administra turnos, pacientes e historias clínicas de forma intuitiva y segura.</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <a href="/medicos/dashboard" style={mainBtnStyle}>Comenzar como Médico</a>
            <a href="/empleados/dashboard" style={mainBtnStyle}>Comenzar como Empleado</a>
            <a href="/users/sign_in" style={mainBtnStyle}>Iniciar sesión</a>
          </div>
        </section>
        {/* Acerca de nosotros */}
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Acerca de nosotros</h2>
          <p style={sectionTextStyle}>
            Kuracisto es una plataforma dedicada a mejorar la gestión médica en clínicas y consultorios. Nuestro objetivo es facilitar la administración de turnos, pacientes e historias clínicas, brindando seguridad y eficiencia a profesionales y empleados.
          </p>
        </section>
        {/* Servicios */}
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Servicios</h2>
          <ul style={{ ...sectionTextStyle, listStyle: "disc", paddingLeft: "1.5rem" }}>
            <li>Reserva y gestión de turnos médicos</li>
            <li>Administración de pacientes y empleados</li>
            <li>Creación y consulta de historias clínicas</li>
            <li>Subida y gestión de archivos PDF médicos</li>
            <li>Paneles personalizados para médicos y empleados</li>
          </ul>
        </section>
        {/* Reservas */}
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Reservas</h2>
          <p style={sectionTextStyle}>
            Reserva tu turno de manera rápida y sencilla. Accede a tu panel, elige el horario disponible y confirma tu cita. Nuestro sistema te notificará y permitirá gestionar tus reservas en todo momento.
          </p>
          <div style={{ marginTop: "1rem" }}>
            <a href="/users/sign_in" style={mainBtnStyle}>Reservar turno</a>
          </div>
        </section>
      </main>
      <footer style={{ background: "#1e40af", color: "#fff", textAlign: "center", padding: "1rem", marginTop: "2rem" }}>
        &copy; {new Date().getFullYear()} Kuracisto. Todos los derechos reservados.
      </footer>
    </div>
  );
}


const navBtnStyle = {
  color: "#fff",
  background: "#2563eb",
  padding: "0.5rem 1rem",
  borderRadius: "0.5rem",
  fontWeight: "bold",
  marginLeft: "0.5rem",
  textDecoration: "none"
};

const mainBtnStyle = {
  color: "#fff",
  background: "#2563eb",
  padding: "1rem 2rem",
  borderRadius: "1rem",
  fontWeight: "bold",
  fontSize: "1rem",
  textDecoration: "none",
  boxShadow: "0 2px 8px #0002"
};

const sectionStyle = {
  background: "#fff",
  borderRadius: "1rem",
  boxShadow: "0 2px 12px #0001",
  padding: "2rem",
  margin: "2rem 0"
};
const sectionTitleStyle = {
  fontSize: "2rem",
  fontWeight: "bold",
  color: "#2563eb",
  marginBottom: "1rem"
};
const sectionTextStyle = {
  fontSize: "1.15rem",
  color: "#374151",
  marginBottom: "1rem"
};
