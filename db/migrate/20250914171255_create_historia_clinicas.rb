class CreateHistoriaClinicas < ActiveRecord::Migration[7.1]
  def change
    create_table :historia_clinicas do |t|
  t.references :paciente, null: false, foreign_key: true
  t.references :medico, null: false, foreign_key: { to_table: :users }
      t.date :fecha
      t.text :diagnostico
      t.text :tratamiento
      t.text :observaciones

      t.timestamps
    end
  end
end
