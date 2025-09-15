import React, { useState } from "react";
import ReservaTurnoModal from "./ReservaTurnoModal";
import { FaCalendarDay, FaUserMd, FaUserCheck, FaRegClock } from "react-icons/fa";

// turnos: [{ id, fecha, hora, paciente: { nombre, apellido }, estado }]
export default function AdminCalendar({ turnos }) {
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
    <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 rounded-2xl shadow-xl p-6 mb-8">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
        <FaCalendarDay className="inline-block text-indigo-500" /> Calendario semanal de turnos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
        {weekDays.map(day => (
          <div key={day} className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-2 transition-transform hover:scale-105">
            <h3 className="text-lg font-semibold text-blue-600 mb-2 flex items-center gap-2">
              <FaRegClock className="inline-block text-blue-400" /> {day}
            </h3>
            <button
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg px-3 py-2 font-bold mb-2 shadow hover:from-indigo-600 hover:to-purple-600 transition-colors"
              onClick={() => { setSelectedDay(day); setModalOpen(true); }}
            >
              <FaUserMd className="inline-block mr-2" /> Reservar turno
            </button>
            <div className="flex flex-col gap-2">
              {grouped[day] && grouped[day].length > 0 ? (
                grouped[day].map(turno => (
                  <div key={turno.id} className={`rounded-lg p-3 shadow flex items-center justify-between animate-fade-in ${turno.estado === "reservado" ? "bg-red-100 border-l-4 border-red-400" : "bg-green-100 border-l-4 border-green-400"}`}>
                    <div className="flex flex-col">
                      <span className="font-bold text-base text-gray-700 flex items-center gap-1">
                        <FaRegClock className="inline-block text-gray-400" /> {turno.hora}
                      </span>
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        <FaUserCheck className="inline-block text-green-500" /> {turno.paciente.nombre} {turno.paciente.apellido}
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${turno.estado === "reservado" ? "bg-red-200 text-red-700" : "bg-green-200 text-green-700"}`}>{turno.estado}</span>
                  </div>
                ))
              ) : (
                <span className="text-gray-400 text-sm">Sin turnos</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <ReservaTurnoModal open={modalOpen} onClose={() => setModalOpen(false)} day={selectedDay} />
    </div>
  );
}
