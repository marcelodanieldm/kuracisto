class MedicosController < ApplicationController
  before_action :authenticate_user!
  before_action :require_medico

  def dashboard
    @turnos_hoy = current_user.turnos.where(fecha: Date.today, estado: 'reservado')
    @turnos_semana = current_user.turnos.where(fecha: Date.today..Date.today + 6)
    @historias = current_user.historias_clinicas.includes(:paciente).order(created_at: :desc)
    @bloqueos = current_user.bloqueos_dias.order(fecha: :asc)
  end

  def bloquear_dia
    @bloqueo = BloqueoDia.new(bloqueo_params)
    @bloqueo.medico = current_user
    if @bloqueo.save
      redirect_to medicos_dashboard_path, notice: "Día bloqueado exitosamente."
    else
      redirect_to medicos_dashboard_path, alert: @bloqueo.errors.full_messages.join(", ")
    end
  end

  def eliminar_bloqueo
    @bloqueo = BloqueoDia.find(params[:id])
    @bloqueo.destroy
    redirect_to medicos_dashboard_path, notice: "Bloqueo eliminado."
  end

  def crear_historia
    @historia = HistoriaClinica.new(historia_params)
    @historia.paciente_id = params[:paciente_id]
    @historia.medico = current_user
    if @historia.save
      redirect_to medicos_dashboard_path, notice: "Historia creada."
    else
      redirect_to medicos_dashboard_path, alert: @historia.errors.full_messages.join(", ")
    end
  end

  def editar_historia
    @historia = HistoriaClinica.find(params[:id])
    if @historia.update(historia_params)
      redirect_to medicos_dashboard_path, notice: "Actualizada."
    else
      redirect_to medicos_dashboard_path, alert: @historia.errors.full_messages.join(", ")
    end
  end

  def borrar_historia
    @historia = HistoriaClinica.find(params[:id])
    @historia.destroy
    redirect_to medicos_dashboard_path, notice: "Historia eliminada."
  end

  private

  def require_medico
    redirect_to root_path, alert: "Acceso denegado" unless current_user.medico?
  end

  def historia_params
    params.require(:historia_clinica).permit(:fecha, :diagnostico, :tratamiento, :observaciones)
  end

  def bloqueo_params
    params.require(:bloqueo_dia).permit(:fecha, :motivo)
  end
end