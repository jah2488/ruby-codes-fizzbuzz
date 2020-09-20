class RemoveCharVotesTable < ActiveRecord::Migration[6.0]
  def change
    drop_table :char_votes
  end
end
