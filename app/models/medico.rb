class Medico < ApplicationRecord
	validates :nombre, presence: true
	validates :apellido, presence: true
	validates :matricula, presence: true
	validates :especialidad, presence: true
	validates :dni, presence: true
	validates :fecha_ingreso, presence: true
	validates :email, presence: true
end

