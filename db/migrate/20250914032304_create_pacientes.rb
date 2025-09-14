class CreatePacientes < ActiveRecord::Migration[8.0]
  def change
    create_table :pacientes do |t|
      t.references :user, null: false, foreign_key: true
      t.string :nombre
      t.string :apellido
      t.string :dni
      t.string :telefono
      t.string :email
  t.string :tipo_seguro, default: "particular"
      t.datetime :created_at
      t.datetime :updated_at

      t.timestamps
    end
  end
end
