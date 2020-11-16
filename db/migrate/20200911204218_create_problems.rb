class CreateProblems < ActiveRecord::Migration[6.0]
  def change
    create_table :programs do |t|
      t.string :name, null: false

      t.text :boilerplate, default: "", null: false
      t.string :mode, default: "anarchy", null: false
      t.boolean :complete, default: false, null: false
      t.integer :tick, default: 0, null: false
      t.jsonb :settings, default: {}, null: false

      t.timestamps
    end
  end
end
