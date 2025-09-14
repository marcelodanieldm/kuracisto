class CreateMedicos < ActiveRecord::Migration[6.1]
	def change
		create_table :medicos do |t|
			t.string :nombre
			t.string :especialidad
			t.string :email
			t.timestamps
		end
	end
end

