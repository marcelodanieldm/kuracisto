class HistoriaClinica < ApplicationRecord
  belongs_to :paciente
  belongs_to :medico, class_name: "User", foreign_key: "medico_id"

  has_one_attached :receta_pdf

  validates :diagnostico, presence: true
  validates :fecha, presence: true
end
