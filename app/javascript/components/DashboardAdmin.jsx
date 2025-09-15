console.log('DashboardAdmin loaded');

import React, { useState, useEffect } from "react";
import Header from "./Header";
import AdminCalendar from "./AdminCalendar";


  // Mensaje de prueba para verificar montaje
  if (typeof window !== 'undefined') {
    window.__dashboardAdminMounted = true;
  }
  // Turnos reales expuestos por Rails
  const [turnos, setTurnos] = useState([]);
  useEffect(() => {
    if (window.__turnos && Array.isArray(window.__turnos)) {
      setTurnos(window.__turnos);
    } else {
      // Si no hay turnos en window, los pide por fetch
      fetch('/admin/dashboard.json')
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.turnos) setTurnos(data.turnos);
        });
    }
  }, []);
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
  <div className="max-w-6xl mx-auto my-8 p-8 bg-gray-100 rounded-3xl shadow-2xl">
      <Header email={user.email} role={user.role} onLogout={() => window.location.href = "/users/sign_out"} />
      <AdminCalendar turnos={turnos} />
  <div className="flex flex-wrap gap-8">
  <section className="bg-white rounded-xl shadow-lg p-6 flex-1 min-w-[400px] mb-8">
          <h2 className="text-xl font-bold text-violet-600 mb-4">CRUD Médicos</h2>
          <p>Campos: DNI, Nombre, Apellido, Matrícula, Fecha de ingreso, Email, Especialidad</p>
          {errorMedicos && <div className="bg-red-200 text-red-700 p-3 rounded-xl mb-4 text-center font-bold">{errorMedicos}</div>}
          <form onSubmit={editMedicoId ? handleUpdateMedico : handleCreateMedico} className="mb-6 space-y-3">
            <input type="text" placeholder="Nombre" value={formMedico.nombre} onChange={e => setFormMedico(f => ({ ...f, nombre: e.target.value }))} className="w-full p-3 rounded-xl border border-gray-300 mb-3 text-base" required />
            <input type="text" placeholder="Apellido" value={formMedico.apellido} onChange={e => setFormMedico(f => ({ ...f, apellido: e.target.value }))} className="w-full p-3 rounded-xl border border-gray-300 mb-3 text-base" required />
            <input type="text" placeholder="DNI" value={formMedico.dni} onChange={e => setFormMedico(f => ({ ...f, dni: e.target.value }))} className="w-full p-3 rounded-xl border border-gray-300 mb-3 text-base" required />
            <input type="text" placeholder="Matrícula" value={formMedico.matricula} onChange={e => setFormMedico(f => ({ ...f, matricula: e.target.value }))} className="w-full p-3 rounded-xl border border-gray-300 mb-3 text-base" required />
            <input type="date" placeholder="Fecha de ingreso" value={formMedico.fecha_ingreso} onChange={e => setFormMedico(f => ({ ...f, fecha_ingreso: e.target.value }))} className="w-full p-3 rounded-xl border border-gray-300 mb-3 text-base" required />
            <input type="email" placeholder="Email" value={formMedico.email} onChange={e => setFormMedico(f => ({ ...f, email: e.target.value }))} className="w-full p-3 rounded-xl border border-gray-300 mb-3 text-base" required />
            <input type="text" placeholder="Especialidad" value={formMedico.especialidad} onChange={e => setFormMedico(f => ({ ...f, especialidad: e.target.value }))} className="w-full p-3 rounded-xl border border-gray-300 mb-3 text-base" required />
            <button type="submit" className="bg-violet-600 text-white px-6 py-3 rounded-xl font-bold text-base border-none cursor-pointer mr-2 hover:bg-violet-700 transition">{editMedicoId ? "Actualizar" : "Crear"}</button>
            {editMedicoId && <button type="button" className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold text-base border-none cursor-pointer hover:bg-gray-300 transition" onClick={() => { setEditMedicoId(null); setFormMedico({ nombre: "", apellido: "", dni: "", matricula: "", fecha_ingreso: "", especialidad: "", email: "" }); }}>Cancelar</button>}
          </form>
          <table className="w-full border-collapse mt-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 font-semibold">Nombre</th>
                <th className="p-2 font-semibold">Apellido</th>
                <th className="p-2 font-semibold">DNI</th>
                <th className="p-2 font-semibold">Matrícula</th>
                <th className="p-2 font-semibold">Fecha ingreso</th>
                <th className="p-2 font-semibold">Email</th>
                <th className="p-2 font-semibold">Especialidad</th>
                <th className="p-2 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loadingMedicos ? (
                <tr><td colSpan={8} className="text-center py-4">Cargando...</td></tr>
              ) : medicos.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-4">Sin médicos</td></tr>
              ) : medicos.map(medico => (
                <tr key={medico.id} className="hover:bg-gray-50">
                  <td className="p-2">{medico.nombre}</td>
                  <td className="p-2">{medico.apellido}</td>
                  <td className="p-2">{medico.dni}</td>
                  <td className="p-2">{medico.matricula}</td>
                  <td className="p-2">{medico.fecha_ingreso}</td>
                  <td className="p-2">{medico.email}</td>
                  <td className="p-2">{medico.especialidad}</td>
                  <td className="p-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm border-none cursor-pointer mr-2 hover:bg-blue-700 transition" onClick={() => handleEditMedico(medico)}>Editar</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm border-none cursor-pointer hover:bg-red-600 transition" onClick={() => handleDeleteMedico(medico.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
  <section className="bg-white rounded-xl shadow-lg p-6 flex-1 min-w-[400px] mb-8">
          <h2 className="text-xl font-bold text-violet-600 mb-4">CRUD Empleados</h2>
          <p>Campos: Nombre y Apellido, Fecha de ingreso, DNI</p>
          {errorEmpleados && <div className="bg-red-200 text-red-700 p-3 rounded-xl mb-4 text-center font-bold">{errorEmpleados}</div>}
          <form onSubmit={editEmpleadoId ? handleUpdateEmpleado : handleCreateEmpleado} className="mb-6 space-y-3">
            <input type="text" placeholder="Nombre" value={formEmpleado.nombre} onChange={e => setFormEmpleado(f => ({ ...f, nombre: e.target.value }))} className="w-full p-3 rounded-xl border border-gray-300 mb-3 text-base" required />
            <input type="text" placeholder="Apellido" value={formEmpleado.apellido} onChange={e => setFormEmpleado(f => ({ ...f, apellido: e.target.value }))} className="w-full p-3 rounded-xl border border-gray-300 mb-3 text-base" required />
            <input type="date" placeholder="Fecha de ingreso" value={formEmpleado.fecha_ingreso} onChange={e => setFormEmpleado(f => ({ ...f, fecha_ingreso: e.target.value }))} className="w-full p-3 rounded-xl border border-gray-300 mb-3 text-base" required />
            <input type="text" placeholder="DNI" value={formEmpleado.dni} onChange={e => setFormEmpleado(f => ({ ...f, dni: e.target.value }))} className="w-full p-3 rounded-xl border border-gray-300 mb-3 text-base" required />
            <input type="email" placeholder="Email" value={formEmpleado.email} onChange={e => setFormEmpleado(f => ({ ...f, email: e.target.value }))} className="w-full p-3 rounded-xl border border-gray-300 mb-3 text-base" required />
            <input type="password" placeholder="Contraseña" value={formEmpleado.password} onChange={e => setFormEmpleado(f => ({ ...f, password: e.target.value }))} className="w-full p-3 rounded-xl border border-gray-300 mb-3 text-base" required={!editEmpleadoId} />
            <button type="submit" className="bg-violet-600 text-white px-6 py-3 rounded-xl font-bold text-base border-none cursor-pointer mr-2 hover:bg-violet-700 transition">{editEmpleadoId ? "Actualizar" : "Crear"}</button>
            {editEmpleadoId && <button type="button" className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold text-base border-none cursor-pointer hover:bg-gray-300 transition" onClick={() => { setEditEmpleadoId(null); setFormEmpleado({ nombre: "", apellido: "", fecha_ingreso: "", dni: "", email: "", password: "" }); }}>Cancelar</button>}
          </form>
          <table className="w-full border-collapse mt-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 font-semibold">Nombre</th>
                <th className="p-2 font-semibold">Apellido</th>
                <th className="p-2 font-semibold">Fecha ingreso</th>
                <th className="p-2 font-semibold">DNI</th>
                <th className="p-2 font-semibold">Email</th>
                <th className="p-2 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loadingEmpleados ? (
                <tr><td colSpan={6} className="text-center py-4">Cargando...</td></tr>
              ) : empleados.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-4">Sin empleados</td></tr>
              ) : empleados.map(empleado => (
                <tr key={empleado.id} className="hover:bg-gray-50">
                  <td className="p-2">{empleado.nombre}</td>
                  <td className="p-2">{empleado.apellido}</td>
                  <td className="p-2">{empleado.fecha_ingreso}</td>
                  <td className="p-2">{empleado.dni}</td>
                  <td className="p-2">{empleado.email}</td>
                  <td className="p-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm border-none cursor-pointer mr-2 hover:bg-blue-700 transition" onClick={() => handleEditEmpleado(empleado)}>Editar</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm border-none cursor-pointer hover:bg-red-600 transition" onClick={() => handleDeleteEmpleado(empleado.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
