class RemoveUserIndexFromMessages < ActiveRecord::Migration[6.0]
  def change
    remove_index :messages, name: "index_messages_on_user_id"
  end
end
