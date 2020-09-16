class CreateCharVotes < ActiveRecord::Migration[6.0]
  def change
    create_table :char_votes do |t|
      t.references :char, null: false, foreign_key: true
      t.references :vote, null: false, foreign_key: true

      t.timestamps
    end
  end
end
