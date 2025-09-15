class EmpleadosController < ApplicationController
  before_action :authenticate_user!
  before_action :require_empleado

  def dashboard
    if params[:busqueda].present?
      query = params[:busqueda].strip
      @pacientes = Paciente.where("nombre ILIKE ? OR apellido ILIKE ?", "%#{query}%", "%#{query}%").order(:nombre)
    else
      @pacientes = Paciente.all.order(:nombre)
    end
    @turnos = Turno.joins(:paciente).where(estado: 'reservado').order(fecha: :desc, hora: :asc)
    @asistieron = Turno.where(estado: 'asistio').joins(:paciente)
    @faltaron = Turno.where(estado: 'faltado').joins(:paciente)
  end

  def nuevo_paciente
    @paciente = Paciente.new
  end

  def crear_paciente
    @paciente = Paciente.new(paciente_params)
    if @paciente.save
      redirect_to empleados_dashboard_path, notice: "Paciente creado."
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
      redirect_to empleados_dashboard_path, notice: "Actualizado."
    else
      render :editar_paciente
    end
  end

  def eliminar_paciente
    @paciente = Paciente.find(params[:id])
    @paciente.destroy
    redirect_to empleados_dashboard_path, notice: "Paciente eliminado."
  end

  def enviar_email_paciente
    @paciente = Paciente.find(params[:paciente_id])
    EmailService.send_turno_recordatorio(@paciente, params[:mensaje])
    redirect_to empleados_dashboard_path, notice: "Email enviado a #{@paciente.full_name}"
  end

  private

  def require_empleado
    redirect_to root_path, alert: "Acceso denegado" unless current_user.empleado?
  end

  def paciente_params
    params.require(:paciente).permit(:nombre, :apellido, :dni, :telefono, :email, :tipo_seguro)
  end
end
