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
admin = User.create!(
  email: 'admin@clinica.com',
  password: '12345678',
  role: 'admin'
)

# Crear médico
medico = User.create!(
  email: 'dr.perez@clinica.com',
  password: '12345678',
  role: 'medico'
)

Paciente.create!(
  user: medico,
  nombre: 'Dr. Juan',
  apellido: 'Pérez',
  dni: '11223344',
  telefono: '1199887766',
  tipo_seguro: 'particular'
)

# Crear empleado
empleado = User.create!(
  email: 'empleado@clinica.com',
  password: '12345678',
  role: 'empleado'
)

# Crear pacientes
10.times do |i|
  Paciente.create!(
    user: User.create!(
      email: "paciente#{i+1}@email.com",
      password: '12345678',
      role: 'paciente'
    ),
    nombre: Faker::Name.first_name,
    apellido: Faker::Name.last_name,
    dni: Faker::Number.number(digits: 8),
    telefono: Faker::PhoneNumber.phone_number,
    tipo_seguro: %w[particular prepaga].sample
  )
end

# Crear turnos
medico = User.find_by(email: 'dr.perez@clinica.com')
pacientes = Paciente.all

(1..15).each do |i|
  Turno.create!(
    medico: medico,
    paciente: pacientes.sample,
    fecha: Date.today + i.days,
    hora: "#{rand(8..18)}:#{rand([0,30])}",
    estado: 'disponible'
  )
end