class AddLockToProgram < ActiveRecord::Migration[6.0]
  def change
    add_column :programs, :locked, :boolean, default: false, null: false
  end
end
