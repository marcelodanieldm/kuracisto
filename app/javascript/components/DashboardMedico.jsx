import React, { useEffect, useState } from "react";
import Header from "./Header";
import LogoutButton from "./LogoutButton";

export default function DashboardMedico() {
  // Estado para edición de historia clínica
  const [editHistoriaId, setEditHistoriaId] = useState(null);
  const [editHistoria, setEditHistoria] = useState({ fecha: "", diagnostico: "" });
  // Usuario actual
  const [user, setUser] = useState({ email: "", role: "" });
  useEffect(() => {
    if (window.__currentUser) setUser(window.__currentUser);
  }, []);

  // Historias clínicas
  const [historias, setHistorias] = useState([]);
  const [errorHistoria, setErrorHistoria] = useState("");
  // Pacientes
  const [pacientes, setPacientes] = useState([]);
  const [errorPaciente, setErrorPaciente] = useState("");
  // Turnos de hoy
  const [turnosHoy, setTurnosHoy] = useState([]);
  // Días bloqueados
  const [bloqueos, setBloqueos] = useState([]);
  // Estado para mostrar/ocultar formularios
  const [showHistoriaForm, setShowHistoriaForm] = useState(false);
  const [showPacienteForm, setShowPacienteForm] = useState(false);
  const [showBloqueoForm, setShowBloqueoForm] = useState(false);

  // Formulario historia clínica
  const [formHistoria, setFormHistoria] = useState({ nombre: "", apellido: "", dni: "", tipo_seguro: "particular", fecha: "", comentarios: "" });
  // Formulario paciente
  const [formPaciente, setFormPaciente] = useState({ nombre: "", apellido: "", dni: "", tipo_seguro: "particular", telefono: "", email: "" });
  // Formulario bloqueo día
  const [formBloqueo, setFormBloqueo] = useState({ fecha: "", motivo: "" });

  // Fetch historias clínicas
  const fetchHistorias = () => {
    fetch('/historias_clinicas.json', { headers: { 'Accept': 'application/json' } })
      .then(res => res.json())
      .then(data => setHistorias(data))
      .catch(() => setHistorias([]));
  };
  // Fetch pacientes
  const fetchPacientes = () => {
    fetch('/pacientes.json', { headers: { 'Accept': 'application/json' } })
      .then(res => res.json())
      .then(data => setPacientes(data))
      .catch(() => setPacientes([]));
  };
  // Fetch turnos de hoy
  const fetchTurnosHoy = () => {
    const hoy = new Date().toISOString().slice(0, 10);
    fetch(`/turnos.json?fecha=${hoy}`, { headers: { 'Accept': 'application/json' } })
      .then(res => res.json())
      .then(data => setTurnosHoy(data))
      .catch(() => setTurnosHoy([]));
  };
  // Fetch bloqueos
  const fetchBloqueos = () => {
    fetch('/medicos/dashboard.json', { headers: { 'Accept': 'application/json' } })
      .then(res => res.json())
      .then(data => setBloqueos(data.bloqueos || []))
      .catch(() => setBloqueos([]));
  };

  useEffect(() => {
    fetchHistorias();
    fetchPacientes();
    fetchTurnosHoy();
    fetchBloqueos();
  }, []);

  // CRUD historia clínica
  const handleCreateHistoria = async (e) => {
    e.preventDefault();
    setErrorHistoria("");
    try {
      const res = await fetch("/historias_clinicas", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ historia_clinica: formHistoria })
      });
      if (res.ok) {
        fetchHistorias();
        setShowHistoriaForm(false);
        setFormHistoria({ nombre: "", apellido: "", dni: "", tipo_seguro: "particular", fecha: "", comentarios: "" });
      } else {
        const err = await res.json();
        setErrorHistoria(err.error || "No se pudo crear la historia clínica");
      }
    } catch {
      setErrorHistoria("Error de red");
    }
  };
  // CRUD paciente
  const handleCreatePaciente = async (e) => {
    e.preventDefault();
    setErrorPaciente("");
    try {
      const res = await fetch("/medicos/crear_paciente", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ paciente: formPaciente })
      });
      if (res.ok) {
        fetchPacientes();
        setShowPacienteForm(false);
        setFormPaciente({ nombre: "", apellido: "", dni: "", tipo_seguro: "particular", telefono: "", email: "" });
      } else {
        const err = await res.json();
        setErrorPaciente(err.error || "No se pudo crear el paciente");
      }
    } catch {
      setErrorPaciente("Error de red");
    }
  };
  // Reservar turno
  const handleReservarTurno = async (turnoId, pacienteId, fecha, hora) => {
    try {
      const res = await fetch('/reservar_turno', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ turno_id: turnoId, paciente_id: pacienteId, fecha, hora })
      });
      if (res.ok) fetchTurnosHoy();
    } catch {}
  };
  // Bloquear día
  const handleBloquearDia = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/medicos/bloquear_dia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ bloqueo_dia: formBloqueo })
      });
      if (res.ok) {
        fetchBloqueos();
        setShowBloqueoForm(false);
        setFormBloqueo({ fecha: "", motivo: "" });
      }
    } catch {}
  };

  // Render principal (ya implementado abajo)

  // Handler logout seguro (DELETE)
  const handleLogout = () => {
    fetch('/users/sign_out', { method: 'DELETE', credentials: 'include' })
      .then(() => window.location.href = '/login');
  };
  return (
    <div style={{ maxWidth: "1200px", margin: "2rem auto", padding: "2rem", background: "#f3f4f6", borderRadius: "2rem", boxShadow: "0 4px 24px #0001" }}>
      <Header email={user.email} role={user.role} onLogout={handleLogout} />
      <div style={{ marginBottom: "2rem" }}>
        <button style={btnStyle} onClick={() => setShowHistoriaForm(s => !s)}>
          {showHistoriaForm ? "Cancelar" : "Crear historia clínica"}
        </button>
      </div>
      {showHistoriaForm && (
        <form onSubmit={handleCreateHistoria} style={{ background: "#fff", padding: "2rem", borderRadius: "1rem", boxShadow: "0 2px 8px #0001", marginBottom: "2rem" }}>
          <h2 style={sectionTitle}>Nueva historia clínica</h2>
          <input type="text" placeholder="Nombre paciente" value={formHistoria.nombre} onChange={e => setFormHistoria(f => ({ ...f, nombre: e.target.value }))} style={inputStyle} required />
          <input type="text" placeholder="Apellido paciente" value={formHistoria.apellido} onChange={e => setFormHistoria(f => ({ ...f, apellido: e.target.value }))} style={inputStyle} required />
          <input type="text" placeholder="DNI" value={formHistoria.dni} onChange={e => setFormHistoria(f => ({ ...f, dni: e.target.value }))} style={inputStyle} required />
          <select value={formHistoria.tipo_seguro} onChange={e => setFormHistoria(f => ({ ...f, tipo_seguro: e.target.value }))} style={inputStyle} required>
            <option value="particular">Particular</option>
            <option value="prepaga">Prepaga</option>
          </select>
          <input type="date" placeholder="Fecha" value={formHistoria.fecha} onChange={e => setFormHistoria(f => ({ ...f, fecha: e.target.value }))} style={inputStyle} required />
          <textarea placeholder="Comentarios" value={formHistoria.comentarios} onChange={e => setFormHistoria(f => ({ ...f, comentarios: e.target.value }))} style={inputStyle} rows={4} required />
          <button type="submit" style={btnStyle}>Guardar historia clínica</button>
          {errorHistoria && <div style={errorStyle}>{errorHistoria}</div>}
        </form>
      )}
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        <section style={sectionStyle}>
          <h2 style={sectionTitle}>Historias clínicas</h2>
          {historias.length === 0 ? (
            <div>No hay historias clínicas registradas.</div>
          ) : (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>DNI</th>
                  <th>Obra social/prepaga</th>
                  <th>Fecha</th>
                  <th>Diagnóstico</th>
                  <th>Historial de turnos</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {historias.map(h => (
                  <tr key={h.id}>
                    <td>{h.paciente?.nombre}</td>
                    <td>{h.paciente?.apellido}</td>
                    <td>{h.paciente?.dni}</td>
                    <td>{h.paciente?.tipo_seguro}</td>
                    <td>{h.fecha}</td>
                    <td>{h.diagnostico || h.comentarios}</td>
                    <td>
                      {h.paciente?.turnos && h.paciente.turnos.length > 0 ? (
                        <ul style={{ fontSize: "0.95em", paddingLeft: "1em" }}>
                          {h.paciente.turnos.map((t, idx) => (
                            <li key={idx}>{t.fecha} {t.hora} ({t.estado})</li>
                          ))}
                        </ul>
                      ) : "Sin turnos"}
                    </td>
                    <td>
                      <button style={actionBtnStyle} onClick={() => handleEditHistoria(h)}>Editar</button>
                      <button style={deleteBtnStyle} onClick={() => handleDeleteHistoria(h.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {editHistoriaId && (
            <form onSubmit={handleUpdateHistoria} style={{ background: "#fff", padding: "2rem", borderRadius: "1rem", boxShadow: "0 2px 8px #0001", marginTop: "2rem" }}>
              <h2 style={sectionTitle}>Editar historia clínica</h2>
              <input type="date" value={editHistoria.fecha} onChange={e => setEditHistoria(f => ({ ...f, fecha: e.target.value }))} style={inputStyle} required />
              <textarea placeholder="Diagnóstico" value={editHistoria.diagnostico} onChange={e => setEditHistoria(f => ({ ...f, diagnostico: e.target.value }))} style={inputStyle} rows={4} required />
              <button type="submit" style={btnStyle}>Actualizar</button>
              <button type="button" style={cancelBtnStyle} onClick={() => setEditHistoriaId(null)}>Cancelar</button>
              {errorHistoria && <div style={errorStyle}>{errorHistoria}</div>}
            </form>
          )}
        </section>
        {/* ...otras secciones existentes... */}
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
  color: "#2563eb",
  marginBottom: "1rem"
};

const menuBtnStyle = {
  background: "#2563eb",
  color: "#fff",
  padding: "0.5rem 1rem",
  borderRadius: "0.75rem",
  fontWeight: "bold",
  fontSize: "1rem",
  border: "none",
  textDecoration: "none",
  marginRight: "1rem"
};

const btnStyle = {
  background: "#059669",
  color: "#fff",
  padding: "0.75rem 1.5rem",
  borderRadius: "0.75rem",
  fontWeight: "bold",
  fontSize: "1rem",
  border: "none",
  cursor: "pointer",
  marginRight: "0.5rem"
};

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  borderRadius: "0.75rem",
  border: "1px solid #cbd5e1",
  marginBottom: "0.75rem",
  fontSize: "1rem"
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

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "1rem"
};
