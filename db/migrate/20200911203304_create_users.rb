class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name, default: -> () { "'user-#{SecureRandom.hex(3)}'" }, null: false
      t.boolean :mod, default: false, null: false

      t.timestamps
    end
  end
end
