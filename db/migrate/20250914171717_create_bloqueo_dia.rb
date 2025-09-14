class CreateBloqueoDia < ActiveRecord::Migration[7.1]
  def change
    create_table :bloqueo_dia do |t|
  t.references :medico, null: false, foreign_key: { to_table: :users }
      t.date :fecha
      t.text :motivo

      t.timestamps
    end
  end
end
