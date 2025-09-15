import React, { useState } from "react";
import ReservaTurnoModal from "./ReservaTurnoModal";

// turnos: [{ id, fecha, hora, paciente: { nombre, apellido }, estado }]
export default function EmpleadoCalendar({ turnos }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  // Agrupar turnos por día de la semana
  const weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const grouped = {};
  turnos.forEach(turno => {
    const date = new Date(turno.fecha);
    const day = date.getDay(); // 0=Domingo, 1=Lunes...
    const key = weekDays[day === 0 ? 6 : day - 1];
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(turno);
  });

  return (
    <div style={{ background: "#fff", borderRadius: "1rem", boxShadow: "0 2px 8px #0001", padding: "1.5rem", marginBottom: "2rem" }}>
      <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#047857", marginBottom: "1rem" }}>Calendario semanal de turnos</h2>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {weekDays.map(day => (
          <div key={day} style={{ flex: "1 1 120px", minWidth: "120px" }}>
            <h3 style={{ color: "#2563eb", fontSize: "1rem", marginBottom: "0.5rem" }}>{day}</h3>
            <button
              style={{ background: "#047857", color: "#fff", border: "none", borderRadius: "0.5rem", padding: "0.4rem 0.8rem", marginBottom: "0.5rem", cursor: "pointer", fontWeight: "bold" }}
              onClick={() => { setSelectedDay(day); setModalOpen(true); }}
            >
              Reservar turno
            </button>
            {grouped[day] && grouped[day].length > 0 ? (
              grouped[day].map(turno => (
                <div key={turno.id} style={{ background: turno.estado === "reservado" ? "#fee2e2" : "#bbf7d0", borderRadius: "0.5rem", padding: "0.5rem", marginBottom: "0.5rem", boxShadow: "0 1px 4px #0001" }}>
                  <strong>{turno.hora}</strong> - {turno.paciente.nombre} {turno.paciente.apellido}
                  <span style={{ float: "right", color: turno.estado === "reservado" ? "#dc2626" : "#047857", fontWeight: "bold" }}>{turno.estado}</span>
                </div>
              ))
            ) : (
              <span style={{ color: "#64748b", fontSize: "0.9rem" }}>Sin turnos</span>
            )}
          </div>
        ))}
      </div>
    <ReservaTurnoModal open={modalOpen} onClose={() => setModalOpen(false)} day={selectedDay} />
  </div>
  );
}
