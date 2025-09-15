# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_09_15_193001) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bloqueo_dia", force: :cascade do |t|
    t.bigint "medico_id", null: false
    t.date "fecha"
    t.text "motivo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["medico_id"], name: "index_bloqueo_dia_on_medico_id"
  end

  create_table "historia_clinicas", force: :cascade do |t|
    t.bigint "paciente_id", null: false
    t.bigint "medico_id", null: false
    t.date "fecha"
    t.text "diagnostico"
    t.text "tratamiento"
    t.text "observaciones"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["medico_id"], name: "index_historia_clinicas_on_medico_id"
    t.index ["paciente_id"], name: "index_historia_clinicas_on_paciente_id"
  end

  create_table "medicos", force: :cascade do |t|
    t.string "nombre"
    t.string "especialidad"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pacientes", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "nombre"
    t.string "apellido"
    t.string "dni"
    t.string "telefono"
    t.string "email"
    t.string "tipo_seguro", default: "particular"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_pacientes_on_user_id"
  end

  create_table "turnos", force: :cascade do |t|
    t.bigint "paciente_id", null: false
    t.bigint "medico_id", null: false
    t.date "fecha"
    t.time "hora"
    t.string "estado", default: "disponible"
    t.text "nota"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["medico_id"], name: "index_turnos_on_medico_id"
    t.index ["paciente_id"], name: "index_turnos_on_paciente_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "role", default: 0, null: false
    t.string "nombre"
    t.string "apellido"
    t.date "fecha_ingreso"
    t.string "dni"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "bloqueo_dia", "users", column: "medico_id"
  add_foreign_key "historia_clinicas", "pacientes"
  add_foreign_key "historia_clinicas", "users", column: "medico_id"
  add_foreign_key "pacientes", "users"
  add_foreign_key "turnos", "pacientes"
  add_foreign_key "turnos", "users", column: "medico_id"
end
