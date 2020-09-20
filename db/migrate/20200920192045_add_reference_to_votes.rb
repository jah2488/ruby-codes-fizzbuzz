class AddReferenceToVotes < ActiveRecord::Migration[6.0]
  def change
    add_reference :votes, :char, null: false, foreign_key: true
  end
end
