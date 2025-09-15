
class TurnosController < ApplicationController
  def index; end
  def show; end
  def new; end
  def create; end
  def edit; end
  def update; end
  def destroy; end

  def reservar
    if params[:turno_id].present?
      turno = Turno.find(params[:turno_id])
      if Turno.where(fecha: params[:fecha], hora: params[:hora], medico_id: turno.medico_id).where.not(id: turno.id).exists?
        flash[:alert] = 'Ya existe un turno reservado en ese horario.'
      elsif Turno.where(fecha: params[:fecha], hora: params[:hora], paciente_id: params[:paciente_id]).where.not(id: turno.id).exists?
        flash[:alert] = 'El paciente ya tiene un turno reservado en ese horario.'
      elsif turno.update(
        fecha: params[:fecha],
        hora: params[:hora],
        paciente_id: params[:paciente_id]
      )
        flash[:notice] = 'Turno actualizado correctamente.'
      else
        flash[:alert] = 'No se pudo actualizar el turno.'
      end
    else
      if Turno.where(fecha: params[:fecha], hora: params[:hora], medico_id: (current_user.medico? ? current_user.id : nil)).exists?
        flash[:alert] = 'Ya existe un turno reservado en ese horario.'
      elsif Turno.where(fecha: params[:fecha], hora: params[:hora], paciente_id: params[:paciente_id]).exists?
        flash[:alert] = 'El paciente ya tiene un turno reservado en ese horario.'
      else
        turno = Turno.new(
          fecha: params[:fecha],
          hora: params[:hora],
          paciente_id: params[:paciente_id],
          medico_id: current_user.medico? ? current_user.id : nil,
          empleado_id: current_user.empleado? ? current_user.id : nil,
          estado: 'reservado'
        )
        if turno.save
          flash[:notice] = 'Turno reservado correctamente.'
        else
          flash[:alert] = 'No se pudo reservar el turno.'
        end
      end
    end
    redirect_back fallback_location: root_path
  end
end
