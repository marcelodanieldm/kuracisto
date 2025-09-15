class Turno < ApplicationRecord
  belongs_to :paciente
  belongs_to :medico, class_name: "User", foreign_key: "medico_id"

  enum estado: { disponible: 0, reservado: 1, cancelado: 2, asistio: 3, faltado: 4, bloqueado: 5 }

  validate :no_bloqueado
  validate :no_cancelar_menos_de_48h
  validate :no_double_booking, on: :create
  validate :no_multiple_turnos_paciente, on: :create
  def no_double_booking
    if Turno.where(fecha: fecha, hora: hora, medico_id: medico_id, estado: 'reservado').exists?
      errors.add(:base, "Ya existe un turno reservado para este médico en ese horario.")
    end
  end

  def no_multiple_turnos_paciente
    if Turno.where(fecha: fecha, paciente_id: paciente_id, medico_id: medico_id, estado: 'reservado').exists?
      errors.add(:base, "El paciente ya tiene un turno reservado con este médico en esa fecha.")
    end
  end

  private

  def no_bloqueado
    return unless estado_changed? && estado == "reservado"
    errors.add(:base, "El turno está bloqueado") if medico.turnos_bloqueados.include?(fecha)
  end

  def no_cancelar_menos_de_48h
    return unless estado_changed? && estado == "cancelado"
    if fecha.present? && hora.present?
      horario_turno = DateTime.new(fecha.year, fecha.month, fecha.day, hora.hour, hora.min)
      if horario_turno - Time.now < 48.hours
        errors.add(:base, "Solo puedes cancelar hasta 48 horas antes del turno")
      end
    end
  end
end
