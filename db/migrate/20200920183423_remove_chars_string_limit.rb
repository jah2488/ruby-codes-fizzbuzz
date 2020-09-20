class RemoveCharsStringLimit < ActiveRecord::Migration[6.0]
  def up
    change_column :chars, :name, :string
  end

  def down
    change_column :chars, :name, :string, limit: 1
  end
end
