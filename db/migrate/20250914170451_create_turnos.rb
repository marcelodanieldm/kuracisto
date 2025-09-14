class CreateTurnos < ActiveRecord::Migration[7.1]
  def change
    create_table :turnos do |t|
      t.references :paciente, null: false, foreign_key: true
      t.references :medico, null: false, foreign_key: { to_table: :users }
      t.date :fecha
      t.time :hora
      t.string :estado, default: "disponible"
      t.text :nota

      t.timestamps
    end
  end
end
