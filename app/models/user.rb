class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable

  enum role: { paciente: 0, medico: 1, empleado: 2, admin: 3 }
  after_initialize :set_default_role, if: :new_record?

  has_many :pacientes, dependent: :destroy
  has_many :turnos, foreign_key: "medico_id", dependent: :destroy
  has_many :historias_clinicas, class_name: "HistoriaClinica", foreign_key: "medico_id", dependent: :destroy

  # Bloqueos de días para médicos
  has_many :bloqueos_dias, class_name: "BloqueoDia", foreign_key: "medico_id"

  def turnos_bloqueados
    bloqueos_dias.pluck(:fecha).map(&:to_date)
  end

  private

  def set_default_role
    self.role ||= :paciente
  end
end
