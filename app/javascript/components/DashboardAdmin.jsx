console.log('DashboardAdmin loaded');

import React, { useState, useEffect } from "react";
import Header from "./Header";


export default function DashboardAdmin() {
  // Mensaje de prueba para verificar montaje
  if (typeof window !== 'undefined') {
    window.__dashboardAdminMounted = true;
  }
  // CRUD Médicos
  const [medicos, setMedicos] = useState([]);
  const [loadingMedicos, setLoadingMedicos] = useState(false);
  const [errorMedicos, setErrorMedicos] = useState("");
  const [formMedico, setFormMedico] = useState({ nombre: "", apellido: "", dni: "", matricula: "", fecha_ingreso: "", especialidad: "", email: "" });
  const [editMedicoId, setEditMedicoId] = useState(null);

  // CRUD Empleados
  const [empleados, setEmpleados] = useState([]);
  const [loadingEmpleados, setLoadingEmpleados] = useState(false);
  const [errorEmpleados, setErrorEmpleados] = useState("");
  const [formEmpleado, setFormEmpleado] = useState({ nombre: "", apellido: "", fecha_ingreso: "", dni: "", email: "", password: "" });
  const [editEmpleadoId, setEditEmpleadoId] = useState(null);

  // Fetch médicos y empleados
  useEffect(() => {
    fetchMedicos();
    fetchEmpleados();
  }, []);


  // CRUD MÉDICOS (admin endpoints)
  const fetchMedicos = async () => {
    setLoadingMedicos(true);
    setErrorMedicos("");
    try {
      const res = await fetch("/admin/dashboard.json");
      if (res.ok) {
        const data = await res.json();
        setMedicos(data.medicos || []);
      } else {
        setErrorMedicos("No se pudo cargar la lista de médicos");
      }
    } catch {
      setErrorMedicos("Error de red");
    }
    setLoadingMedicos(false);
  };

  // Crear médico
  const handleCreateMedico = async (e) => {
    e.preventDefault();
    setErrorMedicos("");
    try {
      const res = await fetch("/admin/medicos", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ medico: formMedico })
      });
      if (res.ok) {
        setFormMedico({ nombre: "", apellido: "", dni: "", matricula: "", fecha_ingreso: "", especialidad: "", email: "" });
        fetchMedicos();
      } else {
        const data = await res.json();
        setErrorMedicos(data.error || "No se pudo crear el médico");
      }
    } catch {
      setErrorMedicos("Error de red");
    }
  };

  // ...existing code...

  // Actualizar médico
  const handleUpdateMedico = async (e) => {
    e.preventDefault();
    setErrorMedicos("");
    try {
      const res = await fetch(`/admin/medicos/${editMedicoId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ medico: formMedico })
      });
      if (res.ok) {
        setEditMedicoId(null);
        setFormMedico({ nombre: "", apellido: "", dni: "", matricula: "", fecha_ingreso: "", especialidad: "", email: "" });
        fetchMedicos();
      } else {
        const data = await res.json();
        setErrorMedicos(data.error || "No se pudo actualizar el médico");
      }
    } catch {
      setErrorMedicos("Error de red");
    }
  };

  // Eliminar médico
  const handleDeleteMedico = async (id) => {
    if (!window.confirm("¿Eliminar médico?")) return;
    setErrorMedicos("");
    try {
      const res = await fetch(`/admin/medicos/${id}`, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
      });
      if (res.ok) {
        fetchMedicos();
      } else {
        setErrorMedicos("No se pudo eliminar el médico");
      }
    } catch {
      setErrorMedicos("Error de red");
    }
  };

  const fetchEmpleados = async () => {
    setLoadingEmpleados(true);
    setErrorEmpleados("");
    try {
      const res = await fetch("/admin/dashboard.json");
      if (res.ok) {
        const data = await res.json();
        setEmpleados(data.empleados || []);
      } else {
        setErrorEmpleados("No se pudo cargar la lista de empleados");
      }
    } catch {
      setErrorEmpleados("Error de red");
    }
    setLoadingEmpleados(false);
  };

  // Crear empleado
  const handleCreateEmpleado = async (e) => {
    e.preventDefault();
    setErrorEmpleados("");
    try {
      const res = await fetch("/admin/empleados", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ user: formEmpleado })
      });
      if (res.ok) {
        setFormEmpleado({ nombre: "", apellido: "", fecha_ingreso: "", dni: "", email: "", password: "" });
        fetchEmpleados();
      } else {
        const data = await res.json();
        setErrorEmpleados(data.error || "No se pudo crear el empleado");
      }
    } catch {
      setErrorEmpleados("Error de red");
    }
  };

  // Editar empleado
  const handleEditEmpleado = (empleado) => {
    setEditEmpleadoId(empleado.id);
    setFormEmpleado({ nombre: empleado.nombre, apellido: empleado.apellido, fecha_ingreso: empleado.fecha_ingreso, dni: empleado.dni, email: empleado.email, password: "" });
  };

  // Actualizar empleado
  const handleUpdateEmpleado = async (e) => {
    e.preventDefault();
    setErrorEmpleados("");
    try {
      const res = await fetch(`/admin/empleados/${editEmpleadoId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ user: formEmpleado })
      });
      if (res.ok) {
        setEditEmpleadoId(null);
        setFormEmpleado({ nombre: "", apellido: "", fecha_ingreso: "", dni: "", email: "", password: "" });
        fetchEmpleados();
      } else {
        const data = await res.json();
        setErrorEmpleados(data.error || "No se pudo actualizar el empleado");
      }
    } catch {
      setErrorEmpleados("Error de red");
    }
  };

  // Eliminar empleado
  const handleDeleteEmpleado = async (id) => {
    if (!window.confirm("¿Eliminar empleado?")) return;
    setErrorEmpleados("");
    try {
      const res = await fetch(`/admin/empleados/${id}`, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
      });
      if (res.ok) {
        fetchEmpleados();
      } else {
        setErrorEmpleados("No se pudo eliminar el empleado");
      }
    } catch {
      setErrorEmpleados("Error de red");
    }
  };

  // Editar médico
  const handleEditMedico = (medico) => {
    setEditMedicoId(medico.id);
    setFormMedico({
      nombre: medico.nombre || "",
      apellido: medico.apellido || "",
      dni: medico.dni || "",
      matricula: medico.matricula || "",
      fecha_ingreso: medico.fecha_ingreso || "",
      especialidad: medico.especialidad || "",
      email: medico.email || ""
    });
  };

  // Usuario actual (simulado por ahora)
  const [user, setUser] = useState({ email: "", role: "admin" });
  useEffect(() => {
    if (window.__currentUser) setUser(window.__currentUser);
    else setUser({ email: "admin@kuracisto.com", role: "admin" });
  }, []);

  // Render
  return (
    <div style={{ maxWidth: "1200px", margin: "2rem auto", padding: "2rem", background: "#f3f4f6", borderRadius: "2rem", boxShadow: "0 4px 24px #0001" }}>
      <Header email={user.email} role={user.role} onLogout={() => window.location.href = "/users/sign_out"} />
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        <section style={sectionStyle}>
          <h2 style={sectionTitle}>CRUD Médicos</h2>
          <p>Campos: DNI, Nombre, Apellido, Matrícula, Fecha de ingreso, Email, Especialidad</p>
          {errorMedicos && <div style={errorStyle}>{errorMedicos}</div>}
          <form onSubmit={editMedicoId ? handleUpdateMedico : handleCreateMedico} style={{ marginBottom: "1.5rem" }}>
            <input type="text" placeholder="Nombre" value={formMedico.nombre} onChange={e => setFormMedico(f => ({ ...f, nombre: e.target.value }))} style={inputStyle} required />
            <input type="text" placeholder="Apellido" value={formMedico.apellido} onChange={e => setFormMedico(f => ({ ...f, apellido: e.target.value }))} style={inputStyle} required />
            <input type="text" placeholder="DNI" value={formMedico.dni} onChange={e => setFormMedico(f => ({ ...f, dni: e.target.value }))} style={inputStyle} required />
            <input type="text" placeholder="Matrícula" value={formMedico.matricula} onChange={e => setFormMedico(f => ({ ...f, matricula: e.target.value }))} style={inputStyle} required />
            <input type="date" placeholder="Fecha de ingreso" value={formMedico.fecha_ingreso} onChange={e => setFormMedico(f => ({ ...f, fecha_ingreso: e.target.value }))} style={inputStyle} required />
            <input type="email" placeholder="Email" value={formMedico.email} onChange={e => setFormMedico(f => ({ ...f, email: e.target.value }))} style={inputStyle} required />
            <input type="text" placeholder="Especialidad" value={formMedico.especialidad} onChange={e => setFormMedico(f => ({ ...f, especialidad: e.target.value }))} style={inputStyle} required />
            <button type="submit" style={btnStyle}>{editMedicoId ? "Actualizar" : "Crear"}</button>
            {editMedicoId && <button type="button" style={cancelBtnStyle} onClick={() => { setEditMedicoId(null); setFormMedico({ nombre: "", apellido: "", dni: "", matricula: "", fecha_ingreso: "", especialidad: "", email: "" }); }}>Cancelar</button>}
          </form>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>DNI</th>
                <th>Matrícula</th>
                <th>Fecha ingreso</th>
                <th>Email</th>
                <th>Especialidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loadingMedicos ? (
                <tr><td colSpan={8}>Cargando...</td></tr>
              ) : medicos.length === 0 ? (
                <tr><td colSpan={8}>Sin médicos</td></tr>
              ) : medicos.map(medico => (
                <tr key={medico.id}>
                  <td>{medico.nombre}</td>
                  <td>{medico.apellido}</td>
                  <td>{medico.dni}</td>
                  <td>{medico.matricula}</td>
                  <td>{medico.fecha_ingreso}</td>
                  <td>{medico.email}</td>
                  <td>{medico.especialidad}</td>
                  <td>
                    <button style={actionBtnStyle} onClick={() => handleEditMedico(medico)}>Editar</button>
                    <button style={deleteBtnStyle} onClick={() => handleDeleteMedico(medico.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section style={sectionStyle}>
          <h2 style={sectionTitle}>CRUD Empleados</h2>
          <p>Campos: Nombre y Apellido, Fecha de ingreso, DNI</p>
          {errorEmpleados && <div style={errorStyle}>{errorEmpleados}</div>}
          <form onSubmit={editEmpleadoId ? handleUpdateEmpleado : handleCreateEmpleado} style={{ marginBottom: "1.5rem" }}>
            <input type="text" placeholder="Nombre" value={formEmpleado.nombre} onChange={e => setFormEmpleado(f => ({ ...f, nombre: e.target.value }))} style={inputStyle} required />
            <input type="text" placeholder="Apellido" value={formEmpleado.apellido} onChange={e => setFormEmpleado(f => ({ ...f, apellido: e.target.value }))} style={inputStyle} required />
            <input type="date" placeholder="Fecha de ingreso" value={formEmpleado.fecha_ingreso} onChange={e => setFormEmpleado(f => ({ ...f, fecha_ingreso: e.target.value }))} style={inputStyle} required />
            <input type="text" placeholder="DNI" value={formEmpleado.dni} onChange={e => setFormEmpleado(f => ({ ...f, dni: e.target.value }))} style={inputStyle} required />
            <input type="email" placeholder="Email" value={formEmpleado.email} onChange={e => setFormEmpleado(f => ({ ...f, email: e.target.value }))} style={inputStyle} required />
            <input type="password" placeholder="Contraseña" value={formEmpleado.password} onChange={e => setFormEmpleado(f => ({ ...f, password: e.target.value }))} style={inputStyle} required={!editEmpleadoId} />
            <button type="submit" style={btnStyle}>{editEmpleadoId ? "Actualizar" : "Crear"}</button>
            {editEmpleadoId && <button type="button" style={cancelBtnStyle} onClick={() => { setEditEmpleadoId(null); setFormEmpleado({ nombre: "", apellido: "", fecha_ingreso: "", dni: "", email: "", password: "" }); }}>Cancelar</button>}
          </form>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Fecha ingreso</th>
                <th>DNI</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loadingEmpleados ? (
                <tr><td colSpan={6}>Cargando...</td></tr>
              ) : empleados.length === 0 ? (
                <tr><td colSpan={6}>Sin empleados</td></tr>
              ) : empleados.map(empleado => (
                <tr key={empleado.id}>
                  <td>{empleado.nombre}</td>
                  <td>{empleado.apellido}</td>
                  <td>{empleado.fecha_ingreso}</td>
                  <td>{empleado.dni}</td>
                  <td>{empleado.email}</td>
                  <td>
                    <button style={actionBtnStyle} onClick={() => handleEditEmpleado(empleado)}>Editar</button>
                    <button style={deleteBtnStyle} onClick={() => handleDeleteEmpleado(empleado.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}


const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  borderRadius: "0.75rem",
  border: "1px solid #cbd5e1",
  marginBottom: "0.75rem",
  fontSize: "1rem"
};
const btnStyle = {
  background: "#7c3aed",
  color: "#fff",
  padding: "0.75rem 1.5rem",
  borderRadius: "0.75rem",
  fontWeight: "bold",
  fontSize: "1rem",
  border: "none",
  cursor: "pointer",
  marginRight: "0.5rem"
};
const cancelBtnStyle = {
  background: "#e5e7eb",
  color: "#374151",
  padding: "0.75rem 1.5rem",
  borderRadius: "0.75rem",
  fontWeight: "bold",
  fontSize: "1rem",
  border: "none",
  cursor: "pointer"
};
const actionBtnStyle = {
  background: "#2563eb",
  color: "#fff",
  padding: "0.5rem 1rem",
  borderRadius: "0.5rem",
  fontWeight: "bold",
  fontSize: "0.95rem",
  border: "none",
  cursor: "pointer",
  marginRight: "0.5rem"
};
const deleteBtnStyle = {
  background: "#ef4444",
  color: "#fff",
  padding: "0.5rem 1rem",
  borderRadius: "0.5rem",
  fontWeight: "bold",
  fontSize: "0.95rem",
  border: "none",
  cursor: "pointer"
};
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "1rem"
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

const sectionStyle = {
  background: "#fff",
  borderRadius: "1rem",
  boxShadow: "0 2px 8px #0001",
  padding: "1.5rem",
  flex: "1 1 400px",
  minWidth: "400px",
  marginBottom: "2rem"
};

const sectionTitle = {
  fontSize: "1.25rem",
  fontWeight: "bold",
  color: "#7c3aed",
  marginBottom: "1rem"
};
