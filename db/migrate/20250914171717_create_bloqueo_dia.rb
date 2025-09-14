class CreateBloqueoDia < ActiveRecord::Migration[8.0]
  def change
    create_table :bloqueo_dia do |t|
      t.references :medico, null: false, foreign_key: true
      t.date :fecha
      t.text :motivo

      t.timestamps
    end
  end
end
