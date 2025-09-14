module ApplicationHelper
  def role_class(user)
    case user.role
    when 'paciente' then 'badge bg-info'
    when 'medico' then 'badge bg-success'
    when 'empleado' then 'badge bg-warning'
    when 'admin' then 'badge bg-danger'
    end
  end
end
