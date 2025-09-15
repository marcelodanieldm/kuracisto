class HistoriasClinicasController < ApplicationController
  def index
    historias = HistoriaClinica.includes(:paciente).where(medico: current_user)
    render json: historias.as_json(include: { paciente: { only: [:nombre, :apellido, :dni, :tipo_seguro], methods: [:full_name], include: { turnos: { only: [:fecha, :hora, :estado] } } } })
  end

  def show
  end

  def new
  end

  def create
    historia_params = params.require(:historia_clinica).permit(:nombre, :apellido, :dni, :tipo_seguro, :fecha, :comentarios)
    paciente = Paciente.find_by(dni: historia_params[:dni])
    unless paciente
      paciente = Paciente.create(
        nombre: historia_params[:nombre],
        apellido: historia_params[:apellido],
        dni: historia_params[:dni],
        tipo_seguro: historia_params[:tipo_seguro],
        user_id: current_user.id
      )
    end
    historia = HistoriaClinica.new(
      paciente: paciente,
      medico: current_user,
      fecha: historia_params[:fecha],
      diagnostico: historia_params[:comentarios]
    )
    if historia.save
      render json: historia, status: :created
    else
      render json: { error: historia.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    historia = HistoriaClinica.find(params[:id])
    historia_params = params.require(:historia_clinica).permit(:fecha, :diagnostico)
    if historia.update(historia_params)
      render json: historia, status: :ok
    else
      render json: { error: historia.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  def destroy
    historia = HistoriaClinica.find(params[:id])
    if historia.destroy
      render json: { success: true }, status: :ok
    else
      render json: { error: "No se pudo eliminar la historia clínica" }, status: :unprocessable_entity
    end
  end
end
