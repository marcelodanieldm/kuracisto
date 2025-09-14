class HistoriaClinica < ApplicationRecord
  belongs_to :paciente
  belongs_to :medico, class_name: 'User'

  validates :diagnostico, presence: true
  validates :fecha, presence: true
end
