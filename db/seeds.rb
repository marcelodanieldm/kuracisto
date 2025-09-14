# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Crear administrador
admin = User.find_or_create_by!(email: 'admin@clinica.com') do |u|
  u.password = '12345678'
  u.role = 'admin'
end

# Crear médico
medico = User.find_or_create_by!(email: 'dr.perez@clinica.com') do |u|
  u.password = '12345678'
  u.role = 'medico'
end

Paciente.find_or_create_by!(dni: '11223344') do |p|
  p.user = medico
  p.nombre = 'Dr. Juan'
  p.apellido = 'Pérez'
  p.telefono = '1199887766'
  p.tipo_seguro = 'particular'
end

# Crear empleado
empleado = User.find_or_create_by!(email: 'empleado@clinica.com') do |u|
  u.password = '12345678'
  u.role = 'empleado'
end

# Crear pacientes
10.times do |i|
  user = User.find_or_create_by!(email: "paciente#{i+1}@email.com") do |u|
    u.password = '12345678'
    u.role = 'paciente'
  end
  Paciente.find_or_create_by!(dni: Faker::Number.number(digits: 8)) do |p|
    p.user = user
    p.nombre = Faker::Name.first_name
    p.apellido = Faker::Name.last_name
    p.telefono = Faker::PhoneNumber.phone_number
    p.tipo_seguro = %w[particular prepaga].sample
  end
end

# Crear turnos
medico = User.find_by(email: 'dr.perez@clinica.com')
pacientes = Paciente.all

(1..15).each do |i|
  hora_minuto = [ 0, 30 ].sample
  hora = Time.new(2000, 1, 1, rand(8..18), hora_minuto)
  Turno.create!(
    medico: medico,
    paciente: pacientes.sample,
    fecha: Date.today + i.days,
    hora: hora,
    estado: 'disponible'
  )
end
