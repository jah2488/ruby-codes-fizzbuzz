# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_01_19_232058) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "chars", force: :cascade do |t|
    t.string "name"
    t.bigint "program_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "votes_count"
    t.index ["program_id"], name: "index_chars_on_program_id"
  end

  create_table "entries", force: :cascade do |t|
    t.string "name"
    t.bigint "program_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["program_id"], name: "index_entries_on_program_id"
  end

  create_table "messages", force: :cascade do |t|
    t.string "name"
    t.boolean "is_code"
    t.bigint "program_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "token"
    t.string "color"
    t.index ["program_id"], name: "index_messages_on_program_id"
  end

  create_table "programs", force: :cascade do |t|
    t.string "name", null: false
    t.text "boilerplate", default: "", null: false
    t.string "mode", default: "anarchy", null: false
    t.boolean "complete", default: false, null: false
    t.integer "tick", default: 0, null: false
    t.jsonb "settings", default: {}, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name", default: "user", null: false
    t.string "token", null: false
    t.string "color", null: false
    t.inet "ip", null: false
    t.boolean "mod", default: false, null: false
    t.boolean "banned", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "votes", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "char_id", null: false
    t.index ["char_id"], name: "index_votes_on_char_id"
  end

  add_foreign_key "chars", "programs"
  add_foreign_key "entries", "programs"
  add_foreign_key "messages", "programs"
  add_foreign_key "messages", "users"
  add_foreign_key "votes", "chars"
end
