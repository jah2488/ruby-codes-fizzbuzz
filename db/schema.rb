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

ActiveRecord::Schema.define(version: 2020_09_20_174403) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "char_votes", force: :cascade do |t|
    t.bigint "char_id", null: false
    t.bigint "vote_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["char_id"], name: "index_char_votes_on_char_id"
    t.index ["vote_id"], name: "index_char_votes_on_vote_id"
  end

  create_table "chars", force: :cascade do |t|
    t.string "name", limit: 1
    t.bigint "program_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["program_id"], name: "index_chars_on_program_id"
  end

  create_table "programs", force: :cascade do |t|
    t.string "name", null: false
    t.string "mode", default: "anarchy", null: false
    t.boolean "complete", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "code", default: "", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name", default: "user-027ea7", null: false
    t.boolean "mod", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "votes", force: :cascade do |t|
    t.string "chat", limit: 1
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_votes_on_user_id"
  end

  add_foreign_key "char_votes", "chars"
  add_foreign_key "char_votes", "votes"
  add_foreign_key "chars", "programs"
  add_foreign_key "votes", "users"
end
