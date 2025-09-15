class CreateMedicos < ActiveRecord::Migration[7.1]
	def change
		create_table :medicos do |t|
			t.string :nombre
			t.string :apellido
			t.string :matricula
			t.string :especialidad
			t.string :email
			t.timestamps
		end
	end
end

