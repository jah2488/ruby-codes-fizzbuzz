class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name, default: "user", null: false
      t.string :token, null: false
      t.string :color, null: false
      t.inet :ip, null: false
      t.boolean :mod, default: false, null: false
      t.boolean :banned, default: false, null: false

      t.timestamps
    end
  end
end
