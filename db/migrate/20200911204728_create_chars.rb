class CreateChars < ActiveRecord::Migration[6.0]
  def change
    create_table :chars do |t|
      t.string :name
      t.references :program, null: false, foreign_key: true

      t.timestamps
    end
  end
end
