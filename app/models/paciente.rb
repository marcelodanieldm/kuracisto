class Paciente < ApplicationRecord
  belongs_to :user
  has_many :turnos, dependent: :destroy
  has_one :historia_clinica, dependent: :destroy

  validates :nombre, presence: true
  validates :apellido, presence: true
  validates :dni, presence: true, uniqueness: true
  validates :telefono, presence: true
  validates :tipo_seguro, inclusion: { in: ['particular', 'prepaga'] }

  def full_name
    "#{nombre} #{apellido}"
  end
end
