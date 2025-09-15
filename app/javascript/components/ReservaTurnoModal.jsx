import React, { useState } from "react";

export default function ReservaTurnoModal({ open, onClose, day }) {
  const [form, setForm] = useState({ fecha: "", hora: "", paciente: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!open) return null;

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validate = () => {
    if (!form.fecha || !form.hora || !form.paciente) {
      setError("Todos los campos son obligatorios.");
      return false;
    }
    // Validación extra: fecha no pasada
    if (new Date(form.fecha) < new Date()) {
      setError("La fecha debe ser futura o actual.");
      return false;
    }
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/turnos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({
          turno: {
            fecha: form.fecha,
            hora: form.hora,
            paciente: form.paciente
          }
        })
      });
      if (res.ok) {
        setSuccess("Turno reservado correctamente.");
        setTimeout(() => { setSuccess(""); onClose(); window.location.reload(); }, 1200);
      } else {
        const data = await res.json();
        setError(data.error || "No se pudo reservar el turno.");
      }
    } catch (err) {
      setError("Error de conexión.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-2xl p-8 min-w-[320px] shadow-2xl border border-indigo-100 animate-slide-up">
        <h2 className="text-xl font-bold text-indigo-700 mb-4">Reservar turno para {day}</h2>
        {error && <div className="bg-red-100 text-red-700 rounded px-4 py-2 mb-3 font-semibold">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 rounded px-4 py-2 mb-3 font-semibold">{success}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="font-semibold text-gray-700">Fecha:
            <input type="date" name="fecha" value={form.fecha} onChange={handleChange} required className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
          </label>
          <label className="font-semibold text-gray-700">Hora:
            <input type="time" name="hora" value={form.hora} onChange={handleChange} required className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
          </label>
          <label className="font-semibold text-gray-700">Paciente:
            <input type="text" name="paciente" value={form.paciente} onChange={handleChange} required className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
          </label>
          <div className="flex justify-end gap-3 mt-2">
            <button type="button" onClick={onClose} className="bg-gray-400 text-white rounded-lg px-4 py-2 font-bold hover:bg-gray-500 transition-colors">Cancelar</button>
            <button type="submit" className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg px-4 py-2 font-bold hover:from-indigo-600 hover:to-purple-600 transition-colors">Reservar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
