class MedicosController < ApplicationController
  before_action :authenticate_user!
  before_action :require_medico

  def historia_clinica_paciente
    @paciente = Paciente.find(params[:id])
    @historia = HistoriaClinica.new
    @historias_previas = @paciente.historia_clinicas.order(created_at: :desc)
  end

  def crear_historia
    @historia = HistoriaClinica.new(historia_params)
    if @historia.save
      redirect_to historia_clinica_paciente_medicos_path(@historia.paciente_id), notice: "Historia clínica creada correctamente."
    else
      @paciente = Paciente.find(@historia.paciente_id)
      @historias_previas = @paciente.historia_clinicas.order(created_at: :desc)
      render :historia_clinica_paciente, status: :unprocessable_entity
    end
  end

  def nuevo_paciente
    @paciente = Paciente.new
  end

  def crear_paciente
    @paciente = Paciente.new(paciente_params)
    if @paciente.save
      redirect_to medicos_dashboard_path, notice: "Paciente creado."
    else
      render :nuevo_paciente
    end
  end

  def editar_paciente
    @paciente = Paciente.find(params[:id])
  end

  def actualizar_paciente
    @paciente = Paciente.find(params[:id])
    if @paciente.update(paciente_params)
      redirect_to medicos_dashboard_path, notice: "Actualizado."
    else
      render :editar_paciente
    end
  end

  def eliminar_paciente
    @paciente = Paciente.find(params[:id])
    @paciente.destroy
    redirect_to medicos_dashboard_path, notice: "Paciente eliminado."
  end

  def dashboard
    @turnos_hoy = current_user.turnos.where(fecha: Date.today, estado: 'reservado')
    @turnos_semana = current_user.turnos.where(fecha: Date.today..Date.today + 6)
  @turnos = current_user.turnos.where(fecha: Date.today.beginning_of_month..Date.today.end_of_month, estado: 'reservado')
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

  def editar_historia
    @historia = HistoriaClinica.find(params[:id])
    if @historia.update(historia_params)
      redirect_to medicos_dashboard_path, notice: "Actualizada."
    else
      redirect_to medicos_dashboard_path, alert: @historia.errors.full_messages.join(", ")
    end
  end

  def dashboard
    @turnos_hoy = current_user.turnos.where(fecha: Date.today, estado: 'reservado')
    @turnos_semana = current_user.turnos.where(fecha: Date.today..Date.today + 6)
    @turnos = current_user.turnos.where(fecha: Date.today.beginning_of_month..Date.today.end_of_month, estado: 'reservado')
    @historias = current_user.historias_clinicas.includes(:paciente).order(created_at: :desc)
    @bloqueos = current_user.bloqueos_dias.order(fecha: :asc)
    @pacientes = Paciente.all.order(:nombre)

    if params[:busqueda].present?
      query = params[:busqueda].strip
      @buscador_paciente = Paciente.where("nombre ILIKE ? OR apellido ILIKE ?", "%#{query}%", "%#{query}%").first
    end
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

  private

  def paciente_params
    params.require(:paciente).permit(:nombre, :apellido, :dni, :telefono, :email, :tipo_seguro)
  end

  def historia_params
    params.require(:historia_clinica).permit(:fecha, :diagnostico, :tratamiento, :observaciones, :receta_pdf, :paciente_id)
  end

  def bloqueo_params
    params.require(:bloqueo_dia).permit(:fecha, :motivo)
  end

  def require_medico
    redirect_to root_path, alert: "Acceso denegado" unless current_user.medico?
  end
end