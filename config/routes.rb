Rails.application.routes.draw do
  # Admin CRUD routes
  get '/admin/medicos/nuevo', to: 'admin#new_medico', as: :new_admin_medico
  post '/admin/medicos', to: 'admin#create_medico', as: :admin_medicos
  get '/admin/medicos/:id/editar', to: 'admin#edit_medico', as: :edit_admin_medico
  patch '/admin/medicos/:id', to: 'admin#update_medico', as: :update_admin_medico
  delete '/admin/medicos/:id', to: 'admin#destroy_medico', as: :destroy_admin_medico

  get '/admin/empleados/nuevo', to: 'admin#new_empleado', as: :new_admin_empleado
  post '/admin/empleados', to: 'admin#create_empleado', as: :admin_empleados
  get '/admin/empleados/:id/editar', to: 'admin#edit_empleado', as: :edit_admin_empleado
  patch '/admin/empleados/:id', to: 'admin#update_empleado', as: :update_admin_empleado
  delete '/admin/empleados/:id', to: 'admin#destroy_empleado', as: :destroy_admin_empleado
  get '/confirmacion', to: 'pages#confirmacion', as: :react_confirmacion
  get '/perfil', to: 'pages#perfil', as: :react_perfil
  get '/registro', to: 'pages#registro', as: :react_registro
  post '/medicos/bloquear_dia', to: 'medicos#bloquear_dia', as: :bloquear_dia_medicos
  post '/empleados/enviar_email_paciente', to: 'empleados#enviar_email_paciente', as: :enviar_email_paciente_empleados
  post '/empleados/crear_paciente', to: 'empleados#crear_paciente', as: :crear_paciente_empleados
  get '/empleados/editar_paciente/:id', to: 'empleados#editar_paciente', as: :editar_paciente_empleados
  patch '/empleados/actualizar_paciente/:id', to: 'empleados#actualizar_paciente', as: :actualizar_paciente_empleados
  delete '/empleados/eliminar_paciente/:id', to: 'empleados#eliminar_paciente', as: :eliminar_paciente_empleados
  get '/empleados/nuevo_paciente', to: 'empleados#nuevo_paciente', as: :nuevo_paciente_empleados

  devise_for :users
  # Custom React login and recovery routes (mount React component, submit to Devise)
  get '/login', to: 'pages#login', as: :react_login
  get '/recuperar', to: 'pages#recuperar', as: :react_recuperar
  root to: 'home#index'

  resources :pacientes
  resources :turnos
  resources :historias_clinicas

  get '/empleados/dashboard', to: 'empleados#dashboard'
  get '/medicos/dashboard', to: 'medicos#dashboard'
  get '/pacientes/agenda', to: 'pacientes#agenda'
  get '/admin/dashboard', to: 'admin#dashboard'

  get '/medicos/historia_clinica_paciente/:id', to: 'medicos#historia_clinica_paciente', as: :historia_clinica_paciente_medicos
  get '/medicos/nuevo_paciente', to: 'medicos#nuevo_paciente', as: :nuevo_paciente_medicos
  post '/medicos/crear_paciente', to: 'medicos#crear_paciente', as: :crear_paciente_medicos
  get '/medicos/editar_paciente/:id', to: 'medicos#editar_paciente', as: :editar_paciente_medicos
  patch '/medicos/actualizar_paciente/:id', to: 'medicos#actualizar_paciente', as: :actualizar_paciente_medicos
  delete '/medicos/eliminar_paciente/:id', to: 'medicos#eliminar_paciente', as: :eliminar_paciente_medicos

  get "up" => "rails/health#show", as: :rails_health_check

  post '/reservar_turno', to: 'turnos#reservar', as: :reservar_turno
end
