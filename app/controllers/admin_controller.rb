class AdminController < ApplicationController
  helper SimpleCalendar::CalendarHelper
  before_action :authenticate_user!
  before_action :require_admin

  def dashboard
    @medicos = Medico.all.order(:apellido, :nombre)
    @empleados = User.where(role: :empleado).order(:apellido, :nombre)
  end

  # MÉDICOS CRUD
  def new_medico
    @medico = Medico.new
  end

  def create_medico
    @medico = Medico.new(medico_params)
    if @medico.save
      redirect_to admin_dashboard_path, notice: "Médico creado exitosamente."
    else
      render :new_medico
    end
  end

  def edit_medico
    @medico = Medico.find(params[:id])
  end

  def update_medico
    @medico = Medico.find(params[:id])
    if @medico.update(medico_params)
      redirect_to admin_dashboard_path, notice: "Médico actualizado."
    else
      render :edit_medico
    end
  end

  def destroy_medico
    @medico = Medico.find(params[:id])
    @medico.destroy
    redirect_to admin_dashboard_path, notice: "Médico eliminado."
  end

  # EMPLEADOS CRUD
  def new_empleado
    @empleado = User.new(role: :empleado)
  end

  def create_empleado
    @empleado = User.new(empleado_params.merge(role: :empleado))
    if @empleado.save
      redirect_to admin_dashboard_path, notice: "Empleado creado exitosamente."
    else
      render :new_empleado
    end
  end

  def edit_empleado
    @empleado = User.find(params[:id])
  end

  def update_empleado
    @empleado = User.find(params[:id])
    if @empleado.update(empleado_params)
      redirect_to admin_dashboard_path, notice: "Empleado actualizado."
    else
      render :edit_empleado
    end
  end

  def destroy_empleado
    @empleado = User.find(params[:id])
    @empleado.destroy
    redirect_to admin_dashboard_path, notice: "Empleado eliminado."
  end

  private

  def require_admin
    redirect_to root_path, alert: "Acceso denegado" unless current_user.admin?
  end

  def medico_params
    params.require(:medico).permit(:nombre, :apellido, :matricula, :especialidad)
  end

  def empleado_params
    params.require(:user).permit(:nombre, :apellido, :fecha_ingreso, :dni, :email, :password, :password_confirmation)
  end
end
