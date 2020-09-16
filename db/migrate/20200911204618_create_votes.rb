class CreateVotes < ActiveRecord::Migration[6.0]
  def change
    create_table :votes do |t|
      t.string :chat, limit: 1
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
