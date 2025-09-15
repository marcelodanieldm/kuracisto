class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  #allow_browser versions: :modern

  # Redirigir admin al dashboard tras login exitoso

  def after_sign_in_path_for(resource)
    if resource.is_a?(User)
      Rails.logger.info "AFTER SIGN IN: user_id=#{resource.id} role=#{resource.role} admin?=#{resource.admin?}"
      if resource.admin?
        Rails.logger.info "Redirigiendo a admin_dashboard_path"
        admin_dashboard_path
      elsif resource.medico?
        Rails.logger.info "Redirigiendo a medicos_dashboard_path"
        medicos_dashboard_path
      elsif resource.empleado?
        Rails.logger.info "Redirigiendo a empleados_dashboard_path"
        empleados_dashboard_path
      else
        Rails.logger.info "Redirigiendo a super (root)"
        super
      end
    else
      Rails.logger.info "Redirigiendo a super (no User)"
      super
    end
  end

  # Redirigir a home tras logout
  def after_sign_out_path_for(resource_or_scope)
    root_path
  end
end
