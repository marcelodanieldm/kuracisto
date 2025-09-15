class AddEmpleadoFieldsToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :nombre, :string
    add_column :users, :apellido, :string
    add_column :users, :fecha_ingreso, :date
    add_column :users, :dni, :string
  end
end
