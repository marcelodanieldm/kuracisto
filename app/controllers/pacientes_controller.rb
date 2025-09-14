class PacientesController < ApplicationController
  before_action :authenticate_user!
  before_action :require_paciente

  def agenda
    @turnos_disponibles = Turno.where(estado: 'disponible').where.not(fecha: nil).where.not(hora: nil)
                                  .joins(:medico)
                                  .where.not(medico_id: nil)
                                  .order(:fecha, :hora)
  end

  def reservar_turno
    @turno = Turno.find(params[:turno_id])
    if @turno.estado == 'disponible'
      @turno.update!(estado: 'reservado', paciente_id: current_user.paciente.id)
      redirect_to pacientes_agenda_path, notice: "Turno reservado con éxito!"
    else
      redirect_to pacientes_agenda_path, alert: "El turno ya no está disponible."
    end
  end

  def cancelar_turno
    @turno = Turno.find(params[:turno_id])
    if @turno.paciente_id == current_user.paciente.id
      if (@turno.fecha - Date.today) * 24 > 48
        @turno.update!(estado: 'cancelado')
        redirect_to pacientes_agenda_path, notice: "Turno cancelado."
      else
        redirect_to pacientes_agenda_path, alert: "Solo puedes cancelar hasta 48 horas antes."
      end
    else
      redirect_to pacientes_agenda_path, alert: "No puedes cancelar un turno que no es tuyo."
    end
  end

  def historial_medico
    @historias = HistoriaClinica.where(paciente_id: current_user.paciente.id).order(fecha: :desc)
  end

  private

  def require_paciente
    redirect_to root_path, alert: "Acceso denegado" unless current_user.paciente?
  end
end