class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

         enum role: { paciente: 0, medico: 1, empleado: 2, admin: 3 }
  after_initialize :set_default_role, if: :new_record?

  has_many :pacientes, dependent: :destroy
  has_many :turnos, dependent: :destroy
  has_many :historias_clinicas, dependent: :destroy

  private

  def set_default_role
    self.role ||= :paciente
  end
end
