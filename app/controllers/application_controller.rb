class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  #allow_browser versions: :modern

  # Redirigir admin al dashboard tras login exitoso

  def after_sign_in_path_for(resource)
    if resource.is_a?(User)
      case resource.role
      when 'admin'
        admin_dashboard_path
      when 'medico'
        medicos_dashboard_path
      when 'empleado'
        empleados_dashboard_path
      else
        super
      end
    else
      super
    end
  end

  # Redirigir a home tras logout
  def after_sign_out_path_for(resource_or_scope)
    root_path
  end
end
