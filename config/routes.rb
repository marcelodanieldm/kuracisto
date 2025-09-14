Rails.application.routes.draw do
  devise_for :users
  root to: 'home#index'

  resources :pacientes
  resources :turnos
  resources :historias_clinicas

  get '/empleados/dashboard', to: 'empleados#dashboard'
  get '/medicos/dashboard', to: 'medicos#dashboard'
  get '/pacientes/agenda', to: 'pacientes#agenda'
  get '/admin/dashboard', to: 'admin#dashboard'  rails db:migrate

  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
end
