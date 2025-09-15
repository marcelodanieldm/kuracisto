class Users::SessionsController < Devise::SessionsController
  before_action { Rails.logger.info "SE EJECUTA EL CONTROLADOR DE SESIONES" }
  def create
    Rails.logger.info "PARAMS RECIBIDOS EN LOGIN: #{params.inspect}"
    super
  end

end
