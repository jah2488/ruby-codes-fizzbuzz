class AddCodeToPrograms < ActiveRecord::Migration[6.0]
  def change
    add_column :programs, :code, :text, null: false, default: ""
  end
end
