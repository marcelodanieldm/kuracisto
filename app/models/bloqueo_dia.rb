class BloqueoDia < ApplicationRecord
  belongs_to :medico, class_name: "User", foreign_key: "medico_id"

  validates :fecha, presence: true, uniqueness: { scope: :medico_id }
  validate :no_fecha_pasada

  private

  def no_fecha_pasada
    if fecha.present? && fecha < Date.today
      errors.add(:fecha, "No puedes bloquear fechas pasadas")
    end
  end
end
