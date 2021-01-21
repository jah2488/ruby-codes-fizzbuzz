class AddUserDataToMessages < ActiveRecord::Migration[6.0]
  def change
    add_column :messages, :token, :string
    add_column :messages, :color, :string
  end
end
